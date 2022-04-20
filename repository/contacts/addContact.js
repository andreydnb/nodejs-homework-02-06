const {Contact} = require('../../models/contacts')

const addContact = async (body,user) => {
  const newContact = {
    ...body
  }
  const result = await Contact.create({...newContact, owner: user.id})
  return result

}

module.exports = {addContact}