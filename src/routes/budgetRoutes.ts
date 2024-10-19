import express, { Router } from "express";

import{
    createBudget,

} from '../controllers/budgetController'

const router : Router = express.Router();

router.get('/', createBudget);

export default router;