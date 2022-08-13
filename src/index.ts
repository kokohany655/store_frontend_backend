import express, { Application, Request, Response, NextFunction } from 'express';
import Error from './interfaces/errorInterface';
import ApiError from './utils/ApiError';
import {GlobalError} from './middleware/globalError';
import config from './config';
import db from './database/database';
import user from './routes/user';
import product from './routes/product';
import order from './routes/order';

const app: Application = express();

const port = config.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// routers
app.get('/', (req: Request, res: Response) => {
    res.send('app running');
} );
app.use('/api/v1/users', user);
app.use('/api/v1/products', product);
app.use('/api/v1/orders', order);

//listen on port 3000, default port if not specified
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//this is the error handler for check route is exist or not
app.all('*', (err:Error,req: Request, res: Response, next: NextFunction) => {
    next(new ApiError(`Can not found this route: ${req.originalUrl}`,400))
});

//test database connection
db.connect().then((client)=>{
    return client.query('SELECT NOW()').then((res)=>{
      client.release();
      console.log(res.rows)
    }).catch((err:Error)=>{
      client.release();
      console.log(err.stack)
    })
})

//this is a middleware for handling error in express
app.use(GlobalError)

export default app;


