class ApiError extends Error{
        statusCode:number
        status:string
        isOperational:boolean
    public constructor(message:string, statusCode:number){
        super(message)
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4')?'fail':'error';
        this.isOperational = true;
    }
}

export default ApiError;