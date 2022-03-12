const {Contact} = require('../contacts')

const listContacts = async () => {
  const result = await Contact.find({})
  console.log(result)
  return await result
}
 
module.exports = {listContacts}