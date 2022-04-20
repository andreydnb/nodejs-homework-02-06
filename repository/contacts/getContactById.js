const {Contact} = require('../../models/contacts')
const getContactById = async (contactId, user) => {
  const result = await Contact.findOne({ _id: contactId, owner: user.id })
    .populate({
      path: 'owner',
      select: 'name email role'
    })
  return result
}

module.exports = {getContactById}