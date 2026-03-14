const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
const public_users = express.Router();

const BASE_URL = 'http://localhost:5000';

// Task 10: Get all books using async/await with Axios
// This route retrieves all books from the database using async/await pattern
// Returns: JSON object containing all books with their details
public_users.get('/async', async function (req, res) {
  try {
    // Make HTTP GET request to fetch all books
    const response = await axios.get(`${BASE_URL}/`);
    res.send(JSON.stringify(response.data, null, 4));
  } catch (error) {
    // Handle any errors that occur during the request
    res.status(500).json({ message: "Error fetching books", error: error.message });
  }
});

// Task 11: Search by ISBN using Promises with Axios
// This route retrieves book details based on ISBN number
// Parameters: isbn - The ISBN number of the book to retrieve
// Returns: JSON object containing book details for the specified ISBN
public_users.get('/async/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  
  // Use Axios with Promise-based approach to fetch book by ISBN
  axios.get(`${BASE_URL}/isbn/${isbn}`)
    .then((response) => {
      res.send(JSON.stringify(response.data, null, 4));
    })
    .catch((error) => {
      // Handle errors such as book not found or network issues
      res.status(404).json({ message: "Book not found", error: error.message });
    });
});

// Task 11: Search by Author using Promises with Axios
// This route retrieves all books by a specific author
// Parameters: author - The name of the author to search for
// Returns: JSON array containing all books by the specified author
// Note: Author parameter is properly encoded to handle special characters
public_users.get('/async/author/:author', function (req, res) {
  const author = req.params.author;
  
  // Properly encode the author parameter to handle special characters and spaces
  const encodedAuthor = encodeURIComponent(author);
  
  // Use Axios with Promise-based approach to fetch books by author
  axios.get(`${BASE_URL}/author/${encodedAuthor}`)
    .then((response) => {
      res.send(JSON.stringify(response.data, null, 4));
    })
    .catch((error) => {
      // Handle errors such as no books found for author or network issues
      res.status(404).json({ message: "No books found for this author", error: error.message });
    });
});

// Task 11: Search by Title using Promises with Axios
// This route retrieves all books with a specific title
// Parameters: title - The title of the book to search for
// Returns: JSON array containing all books with the specified title
// Note: Title parameter is properly encoded to handle special characters
public_users.get('/async/title/:title', function (req, res) {
  const title = req.params.title;
  
  // Properly encode the title parameter to handle special characters and spaces
  const encodedTitle = encodeURIComponent(title);
  
  // Use Axios with Promise-based approach to fetch books by title
  axios.get(`${BASE_URL}/title/${encodedTitle}`)
    .then((response) => {
      res.send(JSON.stringify(response.data, null, 4));
    })
    .catch((error) => {
      // Handle errors such as no books found with title or network issues
      res.status(404).json({ message: "No books found with this title", error: error.message });
    });
});

module.exports.general = public_users;
