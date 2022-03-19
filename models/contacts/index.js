const {addContact} = require('./addContact')
const {getContactById} = require('./getContactById')
const {listContacts} = require('./listContacts')
const {removeContact} = require('./removeContact')
const { updateContact } = require('./updateContact')
const {putContact} = require('./putContact')




module.exports = {
    addContact,
    getContactById,
    listContacts,
    removeContact,
    updateContact,
    putContact
}