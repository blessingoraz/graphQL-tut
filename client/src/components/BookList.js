import React, { Component } from 'react'
import { graphql } from 'react-apollo' //bind query to the component
import { getBooksQuery } from '../queries/queries'

class BookList extends Component {

  displayBooks() {
    const { data } = this.props
    if (data.loading) {
      return (<div>loading books ...</div>)
    } else {
      return data.books.map((book) => {
        return <li key={book.id}>{book.name}</li>
      })
    }

  }

  render() {
    return (
      <div id="main">
        <ul id="book-list">
            {this.displayBooks()}
        </ul>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList)
