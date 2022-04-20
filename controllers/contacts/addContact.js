const ContactService = require('../../services/contacts')
const {HttpStatusCode} = require('../../libs/constants')

const addContact = async (req, res) => {
  const contact = await ContactService.create(req.body, req.user)
  res.status(HttpStatusCode.CREATED).json({ status: 'succsess', code: HttpStatusCode.CREATED, payload: {contact}})
}

module.exports = {addContact}