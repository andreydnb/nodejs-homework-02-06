const app = require('./app')
const db = require('./models/db')
const mongoose = require('mongoose')
const uri = process.env.DB_HOST;

mongoose.connect(uri)
  .then(() => app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000")
  }))
  .catch(error => {
    console.log(error.message)
    process.exit(1)
  })




