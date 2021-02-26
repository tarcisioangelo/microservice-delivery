'use strict'

const Model = use('Model')

class User extends Model {
    
    static boot () {
        super.boot()
        this.addTrait('NoTimestamp')
    }

    static get table() {
        return 'tb_user'
    }


    static get primaryKey() {
        return 'id_user'
    }
}

module.exports = User
