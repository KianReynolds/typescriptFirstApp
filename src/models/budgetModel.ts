import { ObjectId } from "mongodb";
import Joi from "joi";

export default interface Budget{
    name: string;
    id? : ObjectId;
    budgetLimit: number;
    category : string;
    transactions: Transactions[];
    password?: string;
    hashedPassword?: string;

}

interface Transactions{
    amount: number;
    description : string;
    date : Date;
    type: string;
}

export const ValiadateBudget =  (budget:Budget) => {

    const transactionSchema = Joi.object({
        type: Joi.string().valid('income', 'expense').required(),
        amount: Joi.number().integer().required(),
        description: Joi.string().min(3).required(),
        date: Joi.date().default(Date.now),
        
    })

    const budgetScema = Joi.object({
        category: Joi.string().required(),
        name: Joi.string().min(3).required(),
        budgetLimit: Joi.number().positive().required(),
        password: Joi.string().min(8).max(64).required(),
        transactions: Joi.array().items(transactionSchema).required()
    })
    return budgetScema.validate(budget);
    
}