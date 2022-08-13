/* Replace with your SQL commands */
create table products (
  id serial primary key,
  title varchar(255) not null,
  description text not null,
  quantity integer not null,
  price numeric not null,
  created_at timestamp not null default now()
);