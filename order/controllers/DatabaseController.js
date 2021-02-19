const mysql = require('mysql2')

class DatabaseController{
    
    async connection(){
     const con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "123456",
            database: "order"
        });
        con.connect(function(err){
            if(err) throw err
            return con
        })
    }

    async close(){
        db.close;
    }

}

module.exports = new DatabaseController()