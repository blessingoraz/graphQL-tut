import { gql } from 'apollo-boost'

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`
// $name is a query variable which specifies the type of the vrariable
//Adding an exclamation to the variable type means that it is required
const addBookMutation = gql`
  mutation($name:String!, $genre: String!, $authorId: ID!) {
    addBook(name:$name, genre:$genre, authorId:$authorId) {
        name
        id 
    }
  }
`

const getBookQuery = gql`
  query($id: ID) {
    book(id: $id) {
        id
        name
        genre
        author {
            id
            name
            age
            books {
                name
                id
            }
        }
    }
  }
`

export { getBooksQuery, getAuthorsQuery, addBookMutation, getBookQuery }