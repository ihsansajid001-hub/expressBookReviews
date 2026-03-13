const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
const public_users = express.Router();

const BASE_URL = 'http://localhost:5000';

// Task 10: Get all books using async callback function with Axios
public_users.get('/async', async function (req, res) {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    res.send(JSON.stringify(response.data, null, 4));
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error: error.message });
  }
});

// Task 11: Search by ISBN using Promises with Axios
public_users.get('/async/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  
  axios.get(`${BASE_URL}/isbn/${isbn}`)
    .then((response) => {
      res.send(JSON.stringify(response.data, null, 4));
    })
    .catch((error) => {
      res.status(404).json({ message: "Book not found", error: error.message });
    });
});

// Task 11: Search by Author using Promises with Axios
public_users.get('/async/author/:author', function (req, res) {
  const author = req.params.author;
  
  axios.get(`${BASE_URL}/author/${encodeURIComponent(author)}`)
    .then((response) => {
      res.send(JSON.stringify(response.data, null, 4));
    })
    .catch((error) => {
      res.status(404).json({ message: "No books found for this author", error: error.message });
    });
});

// Task 11: Search by Title using Promises with Axios
public_users.get('/async/title/:title', function (req, res) {
  const title = req.params.title;
  
  axios.get(`${BASE_URL}/title/${encodeURIComponent(title)}`)
    .then((response) => {
      res.send(JSON.stringify(response.data, null, 4));
    })
    .catch((error) => {
      res.status(404).json({ message: "No books found with this title", error: error.message });
    });
});

module.exports.general = public_users;
