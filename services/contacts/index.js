const Contacts = require('../../repository/contacts')
const contactModel = require('../../repository/contacts/index')
const { CustomError } = require('../../middlewares/error-handler')
const {HttpStatusCode} = require('../../libs/constants')
const SECRET_KEY = process.env.JWT_SECRET_KEY

class ContactService {
    async getAll(query, user) {
        const contacts = await contactModel.listContacts()
        return contacts
     }
    async getById({ id }) {
        const contact = await contactModel.getContactById(id)
        if (!contact) {
            throw new CustomError(HttpStatusCode.NOT_FOUND, 'Not found')
        }
        return contact
    }
    async create(body, user) {
        const contact = await contactModel.addContact(body)
        return contact
     }
    
    async update(id, body, user) {
        const contact = await contactModel.updateContact(id, body)
        if (!contact) {
            throw new CustomError(HttpStatusCode.NOT_FOUND, 'Not found')
        }
        return contact   
    }
    async remove(id, user) {
        const contact = await contactModel.removeContact(id)
        if (!contact) {
            throw new CustomError(HttpStatusCode.NOT_FOUND, 'Not found')
        }
        return contact
        
    }
    
 }

module.exports = new ContactService()