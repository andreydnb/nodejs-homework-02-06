const express = require('express')
const { schemaCreateContact, schemaUpdateContact, schemaMongoId, schemaFavorite } = require('../../models/contacts')
const { validateBody, validateParams } = require('../../middlewares/validation')

const router = express.Router()

router.post("/signup")

module.exports = router