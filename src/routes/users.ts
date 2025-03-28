import express, {Router} from 'express';
import { isAdmin, validJWTProvided } from '../middleware/auth.middleware';

import { authenticateKey } from '../middleware/auth.middleware';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  
} from '../controllers/users';

const router: Router = express.Router();

router.get('/', validJWTProvided, isAdmin, getUsers);
router.get('/:id', validJWTProvided, isAdmin, getUserById);
router.post('/',  createUser);
router.put('/:id', validJWTProvided, isAdmin, updateUser);
router.delete('/:id', validJWTProvided, isAdmin, deleteUser);

export default router;
