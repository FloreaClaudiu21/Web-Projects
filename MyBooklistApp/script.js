//declare the variables
const table = document.querySelector('.table');
const bookForm = document.querySelector('.book-form');
const bookInputTitle = document.querySelector('.book-inputs');

//Book Class: Represents a Book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
//UI Class: Handle UI Tasks
class UI {
    static displayBooks() {
        const books = Store.getBooks();
        books.forEach( (book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>    
            <td>${book.author}</td>    
            <td>${book.isbn}</td>    
            <td><a href="#" class="btnX delete">X</a></td>    
        `;

        table.appendChild(row);
    }

    static deleteBook(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        bookForm.insertBefore(div, bookInputTitle);

        //Vanish in 2 seconds
        setTimeout( () => {
            document.querySelector('.alert').remove();
        }, 2000);
    }

    static clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';  
    }
}

//Store Class: Handles Storage
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach( (book, index) => {
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Event: Add a Book
bookForm.addEventListener('submit', (e) => {
    //Prevent actual submit
    e.preventDefault();

    //Get form values from inputs
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    //Validate
    if(title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill in all fields', 'danger');
    }
    else {
        //Instatiate book
        const book = new Book(title, author, isbn);
        // console.log(book);

        //Add Book to UI
        UI.addBookToList(book);

        //Add book to store
        Store.addBook(book);

        //Show succes message
        UI.showAlert('Book added', 'success');

        //Clear fields
        UI.clearFields();
    }
});

//Event: Remove a Book
table.addEventListener('click', (e) => {
    //Remove book from UI
    UI.deleteBook(e.target);

    //Remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    //Show succes message
    UI.showAlert('Book removed', 'success');
});
