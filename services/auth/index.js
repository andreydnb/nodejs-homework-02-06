const jwt = require('jsonwebtoken')
const Users = require('../../repository/users')
const { CustomError } = require('../../middlewares/error-handler')
const EmailService = require('../email/service')
const SenderNodemailer = require('../email/senders/nodemailer-senders')
const SenderSendGrid = require('../email/senders/sendgrid-sender')
const {HttpStatusCode} = require('../../libs/constants')
const { token } = require('morgan')
const SECRET_KEY = process.env.JWT_SECRET_KEY

class AuthService {
    async create(body) {
        const user = await Users.findByEmail(body.email)
        if (user) {
            throw new CustomError(HttpStatusCode.CONFLICT, 'User alredy exist')
        }
        const newUser = await Users.create(body)

        const sender = new SenderNodemailer()
        const emailService = new EmailService(sender)
        try {
            await emailService.sendEmail(
                newUser.email,
                newUser.name,
                newUser.verificationToken
            )
        } catch (error) {
            console.log(error)
      
        }
        return {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            subscription: newUser.subscription,
            avatar: newUser.avatar,
        }
     }
    async login({ email, password }) { 
        const user = await this.getUser(email, password)
        const token = this.generateToken(user)
        await Users.updateToken(user.id, token)
        return {token}
    }
    async logout(id) {
        await Users.updateToken(id, null)
     }
    
    async getUser(email, password) {
        const user = await Users.findByEmail(email)
        if (!user) {
            throw new CustomError(
                HttpStatusCode.NOT_FOUND,
                'User not found'
            )
        }
        if (!(await user?.isValidPassword(password))) {
            throw new CustomError(
                HttpStatusCode.UNAUTHORIZED,
                'Invalid credentials'
            )
        }
        if (!user?.verify) {
            throw new CustomError(HttpStatusCode.BAD_REQUEST, 'User not verified')
        }
        return user
    }
    async getCurrentUser(token) {
        const user = await Users.findByToken(token)
        if (!user) {
            return null
        }
        return user
    }
    
    generateToken(user) {
        const payload = { id: user.id }
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' })
       return token 
    }
    async verifyUser(token) {
        const user = await Users.findByToken(verificationToken)
        if (!user) {
            throw new CustomError(HttpStatusCode.BAD_REQUEST, 'Invalid Token!')
        }
        if (user && user.verify) {
            throw new CustomError(HttpStatusCode.BAD_REQUEST, 'User already verified!')
        }
        await Users.verifyUser(user.id)
        return user
     }
    async reverifyEmail(email) {
        const user = await Users.findByEmail(email)
        if (!user) {
            throw new CustomError (HttpStatusCode.NOT_FOUND, 'User with email not found')
        }
        if (user && user.verify) {
            throw new CustomError(
                HttpStatusCode.BAD_REQUEST,
                'User already verified'
            )
        }
        const sender = new SenderNodemailer()
        const emailService = new EmailService(sender)
        try {
            await emailService.sendEmail(
                user.email,
                user.name,
                user.verificationToken
            )
        } catch (error) {
            console.log(error)
            throw new CustomError(
                HttpStatusCode.SERVICE_UNAVAILABLE,
                'Error sending email'
            )
      
        }
     }  
 }

module.exports = new AuthService()