import { ObjectId } from "mongodb";
import Joi from "joi";



export default interface Budget{
    name: string;
    id? : ObjectId;
    userId: ObjectId;
    budgetLimit: number;
    category : string;
    transactions: Transactions[];
    
}

interface Transactions{
    amount: number;
    description : string;
    date : Date;
    type: string;
}

export const ValidateBudget =  (budget:Budget) => {

    const transactionSchema = Joi.object({
        type: Joi.string().valid('income', 'expense'),
        amount: Joi.number().integer(),
        description: Joi.string().min(3),
        date: Joi.date().default(Date.now),
        
    })

    const budgetScema = Joi.object({
        user: Joi.object().required(),
        category: Joi.string(),
        name: Joi.string().min(3),
        budgetLimit: Joi.number().positive(),
        transactions: Joi.array().items(transactionSchema)
    })
    return budgetScema.validate(budget);
    
}