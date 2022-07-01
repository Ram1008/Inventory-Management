const connectToMongo = require('./db');
const express = require('express')
connectToMongo();

const app = express()
const port = 5000
var cors = require('cors')
app.use(cors())
app.use(express.json())

// Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/categories', require('./routes/categories'))
app.use('/api/products', require('./routes/products'))



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})