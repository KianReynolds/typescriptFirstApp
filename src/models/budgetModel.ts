import { ObjectId } from "mongodb";
import Joi from "joi";

export default interface Budget{
    name: string;
    id? : ObjectId;
    budgetLimit: number;
    category : string;
    amount: number;
    description : string;
    date : Date;
    type: string;

}

export const ValiadateBudget =  (budget:Budget) => {

    const budgetScema = Joi.object<Budget>({
        name: Joi.string().min(3).required(),
        budgetLimit: Joi.number().integer().required(),


        type: Joi.string().valid('income', 'expense').required(),

        //id: Joi.object({$oid: Joi.string()}).required(),
        category: Joi.string().required(),
        amount: Joi.number().integer().required(),
        description: Joi.string().min(3).required(),
        date: Joi.date().default(Date.now)
    })
    return budgetScema.validate(budget);
}