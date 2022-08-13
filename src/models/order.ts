import db from '../database/database';
import User from './user';

export type Order = {
  id?: number | string;
  status: string;
  user_id: number | string;
};

export type order_products = {
  order_id: number | string;
  product_id: number | string;
  quantity: number;
};

class OrderModel {

  async create(o: Order): Promise<Order> {
    try {
      const connect = await db.connect();
        const sql =
        'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING id, status, user_id';
      const result = await connect.query(sql, [o.status, o.user_id]);
      const order = result.rows[0];
      connect.release();
      return order;
    } catch (err) {
      throw new Error(`Could not create order. Error: ${err as Error}`);
    }
  }

  async getAllOrdersByUserId(id: number | string): Promise<Order[]> {
    try {
      const connect = await db.connect();
      const sql = `SELECT * FROM orders WHERE user_id=($1)`;
      const result = await connect.query(sql, [id]);
      const orders = result.rows;
      connect.release();
      return orders;
    } catch (err) {
      throw new Error(`Unable to get orders by user ${id}. ${err}.`);
    }
  }

  async getActiveOrder(id: number | string): Promise<Order> {
    try {
      const connect = await db.connect();
      const sql = `SELECT * FROM orders WHERE user_id=($1) AND status='active'`;
      const result = await connect.query(sql, [id]);
      const currentOrder = result.rows[0];
      connect.release();
      return currentOrder;
    } catch (err) {
      throw new Error(`Unable to get current order. Error: ${err}.`);
    }
  }
  
  async getCompletedOrders(id: number | string): Promise<Order[]> {
    try {
      const connect = await db.connect();
      const sql = `SELECT * FROM orders WHERE user_id=($1) AND status='complete'`;
      const result = await connect.query(sql, [id]);
      const completedOrders = result.rows;
      connect.release();
      return completedOrders;
    } catch (err) {
      throw new Error(`Unable to get completed orders. ${err}.`);
    }
  }
  // ADD PRODUCT method: adds a product to an order
  async addProduct(quantity: number,order_id: number | string,product_id: number | string): Promise<order_products> {
    try {
      const connect = await db.connect();
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *';
      const result = await connect.query(sql, [quantity, order_id, product_id]);
      const order = result.rows[0];
      connect.release();
      return order;
    } catch (err) {
      throw new Error(
        `Couldn't add product ${product_id} to order ${order_id}. ${err}`
      );
    }
  }

  async delete(id: number | string): Promise<Order> {
    try {
      const connect = await db.connect();
      const sql = `DELETE FROM orders WHERE id = ($1) RETURNING *`;
      const result = await connect.query(sql, [id]);
      const order = result.rows[0];
      connect.release();
      return order;
    } catch (err) {
      throw new Error(`Could not delete order. Error: ${err as Error}`);
    }
  }

    async update(id: number | string, o: Order): Promise<Order> {
    try {
      const connect = await db.connect();
      const sql = `UPDATE orders SET status=($1) WHERE id=($2) RETURNING *`;
      const result = await connect.query(sql, [o.status, id]);
      const order = result.rows[0];
      connect.release();
      return order;
    } catch (err) {
      throw new Error(`Could not update order. Error: ${err as Error}`);
    }
  }


}

export default new OrderModel();