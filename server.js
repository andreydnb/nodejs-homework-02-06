const {mkdir} = require('fs/promises')
const app = require('./app')
const mongoose = require('mongoose')

const uri = process.env.DB_HOST;

mongoose.connect(uri)
  .then(() => app.listen(3000, async () => {
    await mkdir(process.env.UPLOAD_FOLDER, {recursive: true})
    console.log("Database connection successful. Use our API on port: 3000")
  }))
  .catch(error => {
    console.log(error.message)
    process.exit(1)
  })

  process.on('SIGINT', async () => {
    console.log('Disconnect from DB')
    process.exit(1)
})







