import express, { Router } from "express";

import{
    getBudget,
    getBudgetById,
    createBudget,
    updateBudget,
    deleteBudget,

} from '../controllers/budgetController'

const router : Router = express.Router();

router.get('/', getBudget);
router.get('/:id', getBudgetById);
router.post('/', createBudget);
router.put('/:id', updateBudget);
router.delete('/:id', deleteBudget);


export default router;