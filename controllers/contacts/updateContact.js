const ContactService = require('../../services/contacts')
const {HttpStatusCode} = require('../../libs/constants')

const updateContacts = async (req, res) => {
  const contact = await ContactService.update(req.params.contactId, req.body, req.user)
    return res.json({ status: 'succsess', code: HttpStatusCode.OK, payload: {contact}})
}

module.exports = {updateContacts}