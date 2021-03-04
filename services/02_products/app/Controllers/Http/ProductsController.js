"use strict"

class ProductsController {

    async index({ response }) {
        try {
            return response.send({ message: 'Olá' })
        } catch (error) {
            return response.json({ error: { message: error.message } })
        }
    }

}

module.exports = ProductsController
