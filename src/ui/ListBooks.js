import React from 'react';

class ListBooks extends React.Component{

  render(){

    //console.log(this.props);
    // Feito o destructuring do objeto para simplicidade de manipulação
    const {shelf, books} = this.props;
    //console.log(books);
    const booksShelf = books.filter((book) => (
      book.category === shelf
    ));
    console.log (booksShelf);
    return(
      <div className="list-books-content">
        <div>
        
          <div className="bookshelf">
            <h2 className="bookshelf-title">{
              shelf
              }
            </h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {booksShelf.map((book, index) =>(
                  <li key={index}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: ` url( ${book.image} ) ` }}></div>
                        <div className="book-shelf-changer">
                          <select>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.author}e</div>
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
