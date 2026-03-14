/**
 * General Async Routes - Express Router
 * This module handles asynchronous book retrieval operations using Axios
 * All routes use Promise-based or async/await patterns for HTTP requests
 */

const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
const public_users = express.Router();

// Base URL for internal API calls
const BASE_URL = 'http://localhost:5000';

/**
 * Task 10: Get all books using async/await with Axios
 * Route: GET /async
 * Description: Retrieves all books from the database using async/await pattern
 * Returns: JSON object containing all books with their details
 * Error Handling: Returns 500 status code with error message if request fails
 */
public_users.get('/async', async function (req, res) {
  try {
    // Make asynchronous HTTP GET request to fetch all books
    const response = await axios.get(`${BASE_URL}/`);
    // Send formatted JSON response
    res.send(JSON.stringify(response.data, null, 4));
  } catch (error) {
    // Handle any errors that occur during the request
    res.status(500).json({ 
      message: "Error fetching books", 
      error: error.message 
    });
  }
});

/**
 * Task 11: Search by ISBN using Promises with Axios
 * Route: GET /async/isbn/:isbn
 * Parameters: isbn - The ISBN number of the book to retrieve
 * Description: Retrieves book details based on ISBN number using Promise-based approach
 * Returns: JSON object containing book details for the specified ISBN
 * Error Handling: Returns 404 status code if book not found
 */
public_users.get('/async/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  
  // Use Axios with Promise-based approach to fetch book by ISBN
  axios.get(`${BASE_URL}/isbn/${isbn}`)
    .then((response) => {
      // Send formatted JSON response on success
      res.send(JSON.stringify(response.data, null, 4));
    })
    .catch((error) => {
      // Handle errors such as book not found or network issues
      res.status(404).json({ 
        message: "Book not found", 
        error: error.message 
      });
    });
});

/**
 * Task 11: Search by Author using Promises with Axios
 * Route: GET /async/author/:author
 * Parameters: author - The name of the author to search for
 * Description: Retrieves all books by a specific author using Promise-based approach
 * Returns: JSON array containing all books by the specified author
 * Note: Author parameter is properly encoded to handle special characters and spaces
 * Error Handling: Returns 404 status code if no books found for the author
 */
public_users.get('/async/author/:author', function (req, res) {
  const author = req.params.author;
  
  // Properly encode the author parameter to handle special characters and spaces
  // This ensures URLs with spaces or special characters work correctly
  const encodedAuthor = encodeURIComponent(author);
  
  // Use Axios with Promise-based approach to fetch books by author
  axios.get(`${BASE_URL}/author/${encodedAuthor}`)
    .then((response) => {
      // Send formatted JSON response on success
      res.send(JSON.stringify(response.data, null, 4));
    })
    .catch((error) => {
      // Handle errors such as no books found for author or network issues
      res.status(404).json({ 
        message: "No books found for this author", 
        error: error.message 
      });
    });
});

/**
 * Task 11: Search by Title using Promises with Axios
 * Route: GET /async/title/:title
 * Parameters: title - The title of the book to search for
 * Description: Retrieves all books with a specific title using Promise-based approach
 * Returns: JSON array containing all books with the specified title
 * Note: Title parameter is properly encoded to handle special characters and spaces
 * Error Handling: Returns 404 status code if no books found with the title
 */
public_users.get('/async/title/:title', function (req, res) {
  const title = req.params.title;
  
  // Properly encode the title parameter to handle special characters and spaces
  // This ensures URLs with spaces or special characters work correctly
  const encodedTitle = encodeURIComponent(title);
  
  // Use Axios with Promise-based approach to fetch books by title
  axios.get(`${BASE_URL}/title/${encodedTitle}`)
    .then((response) => {
      // Send formatted JSON response on success
      res.send(JSON.stringify(response.data, null, 4));
    })
    .catch((error) => {
      // Handle errors such as no books found with title or network issues
      res.status(404).json({ 
        message: "No books found with this title", 
        error: error.message 
      });
    });
});

// Export the router for use in the main application
module.exports.general = public_users;
