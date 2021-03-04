module.exports = async (req, res, next) => {
    try {
        if (Object.keys(req.body).length) {
            req.body = Object.assign(
                ...Object.keys(req.body).map(key => ({
                    [key]: req.body[key] !== '' ? req.body[key] : null
                }))
            )
        }
        return next()
    } catch (error) {
        return next()
    }
}

