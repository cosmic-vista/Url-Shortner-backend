# URL Shortener Backend API

A Node.js backend API for URL shortening service with user authentication and management.

## 🚀 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcrypt for hashing
- **Validation**: Zod schemas
- **Unique IDs**: nanoid for short codes
- **Environment**: dotenv for configuration

## 📋 Project Description

This is a URL shortening service that allows users to:
- Create user accounts with secure authentication
- Generate short URLs from long URLs
- Manage their shortened URLs (view, delete)
- Redirect short URLs to original URLs
- Each user can only access their own shortened URLs

## 🛠️ Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create `.env` file**
   ```env
   DATABASE_URL=mongodb://localhost:27017/urlshortener
   JWT_SECRET=your_jwt_secret_key_here
   PORT=3000
   BASE_URL=http://localhost:3000
   ```

3. **Start the server**
   ```bash
   npm run dev
   ```

## 📡 API Endpoints & Postman Testing

### Base URL: `http://localhost:3000`

### 1. User Authentication

#### POST `/api/users/signup`
**Description**: Create a new user account

**Headers**:
```
Content-Type: application/json
```

**Body** (raw JSON):
```json
{
  "name": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Expected Response**:
```json
{
  "message": "User created successfully",
  "newUser": {
    "_id": "user_id",
    "name": "john_doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST `/api/users/login`
**Description**: Login user and get JWT token

**Headers**:
```
Content-Type: application/json
```

**Body** (raw JSON):
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Expected Response**:
```json
{
  "login sucessful": "jwt_token_here"
}
```

#### POST `/api/users/logout`
**Description**: Logout user and clear cookie

**Headers**:
```
Content-Type: application/json
Cookie: token=jwt_token_from_login
```

**Expected Response**:
```json
{
  "message": "logout successfully"
}
```

### 2. URL Management

#### POST `/api/url/shorten`
**Description**: Create a shortened URL (requires authentication)

**Headers**:
```
Content-Type: application/json
Cookie: token=jwt_token_from_login
```

**Body** (raw JSON):
```json
{
  "originalUrl": "https://www.google.com/search?q=very+long+search+query"
}
```

**Expected Response**:
```json
{
  "saved url is": {
    "_id": "url_id",
    "originalUrl": "https://www.google.com/search?q=very+long+search+query",
    "shortCode": "abc12345",
    "shortUrl": "http://localhost:3000/abc12345",
    "user": "user_id",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### GET `/api/url/allUrls`
**Description**: Get all shortened URLs for authenticated user

**Headers**:
```
Cookie: token=jwt_token_from_login
```

**Expected Response**:
```json
{
  "count": 2,
  "urls": [
    {
      "_id": "url_id",
      "originalUrl": "https://www.google.com",
      "shortCode": "abc12345",
      "shortUrl": "http://localhost:3000/abc12345",
      "user": "user_id",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### GET `/api/url/:shortCode`
**Description**: Redirect to original URL (requires authentication)

**Headers**:
```
Cookie: token=jwt_token_from_login
```

**Example**: `GET /api/url/abc12345`

**Expected Response**: Redirects to original URL

#### DELETE `/api/url/:shortCode`
**Description**: Delete a shortened URL (requires authentication)

**Headers**:
```
Cookie: token=jwt_token_from_login
```

**Example**: `DELETE /api/url/abc12345`

**Expected Response**:
```json
{
  "message": "url deleted successfully",
  "url": {
    "_id": "url_id",
    "originalUrl": "https://www.google.com",
    "shortCode": "abc12345",
    "shortUrl": "http://localhost:3000/abc12345",
    "user": "user_id"
  }
}
```

### 3. Public Routes

#### GET `/`
**Description**: Check if server is running

**Expected Response**:
```json
{
  "server": "server is running"
}
```

## 🔐 Authentication Flow

1. **Signup** → Create account
2. **Login** → Get JWT token (stored in cookie)
3. **Use token** → Include cookie in protected routes
4. **Logout** → Clear authentication

## 📝 Postman Collection Setup

1. **Create Environment Variables**:
   - `base_url`: `http://localhost:3000`
   - `jwt_token`: (will be set after login)

2. **Test Sequence**:
   ```
   1. POST {{base_url}}/api/users/signup
   2. POST {{base_url}}/api/users/login
   3. POST {{base_url}}/api/url/shorten
   4. GET {{base_url}}/api/url/allUrls
   5. DELETE {{base_url}}/api/url/:shortCode
   6. POST {{base_url}}/api/users/logout
   ```

## 🗄️ Database Models

### User Schema
```javascript
{
  name: String (required)
  email: String (required, unique)
  password: String (required, minlength: 6)
  createdAt: Date
}
```

### URL Schema
```javascript
{
  originalUrl: String (required)
  shortCode: String (required, unique)
  shortUrl: String (required)
  user: ObjectId (ref: User, required)
  createdAt: Date
}
```

## 🚨 Error Responses

- **400**: Bad Request (validation errors)
- **401**: Unauthorized (missing/invalid token)
- **404**: Not Found (URL/user not found)
- **500**: Internal Server Error

Example error:
```json
{
  "error": "User already exists"
}
```

## 🚀 Quick Start

1. Clone repository
2. Run `npm install`
3. Create `.env` file with MongoDB URL and JWT secret
4. Start MongoDB
5. Run `npm run dev`
6. Test with Postman using the endpoints above

---

**Made with Node.js, Express.js, MongoDB, and JWT Authentication**
