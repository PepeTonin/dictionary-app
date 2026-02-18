# Development Process & Technical Decisions

This section documents the main decisions and trade-offs made during development.

---

## Decision 1 — Where should the word dataset live?

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

## Decision 2 — Backend choice

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

## Decision 3 — Should I build a BFF to protect the API key?

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

## Decision 4 — Preparing the dataset

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

## Decision 5 — Caching strategy

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

## Decision 6 — Large list rendering

Considered using **FlashList**.

Why FlashList was NOT used:

- App does not render images
- No heavy animations
- No complex state changes per item
- FlatList already provides good performance for this use case

Decision:

Use **FlatList** to avoid adding unnecessary dependencies.

---

## Decision 7 — Different persistence strategies by feature

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

## Decision 8 — Responsiveness and Design Tokens

During development I intentionally **did not implement a responsive helper layer** or a **centralized design token file** (colors, spacing, typography).

### Why?

In real production apps, these are very important because they:

- Improve long-term maintainability
- Simplify design changes
- Help support multiple screen sizes and tablets

However, this project was developed under **challenge time constraints**.
To maximize evaluation impact, I chose to prioritize the features explicitly required by the challenge instead of investing time in infrastructure that was not part of the evaluation scope.

This was a conscious trade-off between **production best practices** and **challenge delivery focus**.

---

## Decision 9 — E2E Testing Strategy (Planned but not implemented)

End-to-end tests were **planned but not implemented** due to time constraints.

Since this was an optional requirement, I prioritized:

- Core features
- Architecture
- Performance decisions
- Unit and component testing foundations

### Planned approach

Because the project uses the **Expo ecosystem**, the idea was to:

1. Run the project in **web mode**
2. Use **Playwright** to automate the application
3. Test critical user flows

This approach would provide a **simple and effective E2E setup** without requiring a full mobile device testing infrastructure.

This would be the next natural step to evolve the project towards a production-ready testing strategy.
