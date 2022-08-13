import userstore, { User } from '../models/user';
import productstore, { product } from '../models/products';
import store, { Order } from '../models/order';
import Client from '../database/database';


describe('Order Model methods definition', () => {
  it('Should have an INDEX method', () => {
    expect(store.getAllOrdersByUserId).toBeDefined();
  });

  it('Should have a GET CURRENT ORDER method', () => {
    expect(store.getActiveOrder).toBeDefined();
  });

  it('Should have a GET COMPLETED ORDERS method', () => {
    expect(store.getCompletedOrders).toBeDefined();
  });

  it('Should have an ADD-PRODUCT method', () => {
    expect(store.addProduct).toBeDefined();
  });
});

describe('Order Model methods logic', () => {
  const user: User = {
    email: 'hadir@gmail.com',
    first_name: 'Hadir',
    last_name: 'Wahid',
    password: '00000'
  };

  const product: product = {
    title: 'lipstick',
    price: 10,
    description: 'red lipstick',
    quantity: 5
  };

  const order1: Order = {
    status: 'active',
    user_id: 1
  };

  const order2: Order = {
    status: 'complete',
    user_id: 1
  };

  beforeAll(async () => {
    await userstore.create(user);
    await productstore.create(product);
    await store.create(order1);
    await store.create(order2);
  });

  afterAll(async () => {
    const connect = await Client.connect();
    const sql =
      'ALTER SEQUENCE users_id_seq RESTART WITH 1;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n ALTER SEQUENCE order_products_id_seq RESTART WITH 1;\n DELETE FROM order_products;\n DELETE FROM orders;\n DELETE FROM products;\n DELETE FROM users;';
    await connect.query(sql);
    connect.release();
  });

  it('INDEX method should return all orders by user along with the user id', async () => {
    const result = await store.getAllOrdersByUserId(1);
    expect(result[0].id).toEqual(1);
    expect(result[0].user_id).toEqual('1');
    expect(result[0].status).toEqual('active');
    expect(result[1].id).toEqual(2);
    expect(result[1].user_id).toEqual('1');
    expect(result[1].status).toEqual('complete');
    expect(result.length).toEqual(2);
  });

  it('GET CURRENT ORDER method should return current order by user along with the user id', async () => {
    const result = await store.getActiveOrder(1);
    expect(result.id).toEqual(1);
    expect(result.user_id).toEqual('1');
    expect(result.status).toEqual('active');
  });

  it('GET COMPLETED ORDERS method should return completed orders by user along with the user id', async () => {
    const result = await store.getCompletedOrders(1);
    expect(result[0].id).toEqual(2);
    expect(result[0].user_id).toEqual('1');
    expect(result[0].status).toEqual('complete');
    expect(result.length).toEqual(1);
  });

  it('ADD-PRODUCT method should return a product data of a specific id', async () => {
    const result = await store.addProduct(5, 1, 1);
    expect(result.quantity).toEqual(5);
    expect(result.product_id).toEqual('1');
    expect(result.order_id).toEqual('1');
  });
});