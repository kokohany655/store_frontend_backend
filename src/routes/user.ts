import * as controller from '../controllers/user';
import express , { Router } from 'express';
import authenticate from '../middleware/auth';
import * as validator from '../validator/user.validate';

const router:Router = express.Router();

router.route('/')
    .get( authenticate,controller.GetAllUsers)
    .post(validator.CreateUser, controller.CreateUser);

router.route('/:id')
    .get(authenticate,validator.GetUser, controller.GetUserById)
    .put(authenticate,validator.UpdateUser, controller.UpdateUser)
    .delete(authenticate,validator.DeleteUser ,controller.DeleteUser);

router.route('/authenticate').post(controller.authenticate);



export default router;

// import * as controller from '../controllers/user';