const { token } = require('morgan')
const {User} = require('../models/users')

const findById = async (id) => {
    return await User.findById(id)
}

const findByEmail = async (email) => {
    return await User.findOne({email})
}

const findByToken = async (verificationToken) => {
    return await User.findOne({verificationToken})
}

const create = async (body) => {
    const user = await User(body)
    return await user.save()
}

const updateToken = async (id, token) => {
    return await User.findByIdAndUpdate(id, {token})
}

const updateAvatar = async (id, avatar, cloudId=null) => {
    return await User.findByIdAndUpdate(id, {avatar, cloudId})
}

const verifyUser = async (id) => {
    return await User.findByIdAndUpdate(id, {verify: true})

}

module.exports = {
    findById,
    findByEmail,
    create,
    updateToken,
    updateAvatar,
    findByToken,
    verifyUser
}    