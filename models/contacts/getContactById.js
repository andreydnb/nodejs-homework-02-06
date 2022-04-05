const {Contact} = require('../contacts')

const getContactById = async (contactId) => {
  const result = await Contact.findOne({_id: contactId})
  return result
}

module.exports = {getContactById}