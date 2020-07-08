import React from 'react'
import {
    BrowserRouter as Router
} from "react-router-dom";
import { Book } from '../Book';

export const SearchPage = (props) => {
    return <Router>
        <div className="search-books">
            <div className="search-books-bar">
                <div className="search-books-input-wrapper">
                    <input autoFocus onChange={props.handleSearchInputChange} type="text" placeholder="Search by title or author" />
                </div>
            </div>
            <div className="search-books-results">
                <div>{props.data.searchError}</div>
                <ol className="books-grid">
                    {props.data.books.map(book => <li key={book.id}>
                        <Book book={book} handleCategoryChange={props.handleCategoryChange}></Book>
                    </li>)}
                </ol>
            </div>
        </div>
    </Router>
}