const { ObjectId } = require('mongodb')
const {Contact} = require('../contacts')

const removeContact = async (contactId) => {
  const objId = new ObjectId(contactId)
  const result = await Contact.findByIdAndRemove(objId)
  return result
}

module.exports = {removeContact}