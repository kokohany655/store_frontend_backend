import {Request , Response , NextFunction} from 'express'
import asyncHandler from 'express-async-handler'
import ApiError from '../utils/ApiError'
import User from '../models/user'
import jwt from 'jsonwebtoken'
import config from '../config'

//@desc get all users
//@route GET /api/v1/users
//@access public
export const GetAllUsers = asyncHandler(async (req:Request,res:Response)=>{
    const users = await User.getAll()
    res.status(200).json(users)
} )

//@desc get user by id
//@route GET /api/v1/users/:id
//@access public
export const GetUserById = asyncHandler(async (req:Request,res:Response,next:NextFunction)=>{    
    const user = await User.getById(req.params.id as unknown as number)
    if(!user){
        next(new ApiError(`User with id ${req.params.id} not found`,404))
    }
    res.status(200).json(user)
} )

//@desc create user
//@route POST /api/v1/users
//@access public
export const CreateUser = asyncHandler(async (req:Request,res:Response)=>{
    const {first_name,last_name,email,password} = req.body
    const user = await User.create({first_name,last_name,email,password})
    const token = jwt.sign(user,config.TOKEN_SECRET as unknown as string ,{expiresIn:'1d'})
    res.status(201).header('x-auth-token',token).json(user)
} )

//@desc update user
//@route PUT /api/v1/users/:id
//@access private
export const UpdateUser = asyncHandler(async (req:Request,res:Response,next:NextFunction)=>{
    const {first_name,last_name,email,password} = req.body
    const user = await User.update((req.params.id as unknown) as number,{first_name,last_name,email,password})
    if(!user){
        next(new ApiError(`User with id ${req.params.id} not found`,404))
    }
    res.status(200).json(user)
} )

//@desc delete user
//@route DELETE /api/v1/users/:id
//@access private
export const DeleteUser = asyncHandler(async (req:Request,res:Response,next:NextFunction)=>{
    const user = await User.delete((req.params.id as unknown) as number)
    if(!user){
        next(new ApiError(`User with id ${req.params.id} not found`,404))
    }
    res.status(200).json(user)
} )

export const authenticate = asyncHandler(async (req:Request,res:Response,next:NextFunction)=>{
    const {email,password} = req.body
    const user = await User.authenticate(email,password)
    if(!user){
        next(new ApiError(`User with email ${email} not found`,404))
    }
    const token = jwt.sign(user,config.TOKEN_SECRET as unknown as string ,{expiresIn:'1d'})
    res.status(200).header('x-auth-token',token).json(user)
})