const {Contact} = require('../contacts')

const updateContact = async (contactId, body) => {
  const result = await Contact.findOneAndUpdate(
    {_id: contactId},
    body,
    {new: true}
  )
  return result
}

module.exports = {updateContact}