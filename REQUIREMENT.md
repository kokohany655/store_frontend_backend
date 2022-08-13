 A-RESTFUL Routes:
(You need to create a user first then authenticate it to get the token that's required for the other routes)

## 1-Users:

- CREATE route:
  - `api/users`
  - Method: POST

- AUTHENTICATE route:
  - `api/users/authenticate`
  - Method: POST

- GEt All route (Token Required):
  - `api/users`
  - Method: GET

- GEt Uer by id route (Token Required):
  - `api/users/:id`
  - Method: GET
  - Args: user_id

- UPDATE route (Token Required):
  - `api/users/:id`
  - Method: PUT
  - Args: user_id

- DELETE route (Token Required):
  - `api/users/:id`
  - Method: DELETE
  - Args: user_id

## 2-Products:

- GET ALL route:
  - `api/products`
  - Method: GET

- GET BY ID route:
  - `api/products/:id`
  - Method: GET
  - Args: category


- CREATE route (Token Required): 
  - `api/products`
  - Method: POST

- UPDATE route (Token Required):
    - `api/products/:id`
    - Method: PUT
    - Args: product_id

- DELETE route (Token Required):
    - `api/products/:id`
    - Method: DELETE
    - Args: product_id

## 3-Orders:

- INDEX route (Token Required):
  - `api/orders/:id`
  - Method: GET
  - Args: user_id

- GET CURRENT ORDER route (Token Required):
  - `api/orders/:id/Active`
  - Method: GET
  - Args: user_id

- GET COMPLETED ORDERS route (Token Required):
  - `api/orders/:id/completed`
  - Method: GET
  - Args: user_id

- ADD PRODUCTS route (Token Required):
  - (allows the users to add a product to an order so that they can view it in a cart)
  - `api/orders/:id/addproduct`
  - Method: GET
  - Args: product_id

- UPDATE ORDER route (Token Required):
  - `api/orders/:id`
  - Method: PUT
  - Args: order_id

- DELETE ORDER route (Token Required):
    - `api/orders/:id`
    - Method: DELETE
    - Args: order_id

# B-Database Schema:

- Table: `users`
  - id: `serial primary key`
  - email: `varchar`
  - first_name: `varchar`
  - last_name: `varchar`
  - password: `varchar`
  - created_at: `timestamp`

- Table: `products`
  - id: `serial primary key`
  - name: `varchar`
  - price: `integer`
  - description: `varchar`
  - title: `varchar`
  - qauntity: `integer`

- Table: `orders`
  - id: `serial primary key`
  - status: `varchar`
  - user_id: `bigint` [foreign key to users table]

- Table: `order_products`
  - id: `serial primary key`
  - quantity: `integer`
  - order_id: `bigint` [foreign key to orders table]
  - product_id: `bigint` [foreign key to products table]