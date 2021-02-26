require("dotenv-safe").config()

const express = require('express')

const app = express()

require('./services/ServiceMessages')

app.listen(4001, () => console.log("Server Payment on-line"))