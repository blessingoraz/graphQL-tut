import React, { Component } from 'react'
import { graphql } from 'react-apollo' //bind query to the component
import { getBooksQuery } from '../queries/queries'

//components
import BookDetails from './BookDetails'

class BookList extends Component {

  state = {
    selected: null
  }
  getBookId = (id) => {
    this.setState({
      selected: id
    })
  }

  displayBooks() {
    const { data } = this.props
    if (data.loading) {
      return (<div>loading books ...</div>)
    } else {
      return data.books.map((book) => {
        return(
          <li
            key={book.id}
            onClick={() => this.getBookId(book.id)}
          >
            {book.name}
          </li>
        )
      })
    }
  }

  render() {
    const { selected } = this.state
    return (
      <div id="main">
        <ul id="book-list">
            {this.displayBooks()}
        </ul>
        <BookDetails bookId={selected}/>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList)
