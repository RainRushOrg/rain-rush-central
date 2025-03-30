import { Router } from 'express';
import authController from '../controller/authController';
import userController from '../controller/userController';

const router = Router();
router.post('/register', authController.register);

router.post('/login', (req, res) => {
  authController.login(req, res);
});

router.get('/check-username/:username', (req, res) => {
  userController.checkUserNameAvailability( req, res );
});

router.get('/check-email/:email', (req, res) => {
  userController.checkEmailAvailability( req, res );
});

export default router;
