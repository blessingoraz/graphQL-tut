import React, { Component } from 'react'
import { graphql } from 'react-apollo' //bind query to the component
import { getBookQuery } from '../queries/queries'

class BookDetails extends Component {
    displayBookDetails = () => {
        const { book } = this.props.data
        if (book) {
            console.log(book)
            return (
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p> All books by the author:</p>
                    <ul className="other-books">
                        {book.author.books.map(book => {
                            return (
                                <li key={book.id}>{book.name}</li>
                            )
                        })}
                    </ul>
                </div>
            )
        } else {
            return <div>No book selected </div>
        }
    }

    render() {
        console.log('props hwere', this.props)
        return (
            <div id="book-details">
                <p> Show book details here </p>
                {this.displayBookDetails()}
            </div>
        );
    }
  }
  
  export default graphql(getBookQuery, {
        options: (props) => {
            return {
                variables: {
                    id: props.bookId
                }
          }
      }
  })(BookDetails)
  