import { ObjectId } from "mongodb";
import Joi from "joi";

enum role{
    admin, user, manager
}

export default interface User {
    name: string;
    email: string;
    password?: string;
    hashedPassword?: string;
    role?: 'admin' | 'user' | 'manager';
    budgets?: ObjectId;
}

export const ValidateUser = (user : User) => {

    const contactJoiSchema = Joi.object<User>({
       
        email: Joi.string().email().required(),   
       name: Joi.string().min(3).required() ,
       password: Joi.string().min(8).max(64).required(), 
        role: Joi.string().valid('admin', 'user', 'manager').default('user'),
        budgets: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)),
    });

    return contactJoiSchema.validate(user);
}

