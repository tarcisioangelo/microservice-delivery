const DatabaseController = require('../controllers/DatabaseController')

class OrderController{

    async list(req, res){
        try{

            const con = DatabaseController.connection;

                con.connect(function(err) {
                    if (err) throw err;
                    con.query("select * from tb_order", function(err, result, fields){
                        if(err) throw err;
                        res.json(result)
                    })
                });
        } 
        catch (error){
            console.log(console.log(error))
        }
    }
}
module.exports = new OrderController()