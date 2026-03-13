# Online Bookstore Back-End Application

## Installation

1. Install dependencies:
```
npm install
```

2. Start the server:
```
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Public Routes

1. **Get all books** (Task 1)
   - GET `/`
   - Returns list of all books

2. **Get book by ISBN** (Task 2)
   - GET `/isbn/:isbn`
   - Example: `/isbn/1`

3. **Get books by author** (Task 3)
   - GET `/author/:author`
   - Example: `/author/Chinua Achebe`

4. **Get books by title** (Task 4)
   - GET `/title/:title`
   - Example: `/title/Things Fall Apart`

5. **Get book reviews** (Task 5)
   - GET `/review/:isbn`
   - Example: `/review/1`

6. **Register new user** (Task 6)
   - POST `/customer/register`
   - Body: `{"username": "user1", "password": "pass123"}`

### Authenticated Routes

7. **Login** (Task 7)
   - POST `/customer/login`
   - Body: `{"username": "user1", "password": "pass123"}`

8. **Add/Modify review** (Task 8)
   - PUT `/customer/auth/review/:isbn?review=Your review text`
   - Requires login

9. **Delete review** (Task 9)
   - DELETE `/customer/auth/review/:isbn`
   - Requires login

### Async/Promise Routes (Tasks 10-11)

The async implementations are in `router/general_async.js` and demonstrate:
- Task 10: Getting all books using async callbacks
- Task 11: Search operations using Promises (ISBN, author, title)

## Testing the Application

Use tools like Postman, curl, or any HTTP client to test the endpoints.

### Example curl commands:

```bash
# Register a user
curl -X POST http://localhost:5000/customer/register -H "Content-Type: application/json" -d "{\"username\":\"testuser\",\"password\":\"test123\"}"

# Login
curl -X POST http://localhost:5000/customer/login -H "Content-Type: application/json" -d "{\"username\":\"testuser\",\"password\":\"test123\"}" -c cookies.txt

# Add a review (requires login)
curl -X PUT "http://localhost:5000/customer/auth/review/1?review=Great book!" -b cookies.txt

# Delete a review (requires login)
curl -X DELETE http://localhost:5000/customer/auth/review/1 -b cookies.txt

# Get all books
curl http://localhost:5000/

# Get book by ISBN
curl http://localhost:5000/isbn/1

# Get books by author
curl http://localhost:5000/author/Chinua%20Achebe

# Get books by title
curl http://localhost:5000/title/Things%20Fall%20Apart

# Get reviews for a book
curl http://localhost:5000/review/1
```

## Submission Files

For your assignment submission, include:
1. All source code files (index.js, router folder with all files)
2. package.json
3. Screenshots of testing each endpoint
4. This README.md file
