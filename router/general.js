const express = require('express');
let books = require("./booksdb.js");
const public_users = express.Router();

// Get the book list available in the shop (Task 1)
public_users.get('/', function (req, res) {
  res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN (Task 2)
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn]);
});

// Get book details based on author (Task 3)
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  let filtered_books = [];
  
  for (let key in books) {
    if (books[key].author === author) {
      filtered_books.push(books[key]);
    }
  }
  
  res.send(JSON.stringify(filtered_books, null, 4));
});

// Get all books based on title (Task 4)
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  let filtered_books = [];
  
  for (let key in books) {
    if (books[key].title === title) {
      filtered_books.push(books[key]);
    }
  }
  
  res.send(JSON.stringify(filtered_books, null, 4));
});

// Get book review (Task 5)
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews);
});

module.exports.general = public_users;
