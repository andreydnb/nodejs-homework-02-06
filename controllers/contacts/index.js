const {cntrAddContact} = require('./addContact')
const {cntrGetContactById} = require('./getContactById')
const {cntrListContacts} = require('./listContacts')
const {cntrRemoveContact} = require('./removeContact')
const { cntrUpdateContacts } = require('./updateContact')
const { cntrPatchContact } = require('./patchContact')

module.exports = {
    cntrAddContact,
    cntrGetContactById,
    cntrListContacts,
    cntrRemoveContact,
    cntrUpdateContacts,
    cntrPatchContact
}