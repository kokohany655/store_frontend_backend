import dotenv from 'dotenv';

dotenv.config();

const { 
    PORT,
    NODE_ENV,
    POSTGRES_HOST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB,
    POSTGRES_PORT,
    POSTGRES_DB_TEST,
    BCRIPT_SECRET,
    SALT_ROUNDS,
    TOKEN_SECRET,
} = process.env;

export default {
    PORT,  
    NODE_ENV,
    POSTGRES_HOST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB,
    POSTGRES_PORT,
    POSTGRES_DB_TEST,
    BCRIPT_SECRET,
    SALT_ROUNDS,
    TOKEN_SECRET,
}