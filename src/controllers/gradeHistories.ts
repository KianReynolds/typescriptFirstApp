import { gradeHistoriesCollection} from '../database';
import { Request, Response } from "express";
import  {GradeHistory}  from "../models/gradeHistory"
import { ValidateGrade } from "../models/gradeHistory";
import { ObjectId } from "mongodb";
import Joi from "joi";

export const getGradeHistories = async (req: Request, res: Response) => {
    try{
    const gradeHistories = (await gradeHistoriesCollection.find({}).toArray()) as GradeHistory[];

    res.status(200).json(gradeHistories);
    } catch (error){
        if (error instanceof Error)
            {
             console.log(`issue with inserting ${error.message}`);
            }
            else{
              console.log(`error with ${error}`)
            }
            res.status(400).send(`Unable to get user`);
    }

    
    
};