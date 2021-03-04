'use strict'

const Logger = use('@deliveryLibs/log')

const db = use('App/Models/User')

class ServiceUser {

    async find(id) {
        try {
            return await db.query()
                .select('id_user as id')
                .where('id_user', parseInt(id))
                .first()

        } catch (error) {
            Logger.errorDB('ServiceUser', 'find', error.sqlMessage || error.message, error.sql || 'NoSQL')
            throw new Error('Ops, houve um erro, tente mais tarde.')
        }
    }

    async save(data) {
        try {
            const { id, type, name, nickname, estate, city, email, slug, is_active } = data

            const find = await db.query()
                .select('id_user as id')
                .where('id_user', parseInt(id))
                .first()

            if(find) {
                await db.query()
                    .where('id_user', id)
                    .update({ 
                        type        : String(type),
                        name        : String(name), 
                        nickname    : String(nickname), 
                        estate      : String(estate), 
                        city        : String(city), 
                        email       : String(email), 
                        slug        : String(slug), 
                        is_active   : is_active 
                    })
            } else {
                await db.query()
                    .insert({ 
                        id_user     : parseInt(id), 
                        type        : String(type), 
                        name        : String(name), 
                        nickname    : String(nickname), 
                        estate      : String(estate), 
                        city        : String(city), 
                        email       : String(email), 
                        slug        : String(slug), 
                        is_active   : is_active
                    })
            }
            return find

        } catch (error) {
            Logger.errorDB('ServiceUser', 'save', error.sqlMessage || error.message, error.sql || 'NoSQL')
            throw new Error('Ops, houve um erro, tente mais tarde.')
        }
    }

}

module.exports = new ServiceUser()
