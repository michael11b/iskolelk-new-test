import { Router } from 'express';
import * as authController from '../controllers/authController.js';
import * as userController from '../controllers/userController.js';

const router = Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.get('/search', userController.searchUsers);

router.use(authController.protect);

router.patch('/updateMyPassword/:id', authController.updatePassword);

router
    .route('/')
    .get(authController.restrictTo('ADMIN'), userController.getAllUsers)
    .post(authController.restrictTo('ADMIN'), userController.createUser);

router
    .route('/:id')
    .get(authController.restrictTo('ADMIN'), userController.getOneUser)
    .patch(authController.restrictTo('ADMIN'), userController.updateUser)
    .delete(authController.restrictTo('ADMIN'), userController.deleteUser);

export default router;
