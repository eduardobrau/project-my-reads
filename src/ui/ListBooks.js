import React from 'react';

class ListBooks extends React.Component{

  render(){

    //console.log(this.props);
    // Feito o destructuring do objeto para simplicidade de manipulação
    const {shelf,updateBookShelf} = this.props;
    //console.log(shelf);
    const booksShelf = shelf.books.filter((book) => 
      book.shelf === shelf.shelf
    );
    //console.log(booksShelf);
    return(
      <div className="list-books-content">
        <div>
        
          <div className="bookshelf">
            <h2 className="bookshelf-title">{
              shelf.desc
              }
            </h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {booksShelf.map((book) =>(
                  <li key={book.id}>
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
        
        </div>
      </div>
    )
  }

}

export default ListBooks;
