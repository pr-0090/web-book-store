import express from 'express';
import {
  handleUserLogin,
  handleUserRegister,
  handleAdminLogin
} from '../controllers/userController.js';

const router = express.Router();

router.post('/register', handleUserRegister);
router.post('/login', handleUserLogin);
router.post('/admin', handleAdminLogin);

export default router;
