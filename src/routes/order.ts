import * as controller from '../controllers/order';
import express , { Router } from 'express';
import authenticate from '../middleware/auth';
import * as validator from '../validator/order.validate';

const router:Router = express.Router();

router.route('/')
    .get( authenticate,controller.GetAll)
    .post(validator.CreateOrder,controller.createOrder);

router.route('/:id')
    .put(authenticate,validator.UpdateOrder,controller.updateOrder) 
    .delete(authenticate,validator.DeleteOrder,controller.deleteOrder)


router.route('/:id/Active').get(authenticate,controller.getActiveOrder)
router.route('/:id/completed').get(authenticate,controller.getCompletedOrders)
router.route('/addproduct').post(authenticate,validator.addProduct,controller.addProduct)


export default router;