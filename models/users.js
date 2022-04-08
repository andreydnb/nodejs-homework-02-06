const { Schema, model } = require('mongoose')
const { Role } = require('../libs/constants')
const bcrypt = require('bcryptjs')


const userScheme = Schema({ 
    name: {
      type: String,
      default: 'Guest',
    },
    email: {
        type: String,
        required: [true, 'Set email for user'],
        unique: true, validate(value) {
            if (!value.includes('@')) {
                throw new Error ('Email must be valid')
            }
        }
    },
    password: {
        type: String,
        required: [true, 'Password required'],
    },
    token: {
        type: String,
        default: '',
    },
    role: {
        type: String,
        enum: {values: Object.values(Role)},
        default: Role.USER
    },
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

module.exports = User