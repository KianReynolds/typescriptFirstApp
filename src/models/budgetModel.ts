import { ObjectId } from "mongodb";
import Joi from "joi";

enum role{
    admin, editor, ''
}

export default interface Budget{
    name: string;
    id? : ObjectId;
    budgetLimit: number;
    category : string;
    transactions: Transactions[];
    email: string;
    password?: string;
    hashedPassword?: string;
   
    role?: role;
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
        category: Joi.string(),
        name: Joi.string().min(3),
        budgetLimit: Joi.number().positive(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(64).required(),
        role: Joi.string().valid(...Object.values(role)),
        transactions: Joi.array().items(transactionSchema)
    })
    return budgetScema.validate(budget);
    
}