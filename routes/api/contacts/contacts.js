const express = require('express')
const { schemaCreateContact, schemaUpdateContact, schemaMongoId, schemaFavorite } = require('../../../models/contacts')
const { validateBody, validateParams } = require('../../../middlewares/validation')
const ctrlTask = require('../../../controllers/contacts/index')
const guard = require('../../../middlewares/guard')
const router = express.Router()

router.get('/', guard, ctrlTask.listContacts)

router.get('/:contactId', guard,  validateParams(schemaMongoId), ctrlTask.getContactById)

router.post('/', guard, validateBody(schemaCreateContact), ctrlTask.addContact)

router.delete('/:contactId', guard, validateParams(schemaMongoId), ctrlTask.removeContact)

router.put('/:contactId', guard,[validateBody(schemaUpdateContact),validateParams(schemaMongoId)],ctrlTask.updateContacts)

router.patch('/:contactId/favorite', guard, validateBody(schemaFavorite), ctrlTask.patchContact)

module.exports = router
