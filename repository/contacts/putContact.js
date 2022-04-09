const {Contact} = require('../../models/contacts')
const putContact = async (contactId, body) => {
  const result = await Contact.findOneAndUpdate(
    {_id: contactId},
    body,
    {new: true}
  )
  return result
}

module.exports = {putContact}