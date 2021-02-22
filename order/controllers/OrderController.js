const db = require('../database')

class OrderController {

    async list(req, res) {
        try {

            const conn = await db.connection()

            const [rows] = await conn.query('select * from tb_order')

            res.json(rows)

        } catch (error) {
            console.log(error)
        }
    }

    async insert(req, res) {
        try {
            const sqlTbOrder = 'insert into tb_order(ds_address, st_order, id_person) values (?,?,?)'
            const values = [req.body.ds_address, req.body.st_order, req.body.id_person]

            const conn = await db.connection()

            const result = await conn.query(sqlTbOrder, values)

            const sqlRlOrderProduct = 'insert into rl_order_product(id_order, id_product) values (?,?)'


            req.body.products.forEach(element => {
                const values = [result[0].insertId, element.id_product]
                conn.query(sqlRlOrderProduct, values)
            });

            res.json('Pedido recebido... preparando para despacho')

        } catch (error) {
            console.log(error)
        }
    }

}
module.exports = new OrderController()