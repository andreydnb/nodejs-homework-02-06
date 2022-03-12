const app = require('./app')
const mongoose = require('mongoose')

require('dotenv').config()
const uri = process.env.DB_HOST;

mongoose.connect(uri)
  .then(() => app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000")
  }))
  .catch(error => {
    console.log(error.message)
    process.exit(1)
  })

  process.on('SIGINT', async () => {
    console.log('Disconnect from DB')
    process.exit(1)
})







