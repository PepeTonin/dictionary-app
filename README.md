# Dictionary App

Mobile app to explore English words, meanings and pronunciation, with authentication, favorites, history and smart caching.

> This is a challenge by [Coodesh](https://coodesh.com/)

---

## 📄 Technical decisions and development process:

See the full document here:  
**[docs/TECH_DECISIONS.md](./docs/TECH_DECISIONS.md)**

---

## Table of Contents

- [✨ About the Project](#-about-the-project)
- [📱 Features](#-features)
- [🔐 Authentication & Data Rules](#-authentication--data-rules)
- [💾 Caching Strategy](#-caching-strategy)
- [🏗️ Architecture & Technical Decisions](#️-architecture--technical-decisions)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Setup & Running the App](#-setup--running-the-app)
- [📁 Project Structure](#-project-structure)
- [🧪 Testing Strategy](#-testing-strategy-wip)
- [👨‍💻 Author](#-author)

---

## ✨ About the Project

The app consumes the **Free Dictionary API** and delivers a performant mobile experience to browse English words, listen to pronunciation, and manage favorites and history.

A big technical challenge of this project was handling a **large word dataset efficiently on mobile**, avoiding memory issues and bundle size growth.

Main goals:

- Clean and scalable architecture
- Performance and data loading strategy
- Good mobile UX
- Automated testing

---

## 📱 Features

### Mandatory Features

- Infinite scroll list of English words
- Word details screen
- Add word to favorites
- Remove word from favorites
- History of viewed words
- Cached API requests

### Bonus Features Implemented

- 🔊 Native audio pronunciation (Expo Audio)
- 🔐 Authentication (Supabase Auth)
- ☁️ Cloud persistence (Supabase DB)
- 🧪 Tests (Jest / Testing Library)
- 💾 Local persistence for history

---

## 🔐 Authentication & Data Rules

### Word list

Accessible with or without login.

### History

Stored in two places:

- Locally → MMKV
- Remotely → Supabase

When user logs in:

- Local history is **merged with server history**
- Ordered by last viewed date

### Favorites

- Available **only for authenticated users**
- Stored in Supabase

---

## 💾 Caching Strategy

React Query is configured globally with:

- `staleTime: 10 minutes`
- `cacheTime: 10 minutes`

Screens like **Favorites** and **History** refetch when focused to ensure data freshness.

Benefits:

- Reduced API calls
- Fast navigation
- Fresh data when returning to screens

---

## 🏗️ Architecture & Technical Decisions

The project follows **Clean Architecture concepts**.

### Presentation Layer

- Expo Router (file-based routing)
- Screens
- Reusable components

### State & Business Logic

- Zustand → global state
- React Query → server state
- Custom hooks → orchestration

### Data Layer

- Axios → API requests
- Supabase → database + authentication
- MMKV → local storage

---

## 🛠️ Tech Stack

### Core

- React Native
- Expo
- TypeScript

### Navigation

- Expo Router

### State & Data Fetching

- Zustand
- TanStack React Query

### Backend & Storage

- Supabase (Database + Auth)
- React Native MMKV

### Networking

- Axios
- Free Dictionary API

### Expo APIs

- Expo Audio

### Testing & Code Quality

- Jest
- React Native Testing Library
- ESLint
- Prettier

---

## 🚀 Setup & Running the App

### 1 — Clone and install

```bash
git clone https://github.com/PepeTonin/dictionary-app.git
cd dictionary-app
npm install
```

---

### 2 — Environment variables

Create a `.env` file in the project root:

```
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
EXPO_PUBLIC_DICTIONARY_API_URL=
```

These variables are required by the app and are typed in the project as:

```ts
declare namespace NodeJS {
  interface ProcessEnv {
    EXPO_PUBLIC_SUPABASE_URL: string;
    EXPO_PUBLIC_SUPABASE_ANON_KEY: string;
    EXPO_PUBLIC_DICTIONARY_API_URL: string;
  }
}
```

To obtain the Supabase credentials, follow the setup guide:
📄 **[docs/SUPABASE.md](./docs/SUPABASE.md)**

---

### 3 — Run the project

```bash
npm run start
npm run android
npm run ios
npm run web
```

---

## 📁 Project Structure

```
root
 ├── app/                     → Expo Router entrypoint and file-based routes
 │
 └── src/
     ├── components/          → Reusable UI components
     │    ├── common/         → Generic shared components (buttons, inputs, etc.)
     │    └── scoped/         → Components scoped to specific screens/features
     │
     ├── constants/           → App reusable constants
     │
     ├── hooks/               → Custom hooks containing business logic
     │
     ├── screens/             → Screen implementations and UI composition
     │
     ├── services/            → External integrations and data access layer
     │    ├── api/            → HTTP clients and dictionary API requests
     │    ├── supabase/       → Supabase client and database/auth operations
     │    └── storage/        → Local persistence (MMKV) abstractions
     │
     ├── stores/              → Global client state (Zustand stores)
     │
     ├── types/               → Global TypeScript types and interfaces
     │
     └── utils/               → Pure utility functions (formatters, helpers)
```

---

## 🧪 Testing Strategy (WIP)

Tests are colocated with the code

Examples:

- `utils/__tests__`
- `components/JustOneComponent/__test__`

---

## 👨‍💻 Author

Developed by **Pedro Tonin**
