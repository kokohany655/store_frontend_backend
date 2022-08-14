# Storefront Backend Project

# DE]escription:

* A Bckend designed with typescript, nodejs and postgreSQl it's for store where user sign up and log in wiht authentcation and view product and make order

# Dependencies:
* bcrypt , db-migrate , db-migrate-pg , dorenv , express , jsonwebtoken , pg

# Scripts:
* npm run fromat : it's sfor foramting code using prettier
* npm run migrate:up : to build tables in data base
* npm run build : to build project
* npm run start : to start project
* npm run test : to test project
* npm run lint

### 2.  DB Creation and Migrations

* table users :
    * id : serial primary key
    * email : varchar(255) not null unique
    * password : varchar(255) not null
    * first_name : varchar(255) not null
    * last_name : varchar(255) not null
    * created_at : timestamp not null default now()

* table products :
    * id : serial primary key
    * name : varchar(255) not null
    * description : varchar(255) not null
    * price : numeric(10,2) not null
    * quantity integer not null
    * created_at : timestamp not null default now()

* table order-products :
    * id SERIAL PRIMARY KEY,
    * quantity integer,
    * order_id bigint REFERENCES orders(id),
    * product_id bigint REFERENCES products(id)

* table orders :
    * id : serial primary key
    * user_id : bigint REFERENCES users(id)
    * status varchar(255) not null
    * created_at : timestamp not null default now()

### 3. Models

users
products
orders

### 4. Express Handlers

* users :
    * get : get all users
    * get : get user by id
    * post : create user
    * put : update user
    * delete : delete user


# create  .env file  and fill it with your data
* PORT=
* NODE_ENVL=
* POSTGRES_HOST=
* POSTGRES_PORT=
* POSTGRES_USER=
* POSTGRES_PASSWORD=
* POSTGRES_DB=
* POSTGRES_DB_TEST=
* SALT_ROUNDS=
* BCRIPT_SECRET=
* TOKEN_SECRET=

# Create DataBase For TESTing And DEVELOPMENT
    * create database store_dev : we using that for development
    * create database store_test : we using that for testing
