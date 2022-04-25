const express = require('express')
const { avatar} = require('../../../controllers/avatars')
const {wrapper: wrapperError} = require('../../../middlewares/error-handler')
const guard = require('../../../middlewares/guard')
const upload = require('../../../middlewares/upload')

const router = express.Router()




router.patch('/', guard, upload.single('avatar'), wrapperError(avatar))




module.exports = router