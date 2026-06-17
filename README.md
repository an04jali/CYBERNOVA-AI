# 🚀 CyberNova AI

CyberNova AI is a full-stack Generative AI SaaS platform that combines multiple AI-powered productivity tools into a single modern application. Users can generate content, create images, review resumes, remove image backgrounds, and manage their AI-generated creations through a secure and intuitive dashboard.

## ✨ Features

### 📝 AI Article Writer

Generate high-quality articles, blogs, and content using Generative AI.

### 🎨 AI Image Generator

Create stunning AI-generated images from text prompts.

### 🖼️ Background Removal

Remove image backgrounds instantly with AI-powered image processing.

### 📄 Resume Reviewer

Analyze resumes and receive AI-generated feedback and improvement suggestions.

### 🔐 Secure Authentication

User authentication and session management powered by Clerk.

### 📊 User Dashboard

Track and manage all AI-generated creations in one place.

### ⚡ Modern UI/UX

Responsive and visually appealing interface built with React.

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Clerk Authentication
* CSS / Modern UI Components

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### AI Services

* Generative AI APIs
* Hugging Face APIs
* Image Processing APIs

---

## 📂 Project Structure

```bash
CyberNova-AI/
│
├── client/
│   ├── src/
│   ├── assets/
│   ├── components/
│   └── pages/
│
├── server/
│   ├── routes/
│   ├── models/
│   └── controllers/
│
└── README.md
```

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/CYBERNOVA-AI.git
cd CYBERNOVA-AI
```

### Install Frontend Dependencies

```bash
cd client
npm install
```

### Install Backend Dependencies

```bash
cd ../server
npm install
```

### Environment Variables

Create a `.env` file in the server directory:

```env
MONGODB_URI=your_mongodb_connection
CLERK_SECRET_KEY=your_clerk_secret
HF_TOKEN=your_huggingface_token
```

Create a `.env` file in the client directory:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
```

### Run Frontend

```bash
cd client
npm run dev
```

### Run Backend

```bash
cd server
npm start
```
