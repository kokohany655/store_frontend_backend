import products from './../models/products';

import users, { User } from '../models/user';
import orders, { Order } from '../models/order';
import user from '../models/user';



describe('Order Model methods definition', () => {
  it('Should have an INDEX method', () => {
    expect(orders.getAllOrdersByUserId).toBeDefined();
  });

  it('Should have a GET CURRENT ORDER method', () => {
    expect(orders.getActiveOrder).toBeDefined();
  });

  it('Should have a GET COMPLETED ORDERS method', () => {
    expect(orders.getCompletedOrders).toBeDefined();
  });

  it('Should have an ADD-PRODUCT method', () => {
    expect(orders.addProduct).toBeDefined();
  });
});


describe('Order Model methods logic', () => {
    it('Should create an order', async () => {
      const user = await users.create({
        first_name: 'krkr',
        last_name: 'sameh',
        email: 'kero@58',
        password: "1125652"
      });
      const Order = await orders.create({
        user_id: user.id as string,
        status: 'active'
      });
        expect(Order.user_id).toBe('2');
    } )
    it('Should return all orders', async () => {
        const order = await orders.getAllOrdersByUserId(2);
        expect(order.map(e=>{
            return e.user_id
        })).toContain('2');
    })
    it('Should return an active order', async () => {
        const order = await orders.getActiveOrder(2);
        expect(order.status).toBe('active');
    } )
    it('Should return all completed orders', async () => {
        const order = await orders.getCompletedOrders(2);
        expect(order.length).toBe(0);
    } )
    it('Should add a product to an order', async () => {
        const product = await products.create({
            title: 'product',
            description: 'description',
            price: 50,
            quantity: 10
        });
        const order = await orders.addProduct(2,1, product.id as string);
        expect(order.quantity).toBe(2);
    } )

    it('should update an order', async () => {
        const order = await orders.update(1, {
            id: 2,
            user_id: '2',
            status: 'completed'
        });
        expect(order.status).toBe('completed');
    } )

    it('should delete an order', async () => {
        const order = await orders.delete(2);
        expect(order).toBeUndefined()
    }
    )
})