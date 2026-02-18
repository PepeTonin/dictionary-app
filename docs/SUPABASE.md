# Supabase Setup Guide

This document explains how to create and configure the Supabase project required to run the app locally.

---

## 1 — Create a Supabase project

1. Go to https://supabase.com
2. Create an account (if needed)
3. Click **New Project**
4. Choose:
   - Organization
   - Project name
   - Database password
   - Region (any region is fine)

Wait until the project is ready.

---

## 2 — Get project credentials

Open the project dashboard:

Settings → API

Copy the following values:

- Project URL → `EXPO_PUBLIC_SUPABASE_URL`
- Anon public key → `EXPO_PUBLIC_SUPABASE_ANON_KEY`

Add them to your `.env` file in the root of the project.

---

## 3 — Configure the database

Open **SQL Editor** in the Supabase dashboard and run the following script:

```sql
CREATE TABLE words (
  id SERIAL PRIMARY KEY,
  word TEXT UNIQUE NOT NULL
);

CREATE INDEX idx_word_search ON words (word text_pattern_ops);
CREATE INDEX idx_word_alpha ON words (word);

CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  word TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, word)
);

CREATE INDEX idx_favorites_user ON favorites(user_id, created_at DESC);

CREATE TABLE history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  word TEXT NOT NULL,
  viewed_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, word)
);

CREATE INDEX idx_history_user ON history(user_id, viewed_at DESC);

ALTER TABLE words ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read words"
ON words FOR SELECT
USING (true);

CREATE POLICY "No one can insert words" ON words FOR INSERT WITH CHECK (false);

CREATE POLICY "No one can update words"
ON words FOR UPDATE
USING (false);

CREATE POLICY "No one can delete words"
ON words FOR DELETE
USING (false);

CREATE POLICY "Users can read own favorites"
ON favorites FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites"
ON favorites FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites"
ON favorites FOR DELETE
USING (auth.uid() = user_id);

CREATE POLICY "Users can read own history"
ON history FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own history"
ON history FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own history"
ON history FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own history"
ON history FOR DELETE
USING (auth.uid() = user_id);
```

---

## 4 — Import the words dataset

The application expects the `words` table to contain a large dataset of English words.

Steps used in this project:

1. Convert the JSON dataset to CSV
2. Split into smaller chunks
3. Import using the Supabase table editor or CSV import tool

Only the `word` column is required.

---

## 5 — Configure Email Authentication (SMTP)

To enable user signup and login via email, Supabase requires an SMTP provider.

For this project, the free tier of **Brevo** was used.

### 5.1 Create a Brevo account

1. Go to https://app.brevo.com/
2. Create a free account
3. Verify your email
4. Create an SMTP key:
   - Go to **Settings → SMTP & API**
   - Generate an **SMTP key**

You can use your personal Gmail as the sender address.

---

### 5.2 Configure SMTP in Supabase

In your Supabase dashboard go to:

**Authentication → Notifications → Email → SMTP Settings**

Enable **Custom SMTP** and fill with the Brevo credentials:

- SMTP Host: `smtp-relay.brevo.com`
- Port: `587`
- Username: your Brevo login email
- Password: the SMTP key generated in Brevo
- Sender email: your verified email (ex: Gmail)

Save the configuration.

---

After this setup, Supabase email authentication will work correctly for:

- Sign up
- Sign in
- Email verification
- Password recovery

---

## Setup complete 🎉

Your Supabase backend is now ready to run the app.
