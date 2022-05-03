const Mailgen = require('mailgen')

class EmailService {
    constructor(sender) {
        this.sender = sender
        this.link = 'http://localhost:3000/'
        this.mailgen = new Mailgen({
            theme: 'default',
            product: {
                name: 'Contacts API',
                link: this.link,
            },
        })
    }
    createEmailTemplate(username, token) {
        const email = {
    body: {
        name: username,
        intro: 'Welcome to Contacts API! We\'re very excited to have you on board.',
        action: {
            instructions: 'To get started with Mailgen, please click here:',
            button: {
                color: '#22BC66', // Optional action button color
                text: 'Confirm your account',
                link: `${this.link}/api/auth/verify/${token}`
            }
        },
        outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
    },
        }
        return this.mailgen.generate(email)
    }
    async sendEmail(email, username, token) {
        const emailTemplate = this.createEmailTemplate(username, token)
        const message = {
            to: email,
            subject: 'Welcome to Contacts API',
            html: emailTemplate, 
        }
        try {
            const result = await this.sender.send(message)
            console.log(result)
        } catch (error) {
            console.log(error)
            return false
            
        }
    }
}

module.exports = EmailService