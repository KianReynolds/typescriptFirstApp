import { Request, Response } from "express";
import Budget, { ValidateBudget } from "../models/budgetModel";
import { budgetCollection, usersCollection } from "../database";
import { ObjectId } from "mongodb";
import Joi from "joi";
import * as argon2 from 'argon2';

export const getBudget = async (req: Request, res: Response) => {

    try {
        const budgets = (await budgetCollection.find({}).toArray()) as Budget[];
        res.status(200).json(budgets);
     
      } catch (error) {
        if (error instanceof Error)
        {
         console.log(`issue with inserting ${error.message}`);
        }
        else{
          console.log(`error with ${error}`)
        }
        res.status(400).send(`Unable to get budget`);
    }
     
};

export const getBudgetById = async (req: Request, res: Response) => {
    
    let id:string = req.params.id;
  try {
    const query = { _id: new ObjectId(id) };
    const budget = (await budgetCollection.findOne(query)) as Budget;

    if (budget) {
        res.status(200).send(budget);
    }
} catch (error) {
    if (error instanceof Error)
    {
     console.log(`issue with inserting ${error.message}`);
    }
    else{
      console.log(`error with ${error}`)
    }
    res.status(400).send(`Unable to get budget id`);
  }

};

export const createBudget = async(req: Request, res: Response) => {
//create new budget plan in the database
try {

    let validateResult : Joi.ValidationResult = ValidateBudget(req.body)

    if (validateResult.error) {
      res.status(400).json(validateResult.error);
      return;
    }

    const existingUser = await usersCollection.findOne({email:req.body.email})

    if (existingUser){
      res.status(400).json({"error": "existing email"});
      return;
    }
    

    let newBudget : Budget = 
    {
      name: req.body.name,
      email: req.body.email,
      budgetLimit : req.body.budgetLimit,
      category: req.body.category,
      transactions: req.body.transactions,
      //role: req.body.email,
    }

    newBudget.hashedPassword = await argon2.hash(req.body.password)

    console.log(newBudget.hashedPassword)

    //const newBudget = req.body as Budget;

    const result = await budgetCollection.insertOne(newBudget)

    if (result) {
        res.status(201).location(`${result.insertedId}`).json({message : `Created a new user with id ${result.insertedId}`})}
        else {
        res.status(500).send("Failed to create a new budget.");
        }
    }
    catch (error) {
        if (error instanceof Error)
        {
         console.log(`issue with inserting ${error.message}`);
        }
        else{
          console.log(`error with ${error}`)
        }
        res.status(400).send(`Unable to create new budget`);
    }

};

export const updateBudget = async (req: Request, res: Response) => {
    let id:string = req.params.id;
  try{
    const newData = req.body;

    if(!ObjectId.isValid(id)) {
      return res.status(400).send({error: 'Invalid budget ID format.' });
    }

    const query = { _id: new ObjectId(id) };

    const result = await budgetCollection.updateOne(query, {$set : newData});

    if(result.matchedCount === 0){
      return res.status(404).send({error: 'Budget not found'});
    }

    return res.status(200).send({message: 'Budget updated successfully'});

  }catch (error) {
    if (error instanceof Error)
    {
     console.log(`issue with inserting ${error.message}`);
    }
    else{
      console.log(`error with ${error}`)
    }
    res.status(400).send(`Unable to update budget`);
}
};

export const deleteBudget = async (req: Request, res: Response) => {

    let id:string = req.params.id;
  try {
    const query = { _id: new ObjectId(id) };
    const result = await budgetCollection.deleteOne(query);

    if (result && result.deletedCount) {
        res.status(202).json({message :`Successfully removed budget with id ${id}`});
    } else if (!result) {
        res.status(400).json({message: `Failed to remove budget with id ${id}`});
    } else if (!result.deletedCount) {
        res.status(404).json({message: `no user fround with id ${id}`});
    }
} catch (error) {
  if (error instanceof Error)
  {
   console.log(`issue with inserting ${error.message}`);
  }
  else{
    console.log(`error with ${error}`)
  }
  res.status(400).send(`Unable to delete budget`);
}
};