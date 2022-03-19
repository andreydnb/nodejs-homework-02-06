const {Contact} = require('../contacts')

const listContacts = async () => {
  const result = await Contact.find({})
  return await result
}
 
module.exports = {listContacts}