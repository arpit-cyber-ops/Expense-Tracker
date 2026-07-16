# Expense Tracker

A full-stack expense tracking application built with **Next.js**, **TypeScript**, **Prisma ORM**, **PostgreSQL**, and **Clerk Authentication**.

I built this project to learn how authentication works in a real application and how to connect a React frontend with a database using Next.js API routes and Prisma. Unlike my previous project, this one stores user-specific data, meaning every user can only access and manage their own expenses.

This project also gave me experience deploying a full-stack application using Vercel and working with a cloud-hosted PostgreSQL database.

## Live Demo

🔗 https://expense-tracker-mu-one-66.vercel.app

## Features

- 🔐 User authentication with Clerk
- 👤 User-specific expense management
- ➕ Add new expenses
- ✏️ Edit existing expenses
- 🗑️ Delete expenses
- 📂 Filter expenses by category
- 💰 Automatic total expense calculation
- 📅 Transaction history with dates
- ⏳ Loading and saving states
- 📱 Responsive design

## Tech Stack

### Frontend

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4

### Backend

- Next.js Route Handlers
- Prisma ORM
- PostgreSQL (Neon)
- Clerk Authentication

## Screenshots

### Dashboard

![Dashboard](./public/screenshots/dashboard.png)

### Sign In

![Sign In](./public/screenshots/sign-in.png)

## Getting Started

### Clone the repository

```bash
git clone https://github.com/arpit-cyber-ops/Expense-Tracker.git
cd Expense-Tracker
```

### Install dependencies

```bash
npm install
```

### Create environment variables

Create a `.env` file:

```env
DATABASE_URL=
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
```

### Generate the Prisma Client

```bash
npx prisma generate
```

### Run database migrations

```bash
npx prisma migrate dev
```

### Start the development server

```bash
npm run dev
```

## What I Learned

Some of the things I learned while building this project:

- Authentication vs. authorization
- Protecting API routes with Clerk
- Storing user-specific data using Prisma
- Building CRUD APIs with Next.js Route Handlers
- Managing state across multiple React components
- Connecting a Next.js application to a PostgreSQL database
- Deploying a full-stack application to Vercel
- Debugging production build issues and configuring environment variables

Compared to my first project, I spent more time thinking about project structure, code organization, and how different parts of the application communicate with each other.

## License

This project is licensed under the MIT License.