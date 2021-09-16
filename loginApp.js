const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routes = require('./routes/routes')
const cors = require('cors')
const app = express()

dotenv.config()

mongoose.connect(process.env.databaseAccess, () => console.log("MongoDB connected"),
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
)

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use('/api', routes)
app.listen(3000, () => console.log("loginApp is functional"))