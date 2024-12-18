import express, {Router} from 'express';
//import { validJWTProvided } from '../middleware/auth.middleware';

import { authenticateKey } from '../middleware/auth.middleware';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  
} from '../controllers/users';

const router: Router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
