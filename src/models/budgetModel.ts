import { ObjectId } from "mongodb";
import Joi from "joi";

export default interface Budget{
    name: string;
    //id? : ObjectId;
    category : string;
    amount: number;
    description : string;
    date : Date;
}

export const ValiadateBudget =  (budget:Budget) => {

    const budgetScema = Joi.object<Budget>({
        name: Joi.string().min(3).required(),
        //id: Joi.object({$oid: Joi.string()}).required(),
        category: Joi.string().required(),
        amount: Joi.number().integer().required()
    })
}