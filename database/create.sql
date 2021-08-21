create schema ccca;

create table ccca.item (
    id serial,
    description text,
    price numeric,
    height integer,
    width integer,
    length integer,
    weight integer
);

insert into ccca.item (description, price, width, height, length, weight) values ('Guitarra', 1000, 100, 50, 15, 3);
insert into ccca.item (description, price, width, height, length, weight) values ('Amplificador', 5000, 50, 50, 50, 22);
insert into ccca.item (description, price, width, height, length, weight) values ('Cabo', 30, 10, 10, 10, 1);

create table ccca.coupon (
	code text,
	percentage numeric,
	expire_date timestamp,
	primary key (code)
);

insert into ccca.coupon (code, percentage, expire_date) values ('VALE20', 20, '2021-10-10T10:00:00');
insert into ccca.coupon (code, percentage, expire_date) values ('VALE20_EXPIRED', 20, '2020-10-10T10:00:00');

create table ccca.order (
	id serial,
	coupon_code text,
	code text,
	cpf text,
	issue_date timestamp,
	freight numeric,
	serial integer,
	primary key (id)
);

create table ccca.order_item (
	id_order integer,
	id_item integer,
	price numeric,
	quantity integer,
	primary key (id_order, id_item)
);