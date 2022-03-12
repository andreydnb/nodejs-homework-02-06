const express = require('express')
const { schemaCreateContact, schemaUpdateContact, schemaMongoId, schemaFavorite } = require('../../models/contacts')
const { validateBody, validateParams } = require('../../middlewares/validation')
const ctrlTask = require('../../controllers/contacts/index')

const router = express.Router()

router.get('/', ctrlTask.listContacts)

router.get('/:contactId',  validateParams(schemaMongoId), ctrlTask.getContactById)

router.post('/', validateBody(schemaCreateContact), ctrlTask.addContact)

router.delete('/:contactId', validateParams(schemaMongoId), ctrlTask.removeContact)

router.put('/:contactId',[validateBody(schemaUpdateContact),validateParams(schemaMongoId)],ctrlTask.updateContacts)

router.patch('/:contactId/favorite',validateBody(schemaFavorite), ctrlTask.patchContact)

module.exports = router
