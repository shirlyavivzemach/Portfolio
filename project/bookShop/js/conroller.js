'use strict'

var selectedBookId;

function onInit() {
    renderBooks()

}

function renderBooks() {
    var books = getBooks()
    console.log(books)
    var strHtmls = books.map(function (book) {
        return `
            <tr>
            <td>${book.id}</td>
            <td>${book.name}</td>
            <td>$${book.price}</td>
            <td>
            <button class="read-btn" onClick="onReadBook(${book.id})">Read</button>
            <button class="update-btn" onClick="onUpdateBook(${book.id})">Update</button>
            <button class="delete-btn" onClick="onDeleteBook(${book.id})">Delete</button>
            <a href="#"  onclick="onReadBook('${book.id}')"></a>
            </td>
            </tr>
        `
    })
    document.querySelector('.books-container').innerHTML = strHtmls.join('')
}

function onAddBook() {
    var newBook = prompt('enter book name')
    var newPrice = prompt('enter price')
    addBook(newBook, newPrice)
    renderBooks()

}

function onDeleteBook(bookId) {
    deleteBook(bookId)
    renderBooks()
}


function onUpdateBook(bookId) {
    var newPrice = +prompt('Price to update?');
    updateBook(bookId, newPrice);
    renderBooks();
}

function onReadBook(bookId) {
    var strHTML = '';
    var book = getBookById(bookId)
    selectedBookId = bookId
    strHTML += `
    <img src="img/${book.name}.jpg" alt="${book.name}"/>

    `
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h5').innerText = book.name
    elModal.querySelector('h6').innerText = book.price
    elModal.querySelector('p').innerText = makeLorem()
    elModal.querySelector('.modal-img').innerHTML = strHTML
    elModal.hidden = false
}

function onCloseModal() {
    document.querySelector('.modal').hidden = true
}

function onClickIncrease() {
    var book = getBookById(selectedBookId)
    book.rate++
    if (book.rate > 10) return 0
    var elRate = document.querySelector('span')
    elRate.innerHTML = book.rate
}
function onClickDecrease() {
    var book = getBookById(selectedBookId)
    book.rate--
    if (book.rate < 0) return 0
    var elRate = document.querySelector('span')
    elRate.innerHTML = book.rate
}

