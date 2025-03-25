import { Request, Response } from 'express';
import { budgetCollection } from "../database";
import * as argon2 from 'argon2';
import { sign as jwtSign, verify as jwtVerify } from 'jsonwebtoken';
import  Budget, { ValidateBudget }  from '../models/budgetModel';
import Joi from 'joi';
import { ObjectId } from 'mongodb';

export const handleLogin = async (req: Request, res: Response) => {

    const email = req.body?.email
    
    const password = req.body?.password
  
    if (!email || !password) {
       res
        .status(400)
        .json({ message: 'Email and password are required' });
        return;
    }
      const budget = await budgetCollection.findOne({
        email: email.toLowerCase(),
      })
  
      const dummyPassword = 'dummy_password';
      const dummyHash = await argon2.hash(dummyPassword);
    
      // Use the user's hash if found, otherwise use the dummy hash
      
     let userPasswordHash;

      if (budget && budget.hashedPassword){
       userPasswordHash =  budget.hashedPassword;
      }
      else{
         userPasswordHash = dummyHash;
      }
    
      // check password

        const isPasswordValid = await argon2.verify(userPasswordHash, password);
    
    
        // If password is invalid, return unauthorized
        if (!isPasswordValid) {
         res.status(401).json({
            message: 'Invalid email or password!'
          });
          return;
        }

        res.status(201).send({ accessToken: createAccessToken(budget) });

      }

const createAccessToken = (budget: Budget | null) : string  => {
    
    if (!budget) {
        throw new Error("Cannot create token for non-existent user");
    }
    const secret = process.env.JWTSECRET || "not very secret";
    const expiresTime = process.env.JWTEXPIRES = "1h";
    console.log(expiresTime);
    const payload =
    {
        email: budget?.email,
        name: budget?.name,
    }
    const token = jwtSign(payload, secret, {expiresIn : expiresTime }); 

    return token;

}

export const deleteUser = async (req: Request, res: Response) => { 
  
  let id:string = req.params.id;
  try {
    const query = { _id: new ObjectId(id) };
    const result = await budgetCollection.deleteOne(query);

    if (result && result.deletedCount) {
        res.status(202).json({message :`Successfully removed user with id ${id}`});
    } else if (!result) {
        res.status(400).json({message: `Failed to remove user with id ${id}`});
    } else if (!result.deletedCount) {
        res.status(404).json({message: `no user found with id ${id}`});
    }
} catch (error) {
  if (error instanceof Error)
  {
   console.log(`issue with inserting ${error.message}`);
  }
  else{
    console.log(`error with ${error}`)
  }
  res.status(400).send(`Unable to delete user`);
}

let validateResult : Joi.ValidationResult = ValidateBudget(req.body)

 if (validateResult.error) {
   res.status(400).json(validateResult.error);
   return;
 }

};