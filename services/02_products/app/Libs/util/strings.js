
function generateID (key) {
    var dt = new Date().getTime()

    var uuid = `${key}-xxxxxxxxx-4xxx`.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16)
        return (c=='x' ? r :(r&0x3|0x8)).toString(16)
    })

    return uuid
}

function listNullOrEmpty (list) {
    let valid = true

    for (let index = 0; index < list.length; index++) {
        const element = list[index]

        try {
            if (element === undefined) {
                valid = false
                break
            }

            const type = typeof element

            if (type === 'object' && (!element || element.length <= 0)) {
                valid = false
                break
            }

            if (type === 'boolean' && element === 0) {
                valid = false
                break
            }

            if (type === 'number' && (!element || element <= 0)) {
                valid = false
                break
            }

            if (type === 'string' && (!element || !element.length || element === '')) {
                valid = false
                break
            }
        } catch (error) {}
    }
    return valid
}

module.exports = { 
    generateID, 
    listNullOrEmpty, 
}
