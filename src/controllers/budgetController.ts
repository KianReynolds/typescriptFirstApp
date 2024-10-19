import { Request, Response } from "express";
import Budget from "../models/budgetModel";
import { budgetCollection } from "../database";

export const createBudget = async(req: Request, res: Response) => {
//create new budget plan in the database
try{
    const newPlan = req.body as Budget;

    const result = await budgetCollection.insertOne(newPlan)

}
catch(error){
    if(error instanceof Error){
        console.log(`issue with inserting ${error.message}`)
    }
    else{
        console.log(`issue with ${error}`)
    }
    res.status(400).send('unable to create a new budget')
}
}