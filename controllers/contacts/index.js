const {addContact} = require('./addContact')
const {getContactById} = require('./getContactById')
const {listContacts} = require('./listContacts')
const {removeContact} = require('./removeContact')
const { updateContacts } = require('./updateContact')
const { patchContact } = require('./patchContact')

module.exports = {
    addContact,
    getContactById,
    listContacts,
    removeContact,
    updateContacts,
    patchContact
}