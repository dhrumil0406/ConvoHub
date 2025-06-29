# 💬 ConvoHub - Real-Time Chat Application

**ConvoHub** is a real-time full-stack chat application built with the **MERN stack (MongoDB, Express, React, Node.js)**. It enables users to engage in private 1:1 chats with persistent messaging, JWT authentication, and real-time updates using **Socket.IO**. The frontend is styled using **Tailwind CSS**, with **Zustand** managing global state.

> Chat with friends, sync instantly — all in one sleek interface.

### 📦 Prerequisites

- Node.js v18+
- MongoDB Atlas or local MongoDB
- Git

## 🔧 Tech Stack

- **Frontend:** React + Vite + Tailwind CSS + Zustand
- **Backend:** Node.js + Express + MongoDB + Mongoose
- **Real-time:** Socket.IO
- **Auth:** JWT (stored in HTTP-only cookies)
- **Tooling:** Vite, Concurrently, Dotenv

---

## 📁 Project Structure

convohub/
###
├── backend/ # Express.js backend
│ ├── src/
│ │ ├── controllers/
│ │ ├── lib/
│ │ ├── middleware/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── seeds/
│ │ └── index.js
│ ├── .env
│ └── package.json
│
###
├── frontend/ # React.js frontend (Vite)
│ ├── public/
│ ├── src/
│ │ ├── assets/
│ │ ├── components/
│ │ ├── constants/
│ │ ├── lib/
│ │ ├── pages/
│ │ ├── store/
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css
│ ├── .env
│ ├── tailwind.config.js
│ ├── vite.config.js
│ └── package.json

---

## 🚀 Getting Started

### 🔐 1. Clone the repository
    - git clone https://github.com/dhrumil0406/ConvoHub.git
    - cd ConvoHub

### 2. Install dependencies for both frontend & backend
    - npm run build

### 3. Start the app (both frontend + backend)
    - npm run start

### 4. 🔐 Backend .env (/backend/.env)

    MONGODB_URI = your_mongo_uri
    
    PORT = 5001

    JWT_SECRET = your jwt swcret
    NODE_ENV = development

    CLOUDINARY_CLOUD_NAME = your account cloud name
    CLOUDINARY_API_KEY = your account api key
    CLOUDINARY_API_SECRET = your account api secret

---

### 🧠 Features ###
- 🔐 Secure JWT authentication (stored in cookies)

- ⚡ Real-time 1-to-1 messaging via Socket.IO

- 🧩 Global state management with Zustand

- 🌓 Clean and responsive UI with Tailwind CSS

- ✅ Online user indicators, typing status, and more