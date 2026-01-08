# React Vite Frontend

## Project Overview

This is a **React Vite frontend application** for managing tasks and projects. It provides features such as:

- CRUD operations for tasks and projects
- Task filtering by status and project
- Pagination support
- Integration with a Laravel API backend
- Responsive UI using Tailwind CSS
- React Router for navigation

## Tech Stack

- **Frontend:** React.js + Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **State Management:** React `useState` & `useEffect`
- **Build Tool:** Vite
- **Package Manager:** npm / yarn

## Project Structure

```
src/
├─ assets/            # Images, icons, and other static assets
├─                    # Reusable React components
│  ├─ TaskForm.jsx
│  ├─ EditTask.jsx
│  ├─ TaskList.jsx
│  ├─ ProjectForm.jsx
│  └─ ProjectList.jsx
├─ App.jsx            # Main app entry
├─ main.jsx           # React DOM render
└─ index.css          # Tailwind styles
```

## Getting Started

### Prerequisites

- Node.js v18+
- npm v9+ or yarn v3+
- Backend API running (Laravel)

### Installation

```bash
git clone https://github.com/navdeeppathan/laravel_assignment_frontend_reactjs.git
cd project name
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

## API Integration

**Base URL:** `http://127.0.0.1:8000/api`

**Endpoints:**

- `GET /tasks` → List tasks (with filters & pagination)
- `GET /tasks/{id}` → Get single task
- `POST /tasks` → Create task
- `PUT /tasks/{id}` → Update task
- `DELETE /tasks/{id}` → Delete task
- `GET /projects` → List projects
- `POST /projects` → Create project

## Styling

- Tailwind CSS is used for responsive and modern UI
- Components are styled using utility-first classes
- Responsive breakpoints included for mobile, tablet, and desktop

## Features

### Task Management

- Create, read, update, delete tasks
- Update task status inline
- Filter by project or status
- Search by task title

### Project Management
