const path = require('path')
const fs = require('fs/promises')
const Users = require('../../repository/users')

class LocalStorage {
    constructor(file, user) {
        this.file = file
        this.user = user
        this.static = process.env.STATIC_FOLDER
    }

    async save() {
        const { path: pathFile } = this.file
        const { id } = this.user
        const urlOfAvatar = `/avatars/${id}`
        const pathOfAvatar = path.join(
            __dirname,
            '..',
            '..',
            '..',
            'public',
            urlOfAvatar,
        )
        await fs.mkdir(pathOfAvatar, { recursive: true })
        await fs.rename(pathFile, path.join(pathOfAvatar, 'avatar.jpg'))
        return urlOfAvatar

    }
}

module.exports = LocalStorage