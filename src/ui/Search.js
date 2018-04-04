import React from 'react';
import {Link} from 'react-router-dom';
import { search } from '../apis/BooksAPI';
import { DebounceInput } from 'react-debounce-input';

class Search extends React.Component{

  state ={
    searches:[],
    textError: false,
  }

  searchBooks = (query) => {
    if(query.length >= 1){
      search(query).then((searchBooks) => {
        if(searchBooks.error){ 
          this.setState({
            textError:'Nada encontrado!',
            searches:[],
          })
        }else{
          const booksWithShelf = searchBooks.map((s) =>{
            const found = this.props.books.find( (b) => 
              b.id === s.id
            );
            s.shelf = found ? found.shelf : 'none';
            return s;
          });
          this.setState({
            searches:booksWithShelf,
            textError:false
          });      
        }
      }).catch(e => this.setState({
        textError:`Error: ${e}`,
        searches: [],
      })); 
    }else{
      this.setState({searches:[]})
    }
  }
  
  render(){
    const {books, updateBookShelf} = this.props;
    const {searches} = this.state;
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
            <DebounceInput
              placeholder="Search by title or author"
              debounceTimeout={200}
              onChange={(e) => this.searchBooks(e.target.value)}
            />
            {/* JSON.stringify(this.state) */}
          </div>
        </div>
        <div className="search-books-results">
          
          <h2 id="errorSearch">{this.state.textError}</h2>
          
          <ol className="books-grid">
            {searches.map((book,index) =>( 
              <li key={index}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: ` url( ${book.imageLinks && book.imageLinks.thumbnail})`}}></div>
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
              )
            )}
          </ol>
        </div>
      </div>
    )
  }

}

export default Search