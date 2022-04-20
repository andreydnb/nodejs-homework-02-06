const Contacts = require('../../repository/contacts')
const contactModel = require('../../repository/contacts/index')
const { CustomError } = require('../../middlewares/error-handler')
const {HttpStatusCode} = require('../../libs/constants')
const SECRET_KEY = process.env.JWT_SECRET_KEY

class ContactService {
    async getAll(query, user) {
        const { limit = 5, skip = 0, sortBy, sortByDesc, filter } = query
        let sortCriteria = null
        let select = null
        if (sortBy) {
            sortCriteria = { [sortBy]: 1 }
        }
        if (sortByDesc) {
            sortCriteria = { [sortByDesc]: -1 }
        }
        if (filter) {
            select = filter.split('|').join('.')
        }
        const result = await contactModel.listContacts({ limit, skip, sortCriteria, select }, user)
        return result
    }
    async getById( id, user ) {
        const contact = await contactModel.getContactById(id, user)
        if (!contact) {
            throw new CustomError(HttpStatusCode.NOT_FOUND, 'Not found')
        }
        return contact
    }
    async create(body, user) {
        const contact = await contactModel.addContact(body, user)
        return contact
     }
    
    async update(id, body, user) {
        const contact = await contactModel.updateContact(id, body, user)
        if (!contact) {
            throw new CustomError(HttpStatusCode.NOT_FOUND, 'Not found')
        }
        return contact   
    }
    async remove(id, user) {
        const contact = await contactModel.removeContact(id, user)
        if (!contact) {
            throw new CustomError(HttpStatusCode.NOT_FOUND, 'Not found')
        }
        return contact
        
    }
    
 }

module.exports = new ContactService()