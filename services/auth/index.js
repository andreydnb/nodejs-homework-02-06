const jwt = require('jsonwebtoken')
const Users = require('../../repository/users')
const { CustomError } = require('../../middlewares/error-handler')
const {HttpStatusCode} = require('../../libs/constants')
const SECRET_KEY = process.env.JWT_SECRET_KEY

class AuthService {
    async create(body) {
        const user = await Users.findByEmail(body.email)
        if (user) {
            throw new CustomError(HttpStatusCode.CONFLICT, 'User alredy exist')
        }
        const newUser = await Users.create(body)
        return {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
        }
     }
    async login({email, password}) { }
    async logout(id) {}
 }

module.exports = new AuthService()