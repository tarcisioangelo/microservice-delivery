'use strict'

const locations = [
    {
        id: 'A',
        address: 'Rua 05 Chacara 121 Lote 2',
        points: [
            { lat: -15.836163, lng: -47.951493 },
            { lat: -15.83526046877943, lng: -47.951925622317155 },
            { lat: -15.830695019644079, lng: -47.95116778781967 },
            { lat: -15.825174680885636, lng: -47.950590390044106 },
            { lat: -15.81222386075627, lng: -47.94849732327463 },
            { lat: -15.809810680572745, lng: -47.9497062498139 },
            { lat: -15.807414833003136, lng: -47.96964451591406 },
            { lat: -15.81553976626389, lng: -48.00789711603511 },
            { lat: -15.814897422269773, lng: -48.01201107534039 },
            { lat: -15.788003949887937, lng: -48.01188476963927 },
            { lat: -15.789953748238112, lng: -48.01587339998473 },
        ]
    }
]

class ServiceLocations {

    async getLocation(id) {
        try {
            
            const location = locations.find(l => l.id === id)

            if(!location) {
                throw new Error('Endereço não encontrado!')
            }

            return location

        } catch (error) {
            throw error
        }
    }

}

module.exports = new ServiceLocations()
