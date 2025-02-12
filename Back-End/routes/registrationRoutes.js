import express from 'express';
import { register, login } from '../controllers/registerController.js';

const router = express.Router();

// These routes will now be accessible at:
// POST /api/register
// POST /api/login
router.post('/register', register);
router.post('/login', login);

export default router;