# 🚀 Quick_Connect – Real-Time Chat Application

Quick_Connect is a **real-time chat application** built using the **MERN stack** with **Socket.IO** for instant messaging. It allows users to securely authenticate, connect with contacts, exchange messages in real time, share images, and manage profile photos.

🌐 Live Demo

Frontend (React + Vite): https://quick-connect-59u2.onrender.com
---

## 📌 Features

### 🔐 Authentication

* User Signup
* User Login
* Secure Logout
* JWT-based authentication with cookies

### 💬 Real-Time Chat

* One-to-one private chat
* Real-time messaging using Socket.IO
* Online users status
* Instant message delivery without page refresh

### 🖼️ Media Sharing

* Send image messages in chat
* Upload and update profile photo
* Image preview support

### 👤 User Management

* Select contacts for chatting
* View user profile
* Persistent chat history

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Socket.IO Client

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.IO
* JWT Authentication

---

## 📂 Project Structure

```
Quick_Connect/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── socket/
│   │   ├── context/
│   │   └── App.jsx
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── socket/
│   └── server.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/Quick_Connect.git
cd Quick_Connect
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Start backend server:

```bash
npm run dev
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔌 Socket.IO Workflow

* User connects after successful authentication
* Socket middleware validates user
* Online users are tracked using socket-user mapping
* Messages are emitted and received in real time

---

## 🔒 Security

* JWT authentication
* Protected routes
* HTTP-only cookies
* Socket authentication middleware

---

## 👨‍💻 Author

**Akshit Ahuja**
- **Email-**  
  akshitahuja1322@gmail.com

- **Linkdin:**  
   https://www.linkedin.com/in/akshit-ahuja-1583b928a

- **Github:**  
  https://github.com/akshitahuja2022



---

## ⭐ Support

If you like this project, please ⭐ the repository on GitHub!

---
