CREATE TABLE order.tb_product
(   id_product int NOT NULL AUTO_INCREMENT,
	ds_product varchar(100) NULL,
	vl_product NUMERIC NULL,
	qt_product int NULL,
	CONSTRAINT tb_product_PK PRIMARY KEY(id_product)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;

CREATE TABLE order.tb_order
(
	id_order int NOT NULL AUTO_INCREMENT,
	ds_address varchar(100) NULL,
	st_order char NULL,
	id_person int NOT NULL,
	CONSTRAINT tb_order_PK PRIMARY KEY(id_order)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;

CREATE TABLE order.rl_order_product
(
	id_order_product int NOT NULL AUTO_INCREMENT,
	id_product int NOT NULL,
	id_order int NOT NULL,
	CONSTRAINT rl_order_product_PK PRIMARY KEY(id_order_product),
	CONSTRAINT rl_order_product_tb_product_FK FOREIGN KEY(id_product) REFERENCES `order`.tb_product(id_product) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT rl_order_product_tb_order_FK FOREIGN KEY (id_order) REFERENCES `order`.tb_order(id_order) ON DELETE CASCADE ON UPDATE CASCADE
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;

INSERT into tb_product(ds_product, vl_product, qt_product)values("boné", 25.00, 2);
INSERT into tb_product(ds_product, vl_product, qt_product)values("camiseta", 35.00, 1);
INSERT into tb_product(ds_product, vl_product, qt_product)values("bermuda", 65.00, 5);
commit

INSERT into tb_order(ds_address, st_order, id_person)values("Casa do Chapeu", "P", 1);
commit

INSERT into rl_order_product(id_order, id_product)values(1, 1);
INSERT into rl_order_product(id_order, id_product)values(1, 2);
INSERT into rl_order_product(id_order, id_product)values(1, 3);
commit