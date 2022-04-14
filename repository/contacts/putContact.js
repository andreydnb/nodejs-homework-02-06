const {Contact} = require('../../models/contacts')
const putContact = async (contactId, body, user) => {
  const result = await Contact.findOneAndUpdate(
    {_id: contactId, owner: user.id},
    body,
    {new: true}
  )
  return result
}

module.exports = {putContact}