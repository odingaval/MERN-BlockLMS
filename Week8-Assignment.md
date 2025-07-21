# 🏆 Week 8: Capstone Project and Presentation – Bringing Your MERN Skills Together

## 🚀 Objective
Design, develop, and deploy a comprehensive full-stack MERN application that showcases all the skills you've learned throughout the course, including database design, RESTful API development, real-time features, testing, and deployment.

## 📂 Tasks

### Task 1: Project Planning and Design
- Choose a project idea that solves a real-world problem 
- Create wireframes and mockups for your application
- Design the database schema and relationships
- Plan the API endpoints and data flow
- Create a project roadmap with milestones
- Document your technical architecture decisions

### Task 2: Backend Development
- Set up a MongoDB database with appropriate schemas and validation
- Develop a RESTful API using Express.js with proper error handling
- Implement authentication and authorization
- Create middleware for logging, validation, and security
- Add real-time functionality with Socket.io where appropriate
- Write comprehensive tests for your API endpoints

### Task 3: Frontend Development
- Build a responsive UI using React and modern CSS techniques
- Implement client-side routing with React Router
- Create reusable components with proper state management
- Connect to the backend API and handle data fetching
- Add form validation and error handling
- Implement real-time updates on the client side

### Task 4: Testing and Quality Assurance
- Write unit tests for critical components and functions
- Implement integration tests for API endpoints
- Add end-to-end tests for critical user flows
- Perform manual testing across different devices and browsers
- Conduct code reviews and refactoring as needed
- Ensure the application meets accessibility standards

### Task 5: Deployment and Documentation
- Deploy your application to production (backend and frontend)
- Set up CI/CD pipelines for automated testing and deployment
- Configure monitoring and error tracking
- Create comprehensive documentation for your project:
  - README with setup instructions
  - API documentation
  - User guide
  - Technical architecture overview
- Prepare a presentation showcasing your application

## 🧪 Expected Outcome
- A fully functional, deployed MERN stack application
- Source code in a GitHub repository with proper documentation
- Comprehensive test suite with good coverage
- Live demonstration of the application
- Project presentation highlighting key features and technical decisions

## 🛠️ Project Ideas (Optional)
Here are some project ideas you can consider:
- E-commerce platform with product catalog, cart, and checkout
- Task/project management system with team collaboration
- Social media platform with posts, comments, and real-time notifications
- Learning management system with courses, lessons, and progress tracking
- Health and fitness tracker with data visualization
- Recipe sharing platform with search and filtering
- Job board with application tracking
- Event management system with registration and ticketing

Feel free to come up with your own idea that demonstrates your skills and interests!

## ✅ Submission Instructions
1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Develop your capstone project within this repository
4. Commit and push your code regularly to show progress
5. Include in your repository:
   - Complete source code for both frontend and backend
   - Documentation in the form of README files
   - Tests and CI/CD configuration
6. Deploy your application and ensure it's accessible online
7. Update your main README.md with:
   - A description of your project
   - Setup instructions
   - Link to the deployed application
   - Link to a 5-10 minute video demonstration
   - Screenshots of key features
8. Your final submission will be automatically graded based on the criteria in the autograding configuration
9. The instructor will review your complete project after the final push 

---

## 1. **Choose a React Starter**

For a MERN project, the most common choices are:
- **Create React App (CRA):** Easiest, but less modern.
- **Vite:** Fast, modern, and recommended for new projects.

**I recommend Vite** for its speed and simplicity.

---

## 2. **Scaffolding with Vite**

### **A. Run this command in your project root:**
```bash
npm create vite@latest lms-frontend -- --template react
```

or, if you prefer yarn:
```bash
yarn create vite lms-frontend --template react
```

### **B. Install dependencies:**
```bash
cd lms-frontend
npm install
```

### **C. Start the development server:**
```bash
npm run dev
```

---

## 3. **Recommended Folder Structure**

After scaffolding, update your `src/` folder like this:
```
src/
  components/
  pages/
  mock/
  App.jsx
  main.jsx
```

---

## 4. **Next Steps**

- Set up React Router for page navigation.
- Create placeholder pages (Landing, Login, Signup, Dashboard, Course, Lesson).
- Add a simple Navbar for navigation.

---

## 5. **Would you like me to:**
- Provide the exact commands to run?
- Suggest the first set of dependencies (e.g., React Router, UI library)?
- Show you how to set up routing and placeholder pages?

Let me know if you want the commands, the next code steps, or both! 

---

## 1. Create the Backend Directory

Let’s call it `lms-backend` (to match your `lms-frontend`).

## 2. Initialize the Project

```bash
mkdir lms-backend
cd lms-backend
npm init -y
```

## 3. Install Dependencies

```bash
npm install express mongoose cors dotenv
npm install --save-dev nodemon
```

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **cors**: Enable cross-origin requests
- **dotenv**: Manage environment variables
- **nodemon**: Auto-restart server on changes (dev only)

## 4. Basic Folder Structure

```
lms-backend/
  ├── models/
  ├── routes/
  ├── controllers/
  ├── .env
  ├── server.js
  └── package.json
```

## 5. Create a Simple Server

**server.js:**
```js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

## 6. Add a .env File

**.env:**
```
MONGO_URI=mongodb://localhost:27017/lms
PORT=5000
```

## 7. Add Scripts to package.json

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

---

### Next Steps

- I can generate the backend folder and starter files for you automatically.
- Would you like to proceed with this structure?
- Do you want to use local MongoDB or a cloud service (like MongoDB Atlas)?

Let me know, and I’ll scaffold the backend in your project! 