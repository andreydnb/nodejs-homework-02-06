const {Contact} = require('../../models/contacts')
//const listContacts = async ({ limit, skip, sortCriteria, select }, user) => {
  //const total = await Contact.countDocuments({owner: user.id})
  //const result = await Contact.find({ owner: user.id })
    //.select(select)
    //.skip(skip)
    //.limit(limit)
    //.sort(sortCriteria)
  
  //return {total, result}
//}
 const listContacts = async ({ limit, offset: skip, sort:sortCriteria, select }, user) => {
  const {docs: contacts, ...rest} = await Contact.paginate({owner: user.id}, {limit,skip, sort: sortCriteria, select})
  return {contacts, ...rest}
}
module.exports = {listContacts}