'use strict'

const Model = use('Model')

/**
 * id_service
 * name
 * description
 * is_message
 * is_active
 */

class Services extends Model {
    
    static boot () {
        super.boot()
        this.addTrait('NoTimestamp')
    }

    static get table() {
        return 'tb_services'
    }

    static get primaryKey() {
        return 'id_service'
    }
}

module.exports = Services
