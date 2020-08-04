'use strict'
const KEY = 'books';
const gNames = ['The Little Prince','Lolita', 'The Da Vinci Code', 'Black Beauty'];

var gBooks;

_createBooks();

function _createBook(name,price,imgUrl) {
    return {
        id: makeId(),
        name: name,
        price:price,
        imgUrl:imgUrl,
        rate: 0
    }
}

function _createBooks() {
    var books = loadFromStorage(KEY)
    if (!books || !books.length) {
        books = []
        var names = gNames;
        for (let i = 0; i < gNames.length; i++) {
            var name= gNames[i]
            books.push(_createBook(name,50))
        }
    }

    gBooks = books;
    _saveBooksToStorage();
return gBooks
}


function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id
    })
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage();

}

function addBook(name,price) {
    var book = _createBook(name,price)
    gBooks.push(book)
    _saveBooksToStorage();
}

function getBookById(bookId) {
    var book = gBooks.find(function (book) {
        return bookId === book.id
    })
    return book
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
}

function getBooks(){

    return gBooks

}


function updateBook(bookId, bookPrice) {
    var bookIdx = gBooks.findIndex(function (book) {
        return book.id === bookId;
    })
    gBooks[bookIdx].price = bookPrice;
    _saveBooksToStorage();
}



