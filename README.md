# Car Management Application 🚗

## Overview

The **Car Management Application** is a full-stack application that allows users to manage their car inventory. It enables users to create, view, update, and delete cars with details such as images, titles, descriptions, and tags. The application ensures data security through authentication and allows users to search globally for cars based on keywords.

---

## Key Features

1. **User Authentication**: Users can log in and sign up securely.
2. **Add Cars**: Users can add cars with up to 10 images, titles, descriptions, and tags.
3. **View Cars**: Users can see a list of all the cars they have added.
4. **Search Functionality**: Global search through cars by title, description, or tags.
5. **Car Details**: View the details of individual cars.
6. **Edit Cars**: Update the title, description, tags, or images of cars.
7. **Delete Cars**: Remove cars from the inventory.

---

## Tech Stack

### Backend:
- **Node.js** with **Express.js** for server-side operations.
- **MongoDB** for database management.
- **Multer** for file uploads.
- **Cloudinary** for image storage.
- **JWT** for user authentication.

### Frontend:
- **React** with **Vite** for building the user interface.
- **Redux Toolkit** for state management.
- **Tailwind CSS** for styling.

---

---

## API Documentation

Swagger documentation is available at:  
[API Docs](https://www.postman.com/joint-operations-cosmologist-64352344/spyne-ai-assignment/collection/mcqazv3/car-mgmt-api-docs?action=share&creator=30730048)

---

## Folder Structure
```
.
├── .vscode/                   # Editor configuration
├── client/                    # Frontend application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Application pages
│   │   ├── redux/             # Redux Toolkit slices
│   │   ├── App.jsx            # Main application component
│   │   ├── main.jsx           # Vite's main entry point
│   │   └── index.css          # Global styles
│   ├── public/                # Static assets
│   ├── vite.config.js         # Vite configuration
│   └── package.json           # Frontend dependencies
├── server/                    # Backend application
│   ├── config/                # Database and app configurations
│   │   └── DbConnect.js       # MongoDB connection setup
│   ├── controllers/           # Logic for handling API requests
│   │   ├── car.controller.js  # Car-related API logic
│   │   └── user.controller.js # User-related API logic
│   ├── middlewares/           # Authentication and validation logic
|   |   └── Auth.js            # Auth file
│   ├── models/                # Database schemas
│   │   ├── user.model.js      # User schema
│   │   └── car.model.js       # Car schema
│   ├── routes/                # API route handlers
│   │   ├── car.routes.js      # Car routes
│   │   └── user.routes.js     # User routes
│   ├── utils/                 # Helper utilities
│   │   ├── imageUpload.js     # Helper for image upload
│   │   └── multer.js          # Multer configuration
│   ├── uploads/               # Temporary image uploads
│   └── server.js              # Entry point for the backend
├── uploads/                   # Temporary image uploads
├── .env                       # Environment variables
├── .gitignore                 # Git ignore file
├── package.json               # Node.js dependencies
├── package-lock.json          # Lockfile for dependencies
└── README.md                  # This file

---

## Setup Instructions

### Backend:
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following keys:
   ```
   PORT=<your_port_number>
   MONGO_URI=<your_mongo_connection_string>
   CLOUD_NAME=<your_cloudinary_cloud_name>
   API_KEY=<your_cloudinary_api_key>
   API_SECRET=<your_cloudinary_api_secret>
   JWT_SECRET=<your_jwt_secret>
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend:
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend:
   ```bash
   npm run dev
   ```

---

--- 
