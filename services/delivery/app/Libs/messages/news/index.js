const { emitExtract, emitNews } = require("./producer")
const { consumerExtract, consumerNews } = require("./consumer")

module.exports = { emitExtract, emitNews, consumerExtract, consumerNews }