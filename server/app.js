const express  = require('express')
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')
const schema = require('./schema/schema')
const app = express()

const db = require('./config/db');
const PORT = 4500

mongoose.connect(db.url)
mongoose.connection.once('open', () => {
    console.log('connected to database')
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
})) // middleware for graphql to interact with rest endpoint

app.listen(PORT, () => {
    console.log(`Listening to request on port ${PORT}`)
})