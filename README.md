# Full-Stack Blog Application (MonoBlog)

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

### 5. Running the App (Development)
Terminal 1 (Backend)
```Bash
cd server
npm run dev
```
Runs on http://localhost:5000

Terminal 2 (Frontend)
```Bash
cd client
npm run dev
```
Runs on http://localhost:5173

### 6. Production Build (How to build)
```Bash
cd client
npm run build
```
This creates a dist folder with static files that can be served by Nginx or the Node server.

## API Documentation
Base URL: http://localhost:5000/api

Authentication
| Method | Endpoint       | Description         | Payload                                                                 |
|--------|----------------|---------------------|-------------------------------------------------------------------------|
| POST   | /auth/register | Register a new user | `{ "username": "name", "email": "name@test.com", "password": "123" }`     |
| POST   | /auth/login    | Login user          | `{ "email": "name@test.com", "password": "123" }`                        |

Posts
Note: Write operations require Authorization: Bearer <token> header.

| Method | Endpoint     | Description        | Payload / Params |
|--------|--------------|--------------------|------------------|
| **GET** | `/posts`       | Get all posts       | Query: `?page=1&limit=5&search=ai` |
| **GET** | `/posts/:id`   | Get single post     | None |
| **POST** | `/posts`       | Create post        | `{ "title": "...", "content": "...", "imageURL": "..." }` |
| **PUT** | `/posts/:id`   | Update post  *(Must be Owner)* | `{ "title": "...", "content": "..." }` |
| **DELETE** | `/posts/:id` | Delete post  *(Must be Owner)* | None |

### Sample Request (Postman)
f you are using Postman to test manually:
Register: POST to  ```/auth/register```
Login: POST to ```/auth/login```. Copy the token from the response.
Create Post:
    Select POST ```/posts```.
    Go to Headers tab -> Key: ```Authorization```, Value: ```Bearer <your_copied_token>```.
    Go to Body -> JSON:

    ```
    {
 ``` "title": "My First Blog Post",```
 ``` "content": "This is the content of the blog post. It needs to be at least 50 characters long so keep typing until you hit the limit.",```
  ```"imageURL": "[https://placehold.co/600x400](https://placehold.co/600x400)"```
```}```



**Screenshots**
**1. Home Feed (with Pagination & Search)**


**2. Post Detail View**


**3. Create/Edit Form**
