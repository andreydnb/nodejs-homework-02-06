const {Contact} = require('../contacts')

const addContact = async (body) => {
  const newContact = {
    ...body
  }
  const result = await Contact.create(newContact)
  return result

}

module.exports = {addContact}