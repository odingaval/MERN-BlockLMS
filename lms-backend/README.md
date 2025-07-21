# BlockLMS Backend

This directory contains the backend server for the BlockLMS application. It's built with Node.js, Express, and MongoDB.

## Setup and Installation

1.  **Navigate to this directory:**
    ```sh
    cd lms-backend
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Create an environment file:**
    -   Copy the example environment file:
        ```sh
        cp .env.example .env
        ```
    -   Open the `.env` file and fill in your specific values.

4.  **Seed the database (Optional, but recommended):**
    -   This script will populate your database with sample courses and lessons.
    -   Make sure your MongoDB server is running.
    ```sh
    node seed.js
    ```

5.  **Start the development server:**
    -   This will start the server with `nodemon`, which automatically restarts on file changes.
    ```sh
    npm run dev
    ```

The backend server will be running on the port specified in your `.env` file (default is `5000`). 