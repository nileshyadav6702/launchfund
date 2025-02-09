# LaunchFund

## Introduction

LaunchFund is a modern crowdfunding platform that enables users to create and manage campaigns, track donations in real-time, and engage with supporters through interactive features like live comments and updates. This platform simplifies the crowdfunding process, making it easy to start, promote, and track funding efforts.

## Project Type

Fullstack

## Deployed App

- **Frontend:** [LaunchFund on Netlify](https://launchfund.netlify.app/)
- **Backend:** [LaunchFund on Render](https://launchfund.onrender.com/)

## Directory Structure

```
launchfund/
├─ backend/
│  ├─ controllers/
│  │  ├─ campaign.controller.js
│  │  ├─ user.controller.js

│  ├─ models/ 
│  │  ├─ campaign.model.js
│  │  ├─ user.model.js
│  ├─ node_modules/ 
│  ├─ others/ 
│  │  ├─ uploadImage.js
│  ├─ routes/ 
│  │  ├─ campaignRoute.js
│  │  ├─ userRoute.js
│  ├─ .env 
│  ├─ .gitignore 
│  ├─ index.js
│  ├─ mongoconnect.js
│  ├─ package-lock.json
│  ├─ package.json
├─ frontend/
│  ├─ public/ 
│  ├─ src/ 
│  │  ├─ components/
│  │  │  ├─ campaign/
│  │  │  ├─ Home/
│  │  │  ├─ Login_signup/
│  │  │  ├─ Datacontext.jsx
│  │  ├─ assests/
│  │  ├─ App.css
│  │  ├─ App.jsx
│  │  ├─ index.jsx
│  │  ├─ main.jsx
│  ├─ .gitignore
│  ├─ README.md 
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ vite.config.js
├─ README.md
```

## Video Walkthrough of the Project

[Watch Here](https://www.youtube.com/watch?v=B2bxXY7XP88)

## Video Walkthrough of the Codebase

[Watch Here](https://www.youtube.com/watch?v=bTM7sRhh9fM)

## Features

- User authentication (Login & Sign-Up)
- Create, manage, and delete crowdfunding campaigns
- View all active campaigns in the explore section
- Donate to campaigns and track funding progress
- Comment section for donor engagement
- Graphical donation breakdown

## Design Decisions & Assumptions

- The platform is designed for easy navigation and usability
- Campaign creators should be able to update or delete their campaigns
- Donations are tracked in real-time with graphical representation
- A clean and minimal UI to enhance user experience

## Installation & Getting Started

Follow these steps to set up LaunchFund locally.

### 📌 Prerequisites

Ensure you have the following installed:

- **Node.js** (v14+)
- **MongoDB**

### 📥 Clone the Repository

```sh
git clone https://github.com/nileshyadav6702/launchfund.git
cd launchfund
```

### 🚀 Frontend Setup

```sh
cd frontend
npm install
npm run dev
```

### ⚙️ Backend Setup

```sh
cd backend
npm install
npm start
```

### 🎯 Environment Variables

Create a `.env` file in the **backend** directory with the following:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

## Usage

Include screenshots where necessary.

## Credentials

Provide user credentials for authenticated pages if needed.

## API Endpoints

In case of Backend Applications, here is a list of API endpoints available:

### Users
- `GET /user` - Retrieve user data

### Campaigns
- `GET /campaign` - Retrieve all campaigns

## Technology Stack

- **Frontend:** React (Vite), Tailwind CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB & Mongoose
- **Other Libraries:** Axios, Redux (if used)

## 👥 Contributors

- **Nilesh Yadav** - [GitHub](https://github.com/nileshyadav6702/launchfund)

## 📜 License

This project is open-source under the MIT License.

