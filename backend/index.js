const express = require('express')
require('./database')

const app = express()
const port = 5000

app.use(express.json())
// app.get('/', (req, res) => {
//     res.send('Hello Annie!')
// })

// Available Routes
app.use('/api/auth', require('./Routes/auth'))
app.use('/api/notes', require('./Routes/notes'))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
