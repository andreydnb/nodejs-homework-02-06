const contactModel = require('../../models/contacts/index')

const cntrRemoveContact = async (req, res, next) => {
  try {
    const contact = await contactModel.removeContact(req.params.contactId)
  if (contact) {
    return res.json({ status: 'succsess', code: 200, payload: {contact}})
  }
  return res.status(404).json({ status: 'error', code: 404, message: 'Not found'})
  } catch (error) {
    next(error)
  }
  
}

module.exports = {cntrRemoveContact}