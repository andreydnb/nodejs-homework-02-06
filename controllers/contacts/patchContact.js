const contactModel = require('../../repository/contacts/index')
const ContactService = require('../../services/contacts')


const patchContact = async (req, res) => {
  const contact = await contactModel.putContact(req.params.contactId, req.body)
  if (contact) {
    return res.json({ status: 'succsess', code: 200, payload: {contact}})
  }
  return res.status(404).json({ status: 'error', code: 404, message: 'Not found'})
}
  
module.exports = {patchContact}