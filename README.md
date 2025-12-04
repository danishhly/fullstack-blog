# 📝 Full-Stack Blog Application (MonoBlog)

 This is a MERN stack application (MongoDB, Express, React, Node.js) that allows users to read, create, edit, and delete posts. It features secure authentication, pagination, search functionality, and a responsive UI built with Tailwind CSS.

## Tech Stack
* **Frontend:** React (Vite), Tailwind CSS, React Router, Axios.
* **Backend:** Node.js, Express.
* **Database:** MongoDB (Mongoose).
* **Auth:** JWT (JSON Web Tokens) & Bcrypt for password hashing.

---

## Setup & Run Instructions

Follow these steps to get the app running on your machine.

### 1. Prerequisites
* Node.js installed.
* MongoDB installed locally or a MongoDB Atlas URI.

### 2. Installation
Open your terminal in the root project folder.

**Step A: Install Backend Dependencies**
```bash
cd server
npm install
```
**Step B: Install Frontend Dependencies**
``` bash
cd ../client
npm install
```

### 3. Environment Variables
Backend (server/.env) Create a file named .env in the server folder and add this:
```Bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/blog_task_db
JWT_SECRET=mySuperSecretKey123
```
Note: Replace the MONGO_URI with your ex:Mongodb atlas or local 

### 4. Seeding Data (Optional)
I've included a script to quickly create the database with a test user and some sample posts so the feed can be seen full.
```Bash
cd server
node seed.js
```
Check the console for the "Database Seeded!" message.
