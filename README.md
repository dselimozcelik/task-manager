# Task Manager Application

A full-stack task management application built with the MERN stack (MongoDB, Express.js, React, Node.js) that allows users to manage their tasks efficiently.

## Features

- **User Authentication**
  - Register new account
  - Login with existing account
  - JWT-based authentication
  - Protected routes

- **Task Management**
  - Create new tasks
  - View all tasks
  - Update existing tasks
  - Delete tasks
  - Filter and sort tasks (coming soon)

- **Task Properties**
  - Title
  - Description
  - Status (Not Started, In Progress, Completed)
  - Priority (Low, Medium, High)
  - Due Date
  - Category

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Tailwind CSS for styling
- Context API for state management
- Axios for API requests

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- Express Async Handler

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/task-manager.git
cd task-manager
```

2. Install Backend Dependencies
```bash
cd task-manager-backend
npm install
```

3. Configure Environment Variables
Create a `.env` file in the backend directory with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Install Frontend Dependencies
```bash
cd ../task-manager-frontend
npm install
```

### Running the Application

1. Start the Backend Server
```bash
cd task-manager-backend
npm run dev
```

2. Start the Frontend Development Server
```bash
cd task-manager-frontend
npm run dev
```

The application will be available at `http://localhost:5173`

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get user details

### Tasks
- GET `/api/tasks` - Get all tasks for logged in user
- POST `/api/tasks` - Create a new task
- GET `/api/tasks/:id` - Get single task
- PUT `/api/tasks/:id` - Update task
- DELETE `/api/tasks/:id` - Delete task

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

- [React Documentation](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) 