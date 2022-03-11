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
  const collection = await getColection(DB, 'contacts')
  const objId = new ObjectId(contactId)
  const result = await collection.find({_id: objId}).toArray()
  return {...result, createdAt: objId.getTimestamp()}
}

const removeContact = async (contactId) => {
  const collection = await getColection(DB, 'contacts')
  const objId = new ObjectId(contactId)
  const {value: result} = await collection.findOneAndDelete({ _id: objId })
  return result
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
  const collection = await getColection(DB, 'contacts')
  const objId = new ObjectId(contactId)
  const {value: result} = await collection.findOneAndUpdate(
    { _id: objId },
    { $set: body },
    {returnDocument: 'after'}
  )
  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}