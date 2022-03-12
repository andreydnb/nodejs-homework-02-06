const { ObjectId } = require('mongodb')
const {Contact} = require('../contacts')

const putContact = async (contactId, body) => {
  const objId = new ObjectId(contactId)
  const result = await Contact.findByIdAndUpdate(
    objId,
    body,
    {new: true}
  )
  return result
}

module.exports = {putContact}