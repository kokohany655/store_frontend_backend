import { Request, Response , NextFunction } from "express";
import asyncHandler from "express-async-handler";
import Order from "../models/order";
import ApiError from "../utils/ApiError";

export const GetAll =asyncHandler( async (req: Request,res: Response,next: NextFunction) => {
    const orders = await Order.getAllOrdersByUserId(req.params.id as unknown as number);
    res.json(orders);
  
});

export const createOrder = asyncHandler(async (req: Request,res: Response,next: NextFunction) => {
    const {user_id,status} = req.body;
    const order = await Order.create({user_id,status});
    res.status(201).json(order);
} );

export const getActiveOrder =asyncHandler( async (req: Request,res: Response,next: NextFunction) => {
    const currentOrder = await Order.getActiveOrder(
      req.params.id as unknown as number
    );
    res.json({ currentOrder});
});

export const getCompletedOrders =asyncHandler( async ( req: Request,res: Response,next: NextFunction) => {
    const completedOrders = await Order.getCompletedOrders(
      req.params.id as unknown as number
    );
    res.json({completedOrders});
  
});

export const addProduct =asyncHandler( async (req: Request,res: Response,next: NextFunction) => {
    const order_id: string = req.params.id;
    const product_id: string = req.body.product_id;
    const quantity: number = parseInt(req.body.quantity);

    const addedProduct = await Order.addProduct(quantity, order_id, product_id);
    res.json({addedProduct});
});

export const deleteOrder = asyncHandler( async (req: Request,res: Response,next: NextFunction) => {
    const order = await Order.delete(req.params.id as unknown as string);
    if(!order){
        next(new ApiError(`Order with id ${req.params.id} not found`,404));
    }
    res.json({order});
}
);

export const  updateOrder =asyncHandler( async (req: Request,res: Response,next: NextFunction) => {
    const order = await Order.update(req.params.id as unknown as string,req.body);
    if(!order){
        next(new ApiError(`Order with id ${req.params.id} not found`,404));
    }
    res.json({order});
}
);



