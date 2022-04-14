const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet');
const rateLimit = require('express-rate-limit')
const contactsRouter = require('./routes/api/contacts/contacts')
const authRouter = require('./routes/api/auth/index')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter)
app.use(helmet());
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json({limit: 10000}))

app.use('/api/auth', authRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
