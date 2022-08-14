import * as controller from '../controllers/products';
import express , { Router } from 'express';
import * as validator from '../validator/product.validate';
import authenticate from '../middleware/auth';
const router:Router = express.Router();

router.route('/')
    .get(controller.GetAllProducts)
    .post(authenticate,validator.CreateProduct,controller.CreateProduct);

router.route('/:id')
    .get(validator.GetProductById,controller.GetProductById)
    .put(authenticate,validator.UpdateProduct,controller.UpdateProduct)
    .delete(authenticate,validator.DeleteProduct,controller.DeleteProduct);

export default router;


