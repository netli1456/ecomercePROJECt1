# Ecommerce-Project1 Backend API Documentation

This is the documentation for the backend API of the E-Commerce Project. The API provides endpoints for managing users and products.

# Installation

Clone the repository to your local machine.
https://github.com/your-username/ecommerce-backend.git

# Install the dependencies using npm or yarn.

cd ecommerce-backend
npm install

# Create a .env file in the root directory and set the necessary environment variables.

JWT_SECRET=your_jwt_secret_key
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/ecommerce-project1

# Running the API

Start the API server using the following command:
npm start
The API server will be running on http://localhost:4000.

# API Endpoints For Users

POST /api/users/signup: Create a new user account.
POST /api/users/signin: Sign in a user and receive an access token.
PUT /api/users/:id: Update user information. (Protected)
DELETE /api/users/:id: Delete a user and associated data. (Protected)
GET /api/users: Search for users by name.

# Api EndPoints for Products

POST /api/products: Add a new product. (Protected)
GET /api/products/find/:id: Get product details by ID.
PUT /api/products/:id/:userId: Update product information. (Protected)
DELETE /api/products/:id/:userId: Delete a product. (Protected)
GET /api/products: Get a list of random products.
GET /api/products/:userId: Get products by user ID.
GET /api/products?query=:query: Search for products by name, brand, or description.

# Authentication

Protected routes require a valid access token. Include the access token in the request header as follows:

# http

Authorization: Bearer your_access_token_here

# Technologies Used

Node.js
Express.js
MongoDB (with Mongoose)
Bcrypt.js
JSON Web Tokens (JWT)

# Contributing ?

Contributions are welcome! Feel free to submit pull requests or report issues.
