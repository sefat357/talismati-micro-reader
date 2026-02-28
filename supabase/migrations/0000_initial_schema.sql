-- Users: one row per auth user, extends auth.users
CREATE TABLE "Users" (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  google_auth_token TEXT,
  target_chunk_size INT DEFAULT 15,
  notification_time TIME
);

-- Books: user's books (e.g. from Drive)
CREATE TABLE "Books" (
  book_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES "Users"(user_id) ON DELETE CASCADE,
  drive_file_id TEXT,
  title TEXT,
  author TEXT,
  cover_image_url TEXT
);

-- Reading_State: per-user, per-book reading position and status
CREATE TABLE "Reading_State" (
  state_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES "Users"(user_id) ON DELETE CASCADE,
  book_id UUID NOT NULL REFERENCES "Books"(book_id) ON DELETE CASCADE,
  current_cfi_index TEXT,
  status TEXT
);

-- Session_Logs: reading sessions for analytics
CREATE TABLE "Session_Logs" (
  session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES "Users"(user_id) ON DELETE CASCADE,
  book_id UUID NOT NULL REFERENCES "Books"(book_id) ON DELETE CASCADE,
  pages_read INT,
  time_spent_seconds INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common lookups by user_id and book_id
CREATE INDEX idx_books_user_id ON "Books"(user_id);
CREATE INDEX idx_reading_state_user_id ON "Reading_State"(user_id);
CREATE INDEX idx_reading_state_book_id ON "Reading_State"(book_id);
CREATE INDEX idx_session_logs_user_id ON "Session_Logs"(user_id);
CREATE INDEX idx_session_logs_book_id ON "Session_Logs"(book_id);

-- Enable Row Level Security on all tables
ALTER TABLE "Users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Books" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Reading_State" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Session_Logs" ENABLE ROW LEVEL SECURITY;

-- Users: users can only access their own row
CREATE POLICY "Users_select_own" ON "Users"
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users_insert_own" ON "Users"
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users_update_own" ON "Users"
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users_delete_own" ON "Users"
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Books: users can only access their own books
CREATE POLICY "Books_select_own" ON "Books"
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Books_insert_own" ON "Books"
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Books_update_own" ON "Books"
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Books_delete_own" ON "Books"
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Reading_State: users can only access their own reading state
CREATE POLICY "Reading_State_select_own" ON "Reading_State"
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Reading_State_insert_own" ON "Reading_State"
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Reading_State_update_own" ON "Reading_State"
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Reading_State_delete_own" ON "Reading_State"
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Session_Logs: users can only access their own session logs
CREATE POLICY "Session_Logs_select_own" ON "Session_Logs"
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Session_Logs_insert_own" ON "Session_Logs"
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Session_Logs_update_own" ON "Session_Logs"
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Session_Logs_delete_own" ON "Session_Logs"
  FOR DELETE TO authenticated USING (auth.uid() = user_id);
