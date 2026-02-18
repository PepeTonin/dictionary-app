# Dictionary App

Mobile app to explore English words, meanings and pronunciation, with authentication, favorites, history and smart caching.

> This is a challenge by [Coodesh](https://coodesh.com/)

---

## ✨ About the Project

The app consumes the **Free Dictionary API** and provides a performant experience to browse English words, listen to pronunciation and manage favorites and history.

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

# 🧪 Development Process & Technical Decisions

This section documents the main decisions and trade-offs made during development.

---

## 📚 Decision 1 — Where should the word dataset live?

The English words dataset contains **hundreds of thousands of entries**.

Initial options considered:

| Option                                     | Pros                                               | Cons                                                 |
| ------------------------------------------ | -------------------------------------------------- | ---------------------------------------------------- |
| Bundle dataset inside app                  | Works offline                                      | Huge bundle size, memory spikes on Android           |
| Import dataset locally on first launch     | Smaller bundle                                     | Still requires loading a very large file into memory |
| Remote dataset (BFF / Firebase / Supabase) | Scalable, paginated, realistic production approach | Requires backend                                     |

### Final decision → **Remote dataset (Supabase)**

Reason:

I previously experienced **Android production issues when loading large datasets into memory**.
To avoid memory spikes and bundle growth, I chose a remote solution.

---

## ☁️ Decision 2 — Backend choice

Options considered:

- Simple BFF
- Firebase
- Supabase

### Final decision → **Supabase**

Reasons:

- Familiarity with the platform
- Easy database management
- Built-in authentication
- Simple queries and pagination
- Faster setup for a challenge context

---

## 🔐 Decision 3 — Should I build a BFF to protect the API key?

I considered creating a **Backend For Frontend (BFF)** to avoid exposing Supabase credentials in the mobile app.

### Options considered

| Option                      | Pros                 | Cons                                  |
| --------------------------- | -------------------- | ------------------------------------- |
| Build BFF to proxy requests | Extra security layer | Extra infrastructure and complexity   |
| Use Supabase anon key + RLS | Simpler architecture | Requires correct policy configuration |

### Final decision → **Use Supabase directly**

Supabase provides:

- Public **anon key** designed for client usage
- **Row Level Security (RLS)** policies
- Fine-grained access control

These features already provide strong security guarantees, making a BFF unnecessary for this challenge and avoiding extra complexity.

---

## 🗄️ Decision 4 — Preparing the dataset

The dataset from GitHub was provided as JSON.

Steps performed:

1. Converted JSON → CSV using a Node.js script
2. Attempted direct import → dataset too large
3. Split dataset into chunks
4. Imported chunks individually via Supabase dashboard
   _(considered using psql COPY but not necessary here)_

### Result

- Paginated queries
- No large files inside the app bundle
- Realistic production-like architecture

---

## ⚡ Decision 5 — Caching strategy

Two possible approaches:

| Option                     | Description                                    |
| -------------------------- | ---------------------------------------------- |
| Zustand + MMKV persistence | Manual caching and invalidation                |
| TanStack React Query       | Built-in caching, retry, refetch, invalidation |

### Final decision → **React Query**

Reasons:

- Built-in caching
- Retry and error handling
- Query invalidation
- Refetch on focus
- Production-ready patterns

Configs:

- `staleTime: 10 minutes`
- `cacheTime: 10 minutes`
- Refetch on screen focus (Favorites & History)

---

## 📜 Decision 6 — Large list rendering

Considered using **FlashList**.

Why FlashList was NOT used:

- App does not render images
- No heavy animations
- No complex state changes per item
- FlatList already provides good performance for this use case

Decision:

Use **FlatList** to avoid adding unnecessary dependencies.

---

## 🧩 Decision 7 — Different persistence strategies by feature

The data persistence rules were intentionally designed to demonstrate different access levels and real-world scenarios.

| Feature   | Requires Login | Local Storage | Remote Storage |
| --------- | -------------- | ------------- | -------------- |
| Word list | ❌ No          | ❌ No         | ✅ Yes         |
| History   | ❌ Optional    | ✅ Yes        | ✅ Yes         |
| Favorites | ✅ Yes         | ❌ No         | ✅ Yes         |

This design was intentional to demonstrate the ability to:

- Handle authenticated vs public features
- Merge local and remote data
- Implement different access rules per feature
- Simulate real production scenarios

> This decision was not only about app functionality, but also about showcasing flexibility in designing scalable solutions.

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

## 📦 Installation

```bash
git clone https://github.com/PepeTonin/dictionary-app.git
cd dictionary-app
npm install
```

---

## ▶️ Running the App

```bash
npm run start
npm run android
npm run ios
npm run web
npm test
```

---

## 📁 Project Structure

```
root
 ├── app/                     → Expo Router routes
 └── src/
     ├── components/
     │    ├── common/
     │    └── scoped/
     ├── constants/
     ├── hooks/
     ├── screens/
     ├── services/
     │    ├── api/
     │    ├── supabase/
     │    └── storage/
     ├── stores/
     ├── types/
     └── utils/
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
