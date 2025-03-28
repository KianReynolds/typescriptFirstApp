import express, { Router } from 'express';
import { validJWTProvided } from '../middleware/auth.middleware';

import{
    handleLogin,
    deleteUser,
} from '../controllers/auth';


const router: Router = express.Router();


router.post('/',  handleLogin);
router.delete('/:id', validJWTProvided, deleteUser);

export default router;