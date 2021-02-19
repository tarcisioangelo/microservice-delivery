INSERT into tb_product (ds_product, vl_product, qt_product) values ("boné",25.00,2);
INSERT into tb_product (ds_product, vl_product, qt_product) values ("camiseta",35.00,1);
INSERT into tb_product (ds_product, vl_product, qt_product) values ("bermuda",65.00,5);
commit

INSERT into tb_order (ds_address, st_order, id_costumer) values ("Casa do Chapeu","P",1);
commit

INSERT into rl_order_product (id_order, id_product) values (1,1);
INSERT into rl_order_product (id_order, id_product) values (1,2);
INSERT into rl_order_product (id_order, id_product) values (1,3);
commit