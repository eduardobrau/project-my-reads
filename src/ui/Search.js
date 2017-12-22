import React from 'react';
import {Link} from 'react-router-dom';
import { search } from '../apis/BooksAPI';

class Search extends React.Component{

  state ={
    query: '',
    searches:[]
  }

  searchBooks(query){
    search(query).then((books) => {
      this.searches = this.state.searches;
      this.setState({searches:books})
    })
  }

  updateQuery = (query) => {
    this.setState({ query:query.trim() })
  }
  
  render(){
    //console.log(this.props);
    const {books, updateBookShelf} = this.props;
    const {query} = this.state;
    // Filtra os livros a serem exibidos
    let showingBooks
    // Caso o usuário digite algo será alterado o state do
    // componente e está condição será executada
    if (query.length > 2) {
      this.searchBooks(query)
      showingBooks = this.state.searches.filter((search) => 
        search.title !== books.title
      );
    } else {
      showingBooks = books;
    }

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input 
              type="text" 
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(e) => this.updateQuery(e.target.value)}
            />
            {/* JSON.stringify(this.state) */}
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {showingBooks.map((book,index) =>(
              <li key={index}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: ` url( ${book.imageLinks.thumbnail} ) ` }}></div>
                    <div className="book-shelf-changer">
                      <select value={book.shelf} onChange={(event) => updateBookShelf(event.target, book)}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }

}

export default Search