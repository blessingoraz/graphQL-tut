import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo' //bind query to the component
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'

class AddBook extends Component {

    state = {
        name: '',
        genre: '',
        authorId: ''
    }
    
    displayAuthors() {
        const { getAuthorsQuery} = this.props
        if(getAuthorsQuery.loading) {
            return <option disabled>loading authors..</option>
        } else {
            return getAuthorsQuery.authors.map((author) => {
                return <option key={author.id} value={author.id}>{author.name}</option>
            })
        }
    }

    submitForm = (e) => {
        e.preventDefault()
        const { name, genre, authorId } = this.state
        this.props.addBookMutation({
            variables: {
                name,
                genre,
                authorId
            },
            refetchQueries: [{ query: getBooksQuery }] //refreshes the book list
        })
    }
    handleChange = (e) => {
        const { value, name } = e.target

        this.setState({
            [name]: value
        })
    }

    render() {
        const { name, genre, authorId } = this.state
        return (
            <form id="add-book" onSubmit={this.submitForm}>
                <div className="field">
                    <label>Book name:</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="field">
                    <label>Genere:</label>
                    <input
                        type="text"
                        name="genre"
                        value={genre}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select
                        name="authorId"
                        value={authorId}
                        onChange={this.handleChange}
                    >
                        <option>Select Author</option>
                        {this.displayAuthors()}
                    </select>
                </div>
                <button type="submit"> + </button>
            </form>
      );
    }
  }
  
  export default compose(
        graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
        graphql(addBookMutation, { name: "addBookMutation" })
  )(AddBook)