# StaffSync - Modern Human Resource Management Solution

StaffSync is a full-stack MERN (MongoDB, Express, React, Node.js) human resource management application designed to automate workplace workflows, role-based access, attendance logs, and leave tracking.

## Features
- **Role-Based Access Control**: Portals and permissions for HR Admin, Department Managers, and Employees.
- **HR Portal**: Employee directory (CRUD operations), announcements broadcast, and workforce statistics.
- **Manager Portal**: Leave application reviews (Approve/Reject), attendance logs, and team training assignments.
- **Employee Portal**: Live attendance punch in/out, leave requests submission, company notice board, and training status.

## Project Structure
```
StaffSync-HRM/
├── server/          # Express.js REST API & MongoDB models
│   ├── models/      # Mongoose Schemas (User, Attendance, Leave, Announcement)
│   ├── routes/      # Express API endpoints
│   ├── middleware/  # JWT Auth & Role Authorization
│   ├── package.json
│   └── server.js
├── client/          # Frontend Web Application (React/Tailwind)
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## Quick Start Setup

### 1. Server Setup
```bash
cd server
npm install
npm run dev
```
Create a `.env` file inside `server/` with:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/staffsync
JWT_SECRET=supersecretjwtkey_staffsync
```

### 2. Client Setup
```bash
cd client
npm install
npm start
```
Frontend runs at `http://localhost:3000` and proxies requests to `http://localhost:5000`.
