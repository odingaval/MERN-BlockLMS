# BlockLMS

This is a full-stack Learning Management System built with the MERN (MongoDB, Express, React, Node.js) stack. It provides a platform where educators can create and manage courses, and students can enroll, consume lesson content, and track their progress.

## Features

- **User Authentication:** Secure user registration and login for both Students and Educators.
- **Role-Based Access Control:** Separate dashboards and functionalities for Student and Educator roles.
- **Course Creation:** Educators can create new courses, including titles, descriptions, and a dynamic list of lessons with content.
- **Course Enrollment:** Students can browse available courses and enroll in them with a single click.
- **Lesson Progression:** Students can view lesson content and mark lessons as complete.
- **Progress Tracking:** A visual progress bar shows students their completion percentage for each enrolled course.
- **Modern UI:** A clean, responsive, and polished user interface built with MUI (Material-UI).
- **Toast Notifications:** Non-intrusive feedback for all major user actions.

## Tech Stack

- **Backend:** Node.js, Express.js, MongoDB (with Mongoose), JWT for authentication.
- **Frontend:** React, React Router, MUI (Material-UI), Axios.
- **Development:** Vite for fast frontend bundling, Nodemon for backend auto-reloading.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/blocklms.git
    cd blocklms
    ```

2.  **Set up the Backend:**
    - Navigate to the backend directory and follow the instructions in its README file.
    - [Backend Setup Instructions](./lms-backend/README.md)

3.  **Set up the Frontend:**
    - Navigate to the frontend directory and follow the instructions in its README file.
    - [Frontend Setup Instructions](./lms-frontend/README.md)

Once both the frontend and backend servers are running, you can access the application in your browser at `http://localhost:5173`. 