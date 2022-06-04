const express = require('express')
var cors = require('cors')

require('dotenv').config()
require('./database')

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', require('./Routes/auth'))
app.use('/api/notes', require('./Routes/notes'))

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
