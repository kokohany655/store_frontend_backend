import { Request ,Response , NextFunction } from "express";
import Error from "../interfaces/errorInterface";

export const GlobalError = (err:Error,req:Request,res:Response,next:NextFunction):void=>{
    err.statusCode = err.statusCode || 500 ;
    err.status = err.status || 'error'
    res.status(err.statusCode).json({
        message:err.message,
        Error :process.env.NODE_ENV === 'development'?err.stack:undefined ,
        status:err.status,
        stack:process.env.NODE_ENV === 'development'?err.stack:undefined
    })
    next()
}