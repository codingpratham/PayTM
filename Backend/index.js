const express = require('express')
const { router } = require('./routes/index')
const cors = require('cors')
const bodyparser=require('body-parser')
const jwt=require('jsonwebtoken')

const app = express()
app.use(express.json())
app.use('/api/v1',router)
app.use(cors())
app.use(bodyparser.json())


app.listen(3000)