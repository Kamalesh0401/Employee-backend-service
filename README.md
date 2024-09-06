# Employee Management Server

This is the backend service for the Employee Management System, built with Node.js.

## Prerequisites

Before running this project, ensure you have the following installed:
- Node.js (version 14.x or later recommended)
- npm (usually comes with Node.js)

## Getting Started

Follow these steps to set up and run the Employee Management Server:

1. Clone the repository:
   ```bash
   git clone https://github.com/Kamalesh0401/employee-management-server.git
   ```

2. Navigate to the project directory:
   ```bash
   cd employee-management-server
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the server:
   ```bash
   npm start
   ```

   The server should now be running on `http://localhost:5000`.

## Available Scripts

In the project directory, you can run:

- `npm start`: Starts the server.
- `npm test`: Runs the test suite (if configured).
- `npm run dev`: Starts the server with nodemon for development (if configured).

## API Endpoints

The server provides the following API endpoints:

- `GET /employees`: Retrieve all employees data.
- `POST /employees/add`: Add a new employee.
- `PUT /employees/update`: Update an existing employee.
- `DELETE /employees/:id`: Delete an employee by ID.

### Example Usage

1. Get all employees:
   ```
   GET http://localhost:5000/employees
   ```

2. Add a new employee:
   ```
   POST http://localhost:5000/employees/add
   Content-Type: application/json

   {
     "name": "John Doe",
     "position": "Software Developer",
     "department": "IT"
   }
   ```

3. Update an employee:
   ```
   PUT http://localhost:5000/employees/update
   Content-Type: application/json

   {
     "id": "123",
     "name": "John Smith",
     "position": "Senior Software Developer",
     "department": "IT"
   }
   ```

4. Delete an employee:
   ```
   DELETE http://localhost:5000/employees/123
   ```

## Environment Variables

If your server uses environment variables, list them here along with a brief description:

- `PORT`: The port on which the server will run (default: 5000)
  
## Database Setup

This project uses Firebase as its database. Follow these steps to set up and connect to the Firebase database:

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/).

2. In your Firebase project, create a new Realtime Database.

3. In the Firebase Console, go to Project Settings > Service Accounts.

4. Click on "Generate new private key" to download the credentials file.

5. Rename the downloaded file to `credentials.json` and place it in the root directory of this project.

6. In the `firebase.js` file of this project, update the Firebase configuration as follows:

   ```javascript
   const admin = require('firebase-admin');
   const serviceAccount = require('./credentials.json');

   admin.initializeApp({
     credential: admin.credential.cert(serviceAccount),
     databaseURL: "https://your-project-id.firebaseio.com"
   });
   ```

   Replace `"https://your-project-id.firebaseio.com"` with the actual database URL from your Firebase project.

7. Ensure that `credentials.json` is added to your `.gitignore` file to prevent exposing sensitive information.

## CORS Configuration

The server is configured to allow CORS for the frontend application. If you need to modify the CORS settings, update the CORS configuration in the main server file.

## Troubleshooting

- If the server fails to start, check if the required port (default 5000) is available.
- Ensure all environment variables are correctly set.
- Verify database connection settings if applicable.
