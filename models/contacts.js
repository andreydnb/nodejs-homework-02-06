const {ObjectId} = require('mongodb')
const DB = require('./db')

const getColection = async (db, nameColection) => {
  const client = await db
  const collection = await client.db().collection(nameColection)
  return collection
} 

const listContacts = async () => {
  const collection = await getColection(DB, 'contacts')
  const result = await collection.find({}).toArray()
  console.log(result)
  return await result
 }

const getContactById = async (contactId) => {
  const collection = await client.db().collection(nameColection)
  const objId = new ObjectId(contactId)
  const result = await collection.find({_id: objId}).toArray()
  return await result
}

const removeContact = async (contactId) => {
  const collection = await client.db().collection(nameColection)
  const index = contacts.findIndex((contact) => contact.id === contactId)
  if (index !== -1) {
    const [contact] = contacts.splice(index, 1)
    await db.write(contacts)
    return contact
  }
  return null
}

const addContact = async (body) => {
  const collection = await getColection(DB, 'contacts')
  const newContact = {
    ...body
  }
  const result = await collection.insertOne(newContact)
  return result

}

const updateContact = async (contactId, body) => {
  const collection = await client.db().collection(nameColection)
  const index = contacts.findIndex((contact) => contact.id === contactId)
  if (index !== -1) {
    contacts[index] = {...contacts[index], ...body}
    await db.write(contacts)
    return contacts[index]
  }
  return null
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}