import React from 'react'
import { Book } from '../Book';

export const HomePage = (props) => {
    return (<div className="list-books">
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {props.data.currentlyReading.map(book =>
                                <li key={book.id}>
                                    <Book book={book} handleCategoryChange={props.handleCategoryChange}></Book>
                                </li>
                            )}
                        </ol>
                    </div>
                </div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {props.data.wantToRead.map(book =>
                                <li key={book.id}>
                                    <Book book={book} handleCategoryChange={props.handleCategoryChange}></Book>
                                </li>
                            )}
                        </ol>
                    </div>
                </div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {props.data.read.map(book =>
                                <li key={book.id}>
                                    <Book book={book} handleCategoryChange={props.handleCategoryChange}></Book>
                                </li>
                            )}
                        </ol>
                    </div>
                </div>
                {props.data.none.length > 0 && <div className="bookshelf">
                    <h2 className="bookshelf-title">None</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {props.data.none.map(book =>
                                <li key={book.id}>
                                    <Book book={book} handleCategoryChange={props.handleCategoryChange}></Book>
                                </li>
                            )}
                        </ol>
                    </div>
                </div>}
            </div>
        </div>
    </div>)
}