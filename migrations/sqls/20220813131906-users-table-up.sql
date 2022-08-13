/* Replace with your SQL commands */
create table users (
  id serial primary key,
  first_name varchar(255) not null,
  last_name varchar(255) not null,
  email varchar(255) UNIQUE,
  password varchar(255) NOT NULL,
  created_at timestamp not null default now()
);