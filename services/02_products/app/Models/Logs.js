'use strict'

const Model = use('Model')

class Logs extends Model {
    
    static boot () {
        super.boot()
        this.addTrait('NoTimestamp')
    }

    static get table() {
        return 'tb_logs'
    }

    static get primaryKey() {
        return 'id_log'
    }
}

module.exports = Logs
