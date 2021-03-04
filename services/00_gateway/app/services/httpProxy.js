const httpProxy = require('express-http-proxy')

module.exports = (host, options = {}) => {
    return httpProxy(host, options) 
} 