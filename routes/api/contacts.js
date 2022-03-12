const express = require('express')
const { schemaCreateContact, schemaUpdateContact, schemaMongoId, schemaFavorite } = require('../../models/contacts')
const { validateBody, validateParams } = require('../../middlewares/validation')
const controllers = require('../../controllers/contacts/index')

const router = express.Router()

router.get('/', controllers.cntrListContacts)

router.get('/:contactId',  validateParams(schemaMongoId), controllers.cntrGetContactById)

router.post('/', validateBody(schemaCreateContact), controllers.cntrAddContact)

router.delete('/:contactId', validateParams(schemaMongoId), controllers.cntrRemoveContact)

router.put('/:contactId',[validateBody(schemaUpdateContact),validateParams(schemaMongoId)],controllers.cntrUpdateContacts)

router.patch('/:contactId/favorite',validateBody(schemaFavorite), controllers.cntrPatchContact)

module.exports = router
