import db from '../database/database';


export type product = {
    id?: string|number;
    title: string;
    description: string;
    quantity: number;
    price: number;
    createdAt?: Date;
}

class ProductModel {
    async getAll(): Promise<product[]> {
        const connection = await db.connect()
        const sql = `SELECT * FROM products`
        const products = await connection.query(sql)
        connection.release()
        return products.rows
    }

    async getById(id: string|number): Promise<product> {
        const connection = await db.connect()
        const sql = `SELECT * FROM products WHERE id = ($1)`
        const product = await connection.query(sql, [id])
        connection.release()
        return product.rows[0]
    }

    async create(product: product): Promise<product> {
        const connection = await db.connect()
        const sql = `INSERT INTO products (title ,description, price ,quantity) VALUES ($1, $2 , $3,$4) RETURNING *`
        const newProduct = await connection.query(sql, [product.title, product.description, product.price,product.quantity])
        connection.release()
        return newProduct.rows[0]
    }
    
    async update (id: string|number, product: product): Promise<product> {
        const connection = await db.connect()
        const sql = `UPDATE products SET title = $1, description = $2, price = $3, quantity = $4 WHERE id = $5 RETURNING *`
        const updatedProduct = await connection.query(sql, [product.title, product.description, product.price,product.quantity, id])
        connection.release()
        return updatedProduct.rows[0]
    }
    
    async delete(id: string|number): Promise<product> {
        const connection = await db.connect()
        const sql = `DELETE FROM products WHERE id = ($1) RETURNING *`
        const deletedProduct = await connection.query(sql, [id])
        connection.release()
        return deletedProduct.rows[0]
    }
}
export default new ProductModel();
