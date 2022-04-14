const ContactService = require('../../services/contacts')
const listContacts = async (req, res) => {
  const contacts = await ContactService.getAll(req.query, req.user)
  res.json({ status: 'succsess', code: 200, payload: {...contacts}})
}

module.exports = {listContacts}