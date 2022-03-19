const { ObjectId } = require('mongodb')
const {Contact} = require('../contacts')

const getContactById = async (contactId) => {
  const objId = new ObjectId(contactId)
  const result = await Contact.find({_id: objId})
  return {...result}
}

module.exports = {getContactById}