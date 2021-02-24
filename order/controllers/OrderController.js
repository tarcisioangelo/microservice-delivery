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

}
module.exports = new OrderController()