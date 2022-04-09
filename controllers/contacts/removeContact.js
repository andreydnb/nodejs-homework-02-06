const ContactService = require('../../services/contacts')
const {HttpStatusCode} = require('../../libs/constants')

const removeContact = async (req, res) => {
    const contact = await ContactService.remove(req.params.contactId, req.user)
    return res.json({ status: 'succsess', code: HttpStatusCode.OK, payload: {contact}})
}

module.exports = {removeContact}