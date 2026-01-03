require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const API_PORT = process.env.API_PORT || 5000
const API_VERSION = '/api/' + (process.env.API_VERSION || 'v1')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(API_VERSION + '/data', require('./routes/data'))

app.listen(API_PORT, () => {
    console.log(`Start Server to Port ${API_PORT}`)
})