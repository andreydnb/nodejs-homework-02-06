const contactModel = require('../../models/contacts/index')

const cntrGetContactById = async (req, res, next) => {
  const contact = await contactModel.getContactById(req.params.contactId)
  if (contact) {
    return res.json({ status: 'succsess', code: 200, payload: {contact}})
  }
  return res.status(404).json({ status: 'error', code: 404, message: 'Not found'})
}

module.exports = {cntrGetContactById}