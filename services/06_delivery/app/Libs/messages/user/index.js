const { emit } = require("./producer")
const { consumer } = require("./consumer")

module.exports = { emit, consumer }