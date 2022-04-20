const express = require('express')
const { registration, login, logout} = require('../../../controllers/auth')
const { schemaCreateUser } = require('../../../models/users') 
const  {validateParams}  = require('../../../middlewares/validation')
const {wrapper: wrapperError} = require('../../../middlewares/error-handler')
const guard = require('../../../middlewares/guard')
const router = express.Router()
const limiter = require('../../../middlewares/rate-limiter')



router.post('/signup',limiter(15*60*1000,2), wrapperError(registration)),
router.post('/login', wrapperError(login))
router.post('/logout', guard, wrapperError(logout))




module.exports = router
