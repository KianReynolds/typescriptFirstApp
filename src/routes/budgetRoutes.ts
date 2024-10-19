import express, { Router } from "express";

import{
    getBudget,
    createBudget,

} from '../controllers/budgetController'

const router : Router = express.Router();

router.get('/', getBudget);
router.post('/', createBudget);

export default router;