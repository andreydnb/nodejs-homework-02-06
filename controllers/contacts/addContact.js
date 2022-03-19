const contactModel = require('../../models/contacts/index')

const addContact = async (req, res, next) => {
  const contact = await contactModel.addContact(req.body)
  res.status(201).json({ status: 'succsess', code: 201, payload: {contact}})
}

module.exports = {addContact}