const express = require('express');
let books = require("./booksdb.js");
const public_users = express.Router();

// Task 10: Get all books using async callback function
public_users.get('/', function (req, res) {
  const getBooks = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(books);
    }, 1000);
  });

  getBooks.then((bookList) => {
    res.send(JSON.stringify(bookList, null, 4));
  });
});

// Task 11: Search by ISBN using Promises
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  
  const getBookByISBN = new Promise((resolve, reject) => {
    setTimeout(() => {
      const book = books[isbn];
      if (book) {
        resolve(book);
      } else {
        reject("Book not found");
      }
    }, 1000);
  });

  getBookByISBN
    .then((book) => res.send(JSON.stringify(book, null, 4)))
    .catch((error) => res.status(404).json({ message: error }));
});

// Task 11: Search by Author using Promises
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  
  const getBooksByAuthor = new Promise((resolve, reject) => {
    setTimeout(() => {
      let filtered_books = [];
      for (let key in books) {
        if (books[key].author === author) {
          filtered_books.push(books[key]);
        }
      }
      if (filtered_books.length > 0) {
        resolve(filtered_books);
      } else {
        reject("No books found for this author");
      }
    }, 1000);
  });

  getBooksByAuthor
    .then((bookList) => res.send(JSON.stringify(bookList, null, 4)))
    .catch((error) => res.status(404).json({ message: error }));
});

// Task 11: Search by Title using Promises
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  
  const getBooksByTitle = new Promise((resolve, reject) => {
    setTimeout(() => {
      let filtered_books = [];
      for (let key in books) {
        if (books[key].title === title) {
          filtered_books.push(books[key]);
        }
      }
      if (filtered_books.length > 0) {
        resolve(filtered_books);
      } else {
        reject("No books found with this title");
      }
    }, 1000);
  });

  getBooksByTitle
    .then((bookList) => res.send(JSON.stringify(bookList, null, 4)))
    .catch((error) => res.status(404).json({ message: error }));
});

module.exports.general = public_users;
