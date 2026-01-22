# Match404 - Frontend Client

Modern, responsive frontend application for the Match404 matching platform. Built with Vite, React, TypeScript and Tailwind CSS for a type-safe user experience.

**[Link to Match404 - Server](https://github.com/nikhil-rawal/server-match404)**

## Tech Stack

- **Build Tool:** Vite 5
- **Framework:** React 19
- **Language:** TypeScript 5
- **Routing:** React Router 6
- **Styling:** Tailwind CSS 4 + DaisyUI 5.5
- **State Management:** Zustand 5.0
- **Linting:** ESLint 9

## Features

- **Modern UI/UX:** Clean, responsive design with DaisyUI components
- **Type Safety:** Full TypeScript implementation for robust code
- **Fast Development:** Vite's lightning-fast HMR (Hot Module Replacement)
- **Global State:** Lightweight state management with Zustand
- **Client-Side Routing:** React Router for seamless navigation
- **Optimized Builds:** Vite's optimized production builds

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Pages & Routes

### Public Routes
- `/` - Landing page
- `/login` - User login
- `/signup` - User registration

### Protected Routes (Authenticated)
- `/user/feed` - Browse and discover matches
- `/profile/user` - View user profile
- `/profile/update` - Update user profile
- `/profile/change-password` - Change password
- `/user/requests/sent` - View sent connection requests
- `/user/requests/received` - View received connection requests
- `/user/requests/connections` - View all connections
