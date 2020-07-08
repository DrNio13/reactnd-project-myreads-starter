import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { HomePage } from './HomePage';
import { SearchPage } from './SearchPage';

class BooksApp extends React.Component {
  async componentDidMount() {
    const savedState = localStorage.getItem('state')
    if (savedState) {
      this.setState(JSON.parse(savedState))
      return
    }

    const books = await BooksAPI.getAll()
    const read = books.filter(book => book.shelf === 'read')
    const wantToRead = books.filter(book => book.shelf === "wantToRead")
    const currentlyReading = books.filter(book => book.shelf === 'currentlyReading')
    const none = []
    this.setState({
      read,
      wantToRead,
      currentlyReading,
      none
    })
  }

  state = {
    read: [],
    wantToRead: [],
    currentlyReading: [],
    none: [],
    books: [],
    searchError: ''
  }

  handleSearchInputChange = async (event) => {
    const searchTerm = event.target.value;
    this.setState({
      searchError: ''
    })

    if (!searchTerm) {
      this.setState({
        books: []
      })
      return
    }

    try {
      const result = await BooksAPI.search(searchTerm);
      if (result && result.error) {
        this.setState({
          books: [],
          searchError: result.error
        })
        return
      }

      if (result) {
        this.setState({
          books: result
        })
      }
    } catch (reason) {
      console.error(reason)
    }

  }

  handleCategoryChange = (event, book) => {
    const category = event.target.value;

    this.setState((state) => {
      const bookShelf = state[book.shelf] ? state[book.shelf] : []

      return {
        ...state,
        [book.shelf]: [
          ...bookShelf.filter(b => b.id !== book.id)
        ],
        [category]: [
          ...state[category],
          {
            ...book,
            'shelf': category
          }
        ]
      }
    }, () => {
      localStorage.setItem('state', JSON.stringify({ ...this.state, books: [] }));
    })
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route path="/search">
              <SearchPage data={this.state} handleCategoryChange={this.handleCategoryChange} handleSearchInputChange={this.handleSearchInputChange}></SearchPage>
              <div className="open-search">
                <Link to='/'>Back</Link>
              </div>
            </Route>
            <Route path="/">
              <HomePage data={this.state} handleCategoryChange={this.handleCategoryChange}></HomePage>
              <div className="open-search">
                <Link to="/search">Search</Link>
              </div>
            </Route>
          </Switch>

        </div>
      </Router>
    )
  }
}

export default BooksApp
