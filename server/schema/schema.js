const graphql = require('graphql')
const _ = require('lodash')
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql

//dummy data
let books = [
    { name: 'Miss me', genre: 'sci/Fi', id: '1' },
    { name: 'Hello madam', genre: 'fantasy', id: '2' },
    { name: 'Desmond baby', genre: 'sci/Fi', id: '3' }
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
})
// how to jump into the graph to get our data
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: { // don't worry about the order so no need for wrapping around function
        book: {
            type: BookType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                // tell graphql how to get the data
                return _.find(books, { id: args.id })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})