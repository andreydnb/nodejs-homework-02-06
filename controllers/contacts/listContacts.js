const contactModel = require('../../models/contacts/index')

const cntrListContacts = async (req, res, next) => {
  const contacts = await contactModel.listContacts()
  res.json({ status: 'succsess', code: 200, payload: {contacts}})
}

module.exports = {cntrListContacts}