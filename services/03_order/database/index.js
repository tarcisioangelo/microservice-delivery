const mysql = require('mysql2/promise')

class DatabaseController {

    async connection() {
        return new Promise((resolve, reject) => {
            try {
                const conn = new mysql.createConnection({
                    host: "localhost",
                    user: "root",
                    password: "123456",
                    database: "order"
                });

                resolve(conn)

            } catch (error) {
                reject(error)
            }
        })
    }

    async close() {
        mysql.close;
    }

}

module.exports = new DatabaseController()