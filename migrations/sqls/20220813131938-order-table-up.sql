/* Replace with your SQL commands */
create table orders (
  id serial primary key,
  user_id BIGINT REFERENCES users(id) not null,
  status varchar(255) not null,
  created_at timestamp not null default now()
);