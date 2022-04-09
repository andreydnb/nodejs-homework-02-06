const express = require('express')
const { schemaCreateContact, schemaUpdateContact, schemaMongoId, schemaFavorite } = require('../../../models/contacts')
const { validateBody, validateParams } = require('../../../middlewares/validation')
const ctrlTask = require('../../../controllers/contacts/index')
const guard = require('../../../middlewares/guard')
const {wrapper: wrapperError} = require('../../../middlewares/error-handler')
const router = express.Router()

router.get('/', guard, ctrlTask.listContacts)

router.get('/:contactId', guard,  validateParams(schemaMongoId), wrapperError(ctrlTask.getContactById))

router.post('/', guard, validateBody(schemaCreateContact), wrapperError(ctrlTask.addContact) )

router.delete('/:contactId', guard, validateParams(schemaMongoId), wrapperError(ctrlTask.removeContact) )

router.put('/:contactId', guard,[validateBody(schemaUpdateContact),validateParams(schemaMongoId)], wrapperError(ctrlTask.updateContacts) )

router.patch('/:contactId/favorite', guard, validateBody(schemaFavorite), wrapperError(ctrlTask.patchContact) )

module.exports = router
