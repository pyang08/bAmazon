CREATE DATABASE bamazon_DB;
USE bamazon_DB;

create table products (
id INT not null auto_increment,
productname varchar(50) not null,
departmentname varchar(50) not null,
price INT default 0,
stockquantity INTbamazon_dbbamazon_db default 0,
primary key (id)
);

insert into bamazon_db (productname,departmentname,price,stockquantity)

insert into products (productname,departmentname,price,stockquantity)
values ("Heidi Dress","Clothing",35,6);

insert into products (productname,departmentname,price,stockquantity)
values ("Pamela Dress","Clothing",50,10);

insert into products (productname,departmentname,price,stockquantity)
values ("Roses Tshirt","Clothing",25,8);

insert into products (productname,departmentname,price,stockquantity)
values ("Dont Hurt Em Heels","Shoes",60,1);

insert into products (productname,departmentname,price,stockquantity)
values ("Made For Walking Boots","Shoes",60,4);

insert into products (productname,departmentname,price,stockquantity)
values ("FRESH Fashwash","Beauty",10,2);

insert into products (productname,departmentname,price,stockquantity)
values ("FRESH Shampoo","Beauty",12,5);

insert into products (productname,departmentname,price,stockquantity)
values ("FRESH Conditioner","Beauty",12,5);

insert into products (productname,departmentname,price,stockquantity)
values ("Cleo Earrings","Accessories",5,1);

insert into products (productname,departmentname,price,stockquantity)
values ("Diana Bracelet","Accessories",5,4);

SELECT * FROM products;
