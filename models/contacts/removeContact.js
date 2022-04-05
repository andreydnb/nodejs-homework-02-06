const {Contact} = require('../contacts')

const removeContact = async (contactId) => {
  const result = await Contact.findOneAndRemove({_id: contactId})
  return result
}

module.exports = {removeContact}