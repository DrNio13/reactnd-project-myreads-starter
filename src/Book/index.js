import React from 'react';

export class Book extends React.Component {
    state = {
        value: this.props.book.shelf
    }

    render() {
        return this.props.book ? <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : ''})` }}></div>
                <div className="book-shelf-changer">
                    <select value={this.state.value} onChange={(event) => {
                        this.setState({
                            value: event.target.value
                        })
                        this.props.handleCategoryChange(event, this.props.book)
                    }}>
                        <option value="move" disabled>Move to...</option>
                        <option disabled={this.props.book.shelf === 'currentlyReading'} value="currentlyReading">Currently Reading</option>
                        <option disabled={this.props.book.shelf === 'wantToRead'} value="wantToRead">Want to Read</option>
                        <option disabled={this.props.book.shelf === 'read'} value="read">Read</option>
                        <option disabled={this.props.book.shelf === 'none'} value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{this.props.book.title}</div>
            <div className="book-authors">{this.props.book.authors && this.props.book.authors.join(', ')}</div>
        </div> : null
    }
}