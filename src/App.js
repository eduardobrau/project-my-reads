import React from 'react';
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import * as BooksAPI from './apis/BooksAPI';
import Header from './ui/Header';
import ListBooks from './ui/ListBooks';
import Search from './ui/Search';
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    //showSearchPage: false,

    books:[]
    
  }

  updateSearchPage = () => {
    const condition = this.state.showSearchPage;
    this.setState(
      {showSearchPage:(condition) ? false : true}
    );
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      console.log(books);
      this.setState({books});
    })
  }

  /* Atualiza o estado da propriedade books inicializada
  junto ao componente de classe, para isso passo como
  parametro o estado atual do componente */
  updateBookShelf = (target, book) => {
    console.log(book);
    // Feito destructuring
    let {books} = this.state;
  /* Filtra todos os livros setado no estado deste componente
  que seja diferente do livro selecionado pelo usuário,
  atualizando somente a propriedade shelf do book para o novo 
  valor selecionado pelo usuário, concatenando esse objeto
  atualizado com o retorno do filtro usado em books. */
    books = books.filter(
      b => b.id !== book.id
    ).concat({
      ...book,
      shelf: target.value
    });
  // Seta o novo estado books
    this.setState({books});
  /* Atualiza a prateleira do livro no DB via API, com isso ao 
  renderizar a página novamente os dados permanecerão fixo */ 
    BooksAPI.update(book, target.value);
  }

  render() {

    const {books} = this.state;

    const booksShelf = [
      { desc: 'Currently Reading', shelf: 'currentlyReading', books:books },
      { desc: 'Want To Read', shelf: 'wantToRead', books:books},
      { desc: 'Read', shelf: 'read', books:books}  
    ]

    return (
      <div className="app">
        <Route path="/search" render={() =>(
          <Search updateSearchPage={
            () => this.updateSearchPage()
            } 
          />
        )}/>
        <Route path="/" render={() =>(
          <div className="list-books">
            <Header title="MyReads"/>
            {
              booksShelf.map( (bookShelf,index) => (
                <ListBooks 
                  key={index}
                  shelf={bookShelf}
                  updateBookShelf={
                    (target, book) => this.updateBookShelf(target,book)
                  }
                />
              ))
            }
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
