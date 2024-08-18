# EC Assignment (FrontEnd)

This project is a web application that handles user registration, login, and product viewing. It includes user authentication, which is managed through JWT tokens stored in cookies. The application is built with React and uses React Router for client-side routing.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Authentication Flow](#authentication-flow)
  - [User Registration](#user-registration)
  - [User Login](#user-login)
  - [Product Listing](#product-listing)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Technologies Used](#technologies-used)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [React](https://reactjs.org/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/prabhakarkumar07/engineerscradleassignment
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

## Running the Application

To start the development server, run:

```bash
npm run dev
```

This will start the application on `http://localhost:5173`.

## Project Structure

Here’s an overview of the project structure:

```plaintext
src/
│
├── components/
│   ├── AuthContext.js          # Authentication context for managing user state
│   ├── UserLogin.js            # Component for user login
│   ├── UserRegistration.js     # Component for user registration
│   ├── ProductCard.js          # Component for product listing
│   └── LoginPage.js            # Component for login page
│   ├── SignupPage.js           # Component for registration page
│
├── pages/
│   ├── ProductListing.js       # Page for displaying product listing navbar ,search bar and pagination
│
│
├── App.js                      # Main app component with routes
├── main.js                    # Entry point for the React app
└── ...
```

## Authentication Flow

### User Registration

1. **User Input**: The user enters their email, password, and password confirmation into the registration form.
2. **Form Submission**: The form data is sent to the backend API endpoint for user registration.
3. **Backend Response**:
   - **Success**: If registration is successful, a message is displayed to the user, and they are redirected to the login page.
   - **Failure**: If the user is already registered, an error message is displayed prompting them to sign in instead.

### User Login

1. **User Input**: The user enters their email and password into the login form.
2. **Form Submission**: The form data is sent to the backend API endpoint for login.
3. **Backend Response**:
   - **Success**: If login is successful, the backend returns a JWT token, which is stored in a cookie. The user is then redirected to the product listing page.
   - **Failure**: If the credentials are incorrect, an error message is displayed.

### Product Listing

1. **Protected Route**: The product listing page is a protected route that requires authentication.
2. **Token Validation**: On accessing the product listing page, the application checks the stored JWT token. If the token is valid, the user can view the products. Otherwise, they are redirected to the login page.

## API Endpoints

- **User Registration**: `POST https://intern-task-api.bravo68web.workers.dev/auth/signup`

  - **Request Body**: `{ email: string, password: string }`
  - **Response**: `201 Created` on success, `400 Bad Request` if the user is already registered.

- **User Login**: `POST https://intern-task-api.bravo68web.workers.dev/auth/login`

  - **Request Body**: `{ email: string, password: string }`
  - **Response**: `200 OK` with JWT token on success, `401 Unauthorized` on failure.

- **Fetch User Info**: `GET https://intern-task-api.bravo68web.workers.dev/api/me`

  - **Headers**: `{ Authorization: "Bearer <token>" }`
  - **Response**: `200 OK` with user info, `401 Unauthorized` if the token is invalid.

## Error Handling

- **Validation Errors**: Displayed on the registration form if the email is invalid or passwords do not match.
- **API Errors**: Displayed on the login and registration forms if the API returns an error (e.g., user already exists, incorrect credentials).

## Technologies Used

- **React**: Frontend framework for building the user interface.
- **React Router**: For handling routing within the application.
- **Context API**: For managing user authentication state across the application.
- **JS-Cookie**: For handling JWT tokens stored in cookies.
- **Tailwind CSS**: For styling components.
- **react-icons**: For including icons in the project.
