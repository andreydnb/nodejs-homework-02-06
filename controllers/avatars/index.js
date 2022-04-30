const {HttpStatusCode} = require('../../libs/constants')
const AvatarService = require('../../services/avatar/service')
const LocalStorage = require('../../services/avatar/local-storage')
const CloudStorage = require('../../services/avatar/cloud-storage')

const avatar = async (req, res, next) => {
    const avatarService = new AvatarService(LocalStorage, req.file, req.user)
    const urlOfAvatar = await avatarService.update()
    res.json({
        status: 'success',
        code: HttpStatusCode.OK,
        data: {avatar: urlOfAvatar},
        message: 'Avatar updated!',
    })
}

module.exports = {avatar}