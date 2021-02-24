const db = require('../database')

class ServiceOrder {

    async save(data) {
        try {


            const sqlTbOrder = 'insert into tb_order(ds_address, st_order, id_person) values (?,?,?)'
            const values = [data.ds_address, data.st_order, data.id_person]

            const conn = await db.connection()

            const result = await conn.query(sqlTbOrder, values)

            const sqlRlOrderProduct = 'insert into rl_order_product(id_order, id_product) values (?,?)'

            data.products.forEach(element => {
                const values = [result[0].insertId, element.id_product]
                conn.query(sqlRlOrderProduct, values)
            });

            return result[0].insertId

        } catch (error) {
            console.error('ServiceOrder.save', error.message)
            throw error
        }
    }

    async updateStatus(id, st_order) {
        try {
            const sqlTbOrder = 'update tb_order set st_order = ? where id_order = ?'

            const values = [st_order, id]

            const conn = await db.connection()

            const result = await conn.query(sqlTbOrder, values)

            return result[0].insertId

        } catch (error) {
            console.error('ServiceOrder.save', error.message)
            throw error
        }
    }


}
module.exports = new ServiceOrder()