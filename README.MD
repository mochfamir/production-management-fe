# Production Management FE

## Project Description
A React-based frontend application using the Refine Framework for managing work orders. This application provides features such as listing, creating, editing, and deleting work orders, along with user authentication.

**Repository:** [GitHub - Production Management FE](https://github.com/mochfamir/production-management-fe)

**Live Demo:** [Production Management FE](https://production-management-fe.vercel.app/)

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites
Before running this application, make sure you have installed:

- **Node.js** (v16 or higher): [Download Node.js](https://nodejs.org/)
- **npm or Yarn**: Included with Node.js installation.
- **Backend API**: Ensure the Nest.js backend or another API is running at http://localhost:3000.

## Installation

### Clone Repository:
```bash
git clone https://github.com/mochfamir/production-management-fe.git
cd production-management-fe
```

### Install Dependencies:
Using npm:
```bash
npm install
```
Or using Yarn:
```bash
yarn install
```

## Configuration

### Environment Variables
Create a `.env` file in the root directory and add the following environment variables:
```env
# Backend API URL
VITE_API_URL=http://localhost:3000/
```


## Running the Application

Start the application in development mode:
```bash
npm start
```
Or if using Yarn:
```bash
yarn start
```
The application will be available at http://localhost:5731.

## Project Structure
```
production-management-fe/
├── src/
│   ├── components/       # Reusable components
│   ├── pages/            # Main application pages
│   ├── providers/        # Context providers and hooks
│   ├── utils/            # Utility functions (e.g., Axios instance)
│   ├── App.tsx           # Root application component
│   └── index.tsx         # Application entry point
├── public/               # Static files (e.g., favicon)
├── .env                  # Environment variables
├── .gitignore            # Files ignored by Git
├── package.json          # Dependencies and scripts
└── README.md             # Project documentation
```

## API Documentation
The application interacts with the backend via a REST API. Key endpoints:

- `GET /api/work-orders` - Retrieve work orders.
- `GET /api/work-orders/:id` - Get work order details.
- `POST /api/work-orders` - Create a work order.
- `PUT /api/work-orders/:id` - Update a work order.
- `DELETE /api/work-orders/:id` - Delete a work order.

For full API documentation, refer to the backend documentation.

## Available Accounts
You can use the following accounts to log in:

### Manager
- **Email:** manager@example.com
- **Password:** password123

### Operators
1. **Email:** operator@example.com | **Password:** password123
2. **Email:** operator2@example.com | **Password:** password123
3. **Email:** operator3@example.com | **Password:** password123

## Contributing
We welcome contributions! To contribute:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your changes here"
   ```
4. Push the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request on GitHub.

## License
This project is licensed under the MIT License.
