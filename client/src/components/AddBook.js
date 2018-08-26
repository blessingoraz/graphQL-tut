import React, { Component } from 'react'
import { graphql } from 'react-apollo' //bind query to the component
import { getAuthorsQuery } from '../queries/queries'

class AddBook extends Component {

    displayAuthors() {
        const { data} = this.props
        if(data.loading) {
            return <option disabled>loading authors..</option>
        } else {
            return data.authors.map((author) => {
                return <option key={author.id} value={author.id}>{author.name}</option>
            })
        }
    }

    render() {
      return (
        <form id="add-book" onSubmit={this.handleSubmit}>
            <div className="field">
                <label>Book name:</label>
                <input type="text"/>
            </div>
            <div className="field">
                <label>Genere:</label>
                <input type="text"/>
            </div>
            <div className="field">
                <label>Author:</label>
                <select>
                    <option>Select Author</option>
                    {this.displayAuthors()}
                </select>
            </div>
            <button type="submit"> + </button>
        </form>
      );
    }
  }
  
  export default graphql(getAuthorsQuery)(AddBook)