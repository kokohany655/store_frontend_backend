import { Request , Response , NextFunction } from "express";
import asyncHandler from "express-async-handler";
import Product from "../models/products";
import ApiError from "../utils/ApiError";

export const GetAllProducts = asyncHandler(async (req:Request,res:Response)=>{
    const products = await Product.getAll()
    res.status(200).json(products)
})

export const GetProductById = asyncHandler(async (req:Request,res:Response,next:NextFunction)=>{    
    const product = await Product.getById(req.params.id as unknown as string)
    if(!product){
        next(new ApiError(`Product with id ${req.params.id} not found`,404))
    }
    res.status(200).json(product)
} )

export const CreateProduct = asyncHandler(async (req:Request,res:Response)=>{
    const {title,description,price,quantity} = req.body
    const product = await Product.create({title,description,price,quantity})
    res.status(201).json(product)
} )

export const UpdateProduct = asyncHandler(async (req:Request,res:Response,next:NextFunction)=>{
    const {title,description,price,quantity} = req.body
    const product = await Product.update((req.params.id as unknown) as string,{title,description,price,quantity})
    if(!product){
        next(new ApiError(`Product with id ${req.params.id} not found`,404))
    }
    res.status(200).json(product)
} )  

export const DeleteProduct = asyncHandler(async (req:Request,res:Response,next:NextFunction)=>{
    const product = await Product.delete((req.params.id as unknown) as string)
    if(!product){
        next(new ApiError(`Product with id ${req.params.id} not found`,404))
    }
    res.status(200).json(product)
} )


