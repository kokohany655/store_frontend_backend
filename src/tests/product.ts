import products from "../models/products";

describe('Product Model methods definition', () => {
    it('Should have an INDEX method', () => {
        expect(products.getAll).toBeDefined();
    }),
    it('Should have a SHOW method', () => {
        expect(products.getById).toBeDefined();
    }),
    it('Should have a CREATE method', () => {
        expect(products.create).toBeDefined();
    }),
    it('Should have a UPDATE method', () => {
        expect(products.update).toBeDefined();
    }),
    it('Should have a DELETE method', () => {
        expect(products.delete).toBeDefined();
    })
    })


    describe('Product Model methods', () => {
    it('Should create a product', async () => {
        const product = await products.create({
        id: 1,
        title: 'DEll',
        price: 20,
        description: 'core i7 16 ram 1TB',
        quantity: 5
        });
        expect(product.title).toBe('DEll');
    }),
    it('Should return all products', async () => {
        const product = await products.getAll();
        expect(product.length).toBe(1);
    }),
    it('Should return a product by id', async () => {
        const product = await products.getById(1);
        expect(product.id).toBe(1);
    }),
    it('Should update a product', async () => {
        const product = await products.update(1, {
        id: 1,
        title: "lenovo",
        price: 5,
        description: 'core i7 16 ram 1TB',
        quantity: 5
        });
        expect(product.description).toBe('core i7 16 ram 1TB');
    }),
    it('Should delete a product', async () => {
        const product = await products.delete(1);
        expect(product.id).toBe(1);
    })
})