const rateLimit = require('express-rate-limit')
const { HttpStatusCode } = require('../libs/constants')

const limiter = (duration, limit) => {
    return rateLimit({
        windowMs: duration,
        max: limit,
        standartHeaders: true,
        legacyHeaders: false,
        handler: (req, res, next) => {
            res.status(HttpStatusCode.TOO_MANY_REQUEST).json({
                status: 'error',
                code: HttpStatusCode.TOO_MANY_REQUEST,
                message: 'Too many request, please try later',
            })
        },
    })
}

module.exports = limiter