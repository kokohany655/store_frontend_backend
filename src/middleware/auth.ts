import { Request , Response , NextFunction } from "express";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/ApiError";
import jwt from "jsonwebtoken";
import config from "../config";


const validateTokenMiddleware = asyncHandler((
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {
    
      // get authHeader
      const token= req.header('x-auth-token');
          if(token){
            const decode = jwt.verify(
              token as string,
              config.TOKEN_SECRET as unknown as string
            );
            if (decode) {
              next();
            } else {
              // failed to authenticate user
              next(new ApiError('Failed to authenticate user', 401));
            }
          }else{
            next(new ApiError('No token provided', 401));
          }
  })
  
  export default validateTokenMiddleware;
