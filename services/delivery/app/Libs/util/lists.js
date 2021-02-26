
async function asyncForEach (array, cb) {
    for (let idx = 0; idx < array.length; idx += 1) {
        await cb(array[idx], idx, array)
    }
}

module.exports = { asyncForEach }
