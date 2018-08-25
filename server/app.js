const express  = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const app = express()
const PORT = 4500

app.use('/graphql', graphqlHTTP({
    schema
})) // middleware for graphql to interact with rest endpoint

app.listen(PORT, () => {
    console.log(`Listening to request on port ${PORT}`)
})