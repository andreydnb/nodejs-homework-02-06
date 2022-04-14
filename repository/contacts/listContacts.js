const {Contact} = require('../../models/contacts')
const listContacts = async ({ limit, skip, sortCriteria, select }, user) => {
  const total = await Contact.countDocuments({owner: user.id})
  const result = await Contact.find({ owner: user.id })
    .select(select)
    .skip(skip)
    .limit(limit)
    .sort(sortCriteria)
  
  return {total, result}
}
 
module.exports = {listContacts}