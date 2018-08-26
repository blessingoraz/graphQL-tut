import React, { Component } from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

//Components
import BookList from './components/BookList'
import AddBook from './components/AddBook'

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4500/graphql"
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Reading list</h1>
          <BookList/>
          <AddBook/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
