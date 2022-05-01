const cloudinary = require('cloudinary').v2
const { promisify } = require('util')
const { unlink } = require('fs/promises')
const {updateAvatar} = require('../../repository/users')
const {FolderCloud} = require('../../libs/constants')

cloudinary.config({ 
  cloud_name: 'eknis', 
  api_key: '759588484864569', 
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true
})

class CloudStorage {
    constructor(file, user) {
        this.file = file
        this.user = user
        this.uploadToCloud = promisify(cloudinary.uploader.upload)
    }

    async save() {
        const { path } = this.file
        const { id } = this.user
        const response = await this.uploadToCloud(this.file.path, {
            public_id: this.user.cloudId,
            folder: FolderCloud,
        })
        const { public_id: cloudId, secure_url: urlOfAvatar } = response
        console.log(cloudId)
        await unlink(path)
        await updateAvatar(
            this.user.id,
            urlOfAvatar,
            cloudId.replace(`${FolderCloud}/`, '')
        )
        try {
           await unlink(this.file.path) 
        } catch (error) {
            console.error(error)
        }
        
        return urlOfAvatar
    }
}

module.exports = CloudStorage