# ✨ Crumb Stories

### Creative Blogging Platform

Crumb Stories is a full-stack blogging platform where users can create, explore, and share stories with a simple and beautiful interface.

## 🌸 Features

- 🔐 User Registration & Login
- ✍️ Create and publish blogs
- 📖 Read and explore stories
- ✏️ Edit your own blogs
- 🗑️ Delete blogs
- ❤️ Like posts
- 💬 Comment on posts
- 🔎 Search stories
- 🏷️ Filter blogs by category
- 👤 Creator Dashboard
- 📊 Track stories, likes, and comments
- 📱 Responsive user interface

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

## 📂 Project Structure

```text
Crumb-Stories/
│
├── blog-frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── blog-api/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    ├── config/
    ├── uploads/
    ├── server.js
    └── package.json

🚀 How to Run Locally
1. Clone the repository
git clone https://github.com/bhashi-3010/crumb-stories.git
cd crumb-stories
2. Start the Backend
cd blog-api
npm install
npm start

The backend runs on:
http://localhost:5000
3. Start the Frontend

Open another terminal:
cd blog-frontend
npm install
npm run dev

The frontend will run on the Vite development server, usually:

http://localhost:5173

🔑 Environment Variables

The backend uses environment variables for configuration.

Create a .env file inside blog-api:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Never upload your .env file or expose your database credentials publicly.

🎯 Main Modules
Authentication

Users can register and securely log in to the platform.

Blog Management

Authenticated users can create, edit, read, and delete their own stories.

Engagement

Readers can like and comment on stories.

Explore

Users can search for stories and filter them using categories such as Design, Engineering, Lifestyle, Travel, Food, and Other.

Creator Dashboard

Creators can manage their published stories and view engagement statistics.

💡 Purpose

The goal of Crumb Stories is to provide a simple platform where people can express their ideas, experiences, knowledge, and creativity through blogging.

🔮 Future Enhancements
Image generation based on blog titles
User profile customization
Bookmark/save stories
Notifications
Rich text editor
Admin moderation
Cloud image storage
Deployment with a production database
👩‍💻 Project

Crumb Stories – Creative Blogging Platform

Built using modern full-stack web technologies with a focus on simplicity, creativity, and user experience.
