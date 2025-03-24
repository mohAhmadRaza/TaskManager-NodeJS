# Task Manager

## Description

Task Manager is a web application that allows users to manage their daily tasks efficiently. Users can register, log in, add tasks, view tasks, update tasks, delete tasks, and mark them as completed. The application also includes features such as email verification, OTP-based authentication, password reset, and logout functionality.

## Features

- **User Authentication**

  - Register
  - Login
  - Logout
  - Verify Email
  - Get OTP
  - Reset Password


- **Task Management**

  - Add a Task
  - View Tasks
  - Update a Task
  - Delete a Task
  - Mark Task as Completed

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Frontend:** HTML, CSS

## Installation

### Prerequisites

Make sure you have the following installed on your system:

- Node.js
- MongoDB

### Steps to Run the Project

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd task-manager
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables by creating a `.env` file in the root directory and add:
   ```env
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_secret_key>
   SMTP_EMAIL=<your_smtp_email>
   SMTP_PASSWORD=<your_smtp_password>
   ```
5. Start the server:
   ```bash
   npm start
   ```
6. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `POST /api/auth/verify-email` - Verify email
- `POST /api/auth/get-otp` - Get OTP
- `POST /api/auth/reset-password` - Reset password

### Task Management

- `POST /api/tasks` - Add a task
- `GET /api/tasks` - View all tasks
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Folder Structure

```
📂 task-manager
├── 📂 models
├── 📂 routes
├── 📂 controllers
├── 📂 middleware
├── app.js
├── 📂 views
├── 📂 public
├── 📂 configs
├── .env
├── package.json
├── README.md
```

## License

This project is licensed under the MIT License.

## Author

Ahmad Raza
