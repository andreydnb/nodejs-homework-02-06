const bcrypt = require('bcryptjs')
const Joi = require('joi');
const gravatar = require('gravatar')
const {randomUUID} = require('crypto')
const { Schema, model } = require('mongoose')
const { Role } = require('../libs/constants')
const { joiPassword } = require('joi-password')
Joi.objectId = require('joi-objectid')(Joi)


const userScheme = Schema({ 
    
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true, validate(value) {
            if (!value.includes('@')) {
                throw new Error ('Email must be valid')
            }
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    token: {
        type: String,
        default: null,
    },
    subscription: {
        type: String,
        enum: {values: Object.values(Role)},
        default: Role.USER
    },
    avatar: {
        type: String,
        default: function () {
            return gravatar.url(this.email, {s: '250'}, true)
        }
    },
     cloudId: {
        type: String,
        default: null
    },
     verify: {
        type: Boolean,
        default: false
    },
     verificationToken: {
        type: String,
         default: randomUUID(),
        required: [true, 'Verify token is required']
    }

}, {
    versionKey: false,
    timestamps: true,
    toJSON: {virtuals:true},
    toObject: {virtuals: true},
})


userScheme.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(6)
        this.password = await bcrypt.hash(this.password, salt)
    }
    next()
})

userScheme.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const User = model("user", userScheme)

const schemaCreateUser = Joi.object({
    
    password: joiPassword
                        .string()
                        .minOfSpecialCharacters(2)
                        .minOfLowercase(2)
                        .minOfUppercase(2)
                        .minOfNumeric(2)
                        .noWhiteSpaces()
                        .required(),


    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } })
        .messages({
            'any.required': 'Поле Email обязательное',
            'string.empty': 'Поле Email не может быть пустым'
        })
        .required()
})





module.exports =  {User, schemaCreateUser }