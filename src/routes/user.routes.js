import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { getUsers, createUser } from '../controllers/user.controller.js';

const router = express.Router();

router.use(protect);
router.get('/', getUsers);
router.post('/', createUser);

export default router;