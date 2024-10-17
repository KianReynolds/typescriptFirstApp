import { Request, Response } from "express";
import { gradeHistoriesCollection} from '../database';
import  {GradeHistory, ValidateGradeHistory}  from "../models/gradeHistory"
import { ObjectId } from "mongodb";
import Joi from "joi";

export const getGradeHistories = async (req: Request, res: Response) => {
    
  try{

    const page = parseInt(req.query.page as string, 10) || 1;
    const pageSize = parseInt(req.query.pageSize as string, 0) || 0;

    const {filter} = req.query;

    const filterObj = filter ? JSON.parse(filter as string) : {};
      
    const gradeHistories = (await gradeHistoriesCollection
      .find(filterObj)
      .project({"student_id": 1, "class_id" : 1, "_id" : 0})
      .sort({"class_id" : 1})
      .skip((page-1)*pageSize)
      .limit(pageSize)
      .toArray()) as GradeHistory[];

    //const gradeHistories = (await gradeHistoriesCollection.find({"class_id": 1}).toArray()) as GradeHistory[];

    res.status(200).json(gradeHistories);

    } catch (error){

        if (error instanceof Error)
            {
             console.log(`Error with get ${error.message}`);
            }
            
            res.status(500).send(`Unable to get grades`);
    }
    
};