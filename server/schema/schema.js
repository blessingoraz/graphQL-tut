const graphql = require('graphql')
const _ = require('lodash')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql

//dummy data for books
let books = [
    { name: 'Miss me', genre: 'sci/Fi', id: '1', authorId: '1' },
    { name: 'Hello madam', genre: 'fantasy', id: '2', authorId: '2' },
    { name: 'Desmond baby', genre: 'sci/Fi', id: '3', authorId: '3' },
    { name: 'Geez', genre: 'sci/Fi', id: '1', authorId: '2' },
    { name: 'Foood food', genre: 'history', id: '2', authorId: '3' },
    { name: 'Mememe', genre: 'sci/Fi', id: '3', authorId: '3' }
]

//dummy data for author
let authors = [
    { name: 'Chibz D', age: 20, id: '1' },
    { name: 'Maylem madam', age: 40, id: '2' },
    { name: 'Desmond baby', age: 15, id: '3' }
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                console.log(parent)
                return _.find(authors, { id: parent.authorId }) 
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: { //graphql list
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, { authorId: parent.id })
            }
        }
    })
})

// how to jump into the graph to get our data
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: { // don't worry about the order so no need for wrapping around function
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // tell graphql how to get the data
                return _.find(books, { id: args.id })
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // tell graphql how to get the data
                return _.find(authors, { id: args.id })
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})