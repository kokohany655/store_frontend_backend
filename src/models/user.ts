import db from '../database/database';
import config from '../config'
import bcrypt from 'bcrypt'

const hashPassword = async (password: string): Promise<string> => {
    const hash = await bcrypt.hash(password + config.BCRIPT_SECRET, parseInt(config.SALT_ROUNDS as string, 10))
    return hash 
}

export type User = {
    id?: number| string
    first_name: string;
    last_name: string;
    email: string
    password: string
    createdAt?: Date
}

class UserModel {
    async getAll(): Promise<User[]> {
        try{const connection = await db.connect()
        const sql = `SELECT id, email, first_name , last_name , created_at FROM users`
        const users = await connection.query(sql)
        connection.release()
        return users.rows
        } catch(error) {
            throw new Error(`could not get users :${error}`)
        }   
    }

    async getById(id: number|string): Promise<User> {
        try{const connection = await db.connect()
        const sql = `SELECT id, email, first_name , last_name , created_at FROM users WHERE id = $1`
        const user = await connection.query(sql, [id])
        connection.release()
        return user.rows[0]
        } catch(error) {
            throw new Error(`could not get user by id :${error}`)
        }
    }
    
    async create(user: User): Promise<User> {
        try{const hash = await hashPassword(user.password)
        const connection = await db.connect()
        const sql = `INSERT INTO users (email, first_name , last_name, password) VALUES ($1, $2, $3 ,$4) RETURNING *`
        const newUser = await connection.query(sql, [user.last_name, user.first_name ,user.email, hash])
        connection.release()
        return newUser.rows[0]
        } catch(error) {
            throw new Error(`could not create user :${error}`)
        }
    }
    
    async update(id: number|string, user: User): Promise<User> {
        try{const hash = await hashPassword(user.password)
        const connection = await db.connect()
        const sql = `UPDATE users SET last_name = $1,first_name=$2, email = $3, password = $4 WHERE id = $5 RETURNING *`
        const updatedUser = await connection.query(sql, [user.first_name, user.last_name, user.email, hash, id])
        connection.release()
        return updatedUser.rows[0]
        } catch(error) {
            throw new Error(`could not update user :${error}`)
        }
    }
    
    async delete(id: number|string): Promise<User> {
try{const connection = await db.connect()
        const sql = `DELETE FROM users WHERE id = ($1) RETURNING *`
        const deletedUser = await connection.query(sql, [id])
        connection.release()
        return {...deletedUser.rows[0]}
        } catch(error) {
            throw new Error(`could not delete user :${error}`)
        }
    }

    async authenticate (email: string, password: string): Promise<User> {
        try{const connection = await db.connect()
        const sql = `SELECT * FROM users WHERE email = $1`
        const user = await connection.query(sql, [email])
        connection.release()
        if (user.rows.length === 0) {
            throw new Error('User not found')
        }
        const isPasswordValid = await bcrypt.compare(password + config.BCRIPT_SECRET, user.rows[0].password)
        if (!isPasswordValid) {
         throw new Error('Password is not valid')
        }
        return user.rows[0]
        } catch(error) {    
            throw new Error(`could not authenticate user :${error}`)
        }
    }
}
  

export default new UserModel();
