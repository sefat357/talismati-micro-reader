# Tailsmati Micro-Reader: MVP Todo List

## Phase 1: Environment & Project Setup
- [ ] Initialize Next.js project with Tailwind CSS (`npx create-next-app@latest`).
- [ ] Set up the GitHub repository and link it to Vercel for continuous deployment.
- [ ] Create a new Supabase project.
- [ ] Ensure n8n is running locally (or via your cloud setup) and connected to Cursor via the MCP server.
- [ ] Set up `.env.local` with Supabase URL, Anon Key, and n8n webhook URLs.

## Phase 2: Database & Authentication (Supabase)
- [ ] **Configure Auth:** Set up Google OAuth provider in Supabase (requesting Google Drive read scopes).
- [ ] **Build Schema:** Execute SQL in Supabase to create the following tables:
  - [ ] `Users` (user_id, email, google_auth_token, target_chunk_size, notification_time)
  - [ ] `Books` (book_id, user_id, drive_file_id, title, author, cover_image_url)
  - [ ] `Reading_State` (state_id, user_id, book_id, current_cfi_index, status)
  - [ ] `Session_Logs` (session_id, user_id, book_id, pages_read, time_spent_seconds)
- [ ] Set up Row Level Security (RLS) policies so users can only read/write their own data.

## Phase 3: Backend Automation (n8n + Webhooks)
- [ ] **Workflow 1 (File Ingestion):** Create an n8n workflow triggered by an API call from Next.js to fetch a specific EPUB file from the user's Google Drive.
- [ ] **Workflow 2 (Progress Sync):** Create a webhook in n8n that receives the `Time Taken` and `New Read Index` from the React frontend and updates the Supabase `Reading_State` and `Session_Logs` tables.
- [ ] **Workflow 3 (Notifications):** Create a scheduled cron job in n8n that checks the `Users` table for `notification_time` and sends a daily reminder email/message.
- [ ] **Workflow 4 (Completion Log):** Add a branch to Workflow 2 to append data to a Google Sheet if the book's status is marked as 'COMPLETED'.

## Phase 4: Frontend UI (Next.js + Tailwind)
- [ ] **Public Pages:**
  - [ ] Build `LandingPage` with hero section and feature explanations.
  - [ ] Build `AuthPage` with Google Login button.
- [ ] **Dashboard Layout:**
  - [ ] Build `SidebarNavigation`.
  - [ ] Build `TopHeader` (User settings, chunk size config).
- [ ] **Home View:**
  - [ ] Build `CurrentlyReadingWidget` (Shows active book and progress).
  - [ ] Build `LibraryGrid` (Displays connected EPUBs from Drive).
- [ ] **Analytics View:**
  - [ ] Build `MetricCards` (Total chunks read, average speed).

## Phase 5: Core Application Logic (The Reader)
- [ ] Install an EPUB rendering library (e.g., `epubjs` or `react-reader`).
- [ ] Create the `ReaderInterface` component.
- [ ] **Logic:** Implement fetching the EPUB file blob via the n8n webhook/Google Drive API.
- [ ] **Logic:** Configure the EPUB renderer to start at the `current_cfi_index` pulled from Supabase.
- [ ] **Logic:** Implement pagination logic to limit reading to the user's `target_chunk_size` (e.g., stopping the user after 15 pages).
- [ ] **Logic:** Build the background timer to track session duration in seconds.
- [ ] **Logic:** Wire up the "Finish Chunk" button to push the session data and new CFI index to the n8n webhook.

## Phase 6: Testing & Launch
- [ ] Test end-to-end flow: Upload EPUB to Drive -> Sync to App -> Read 1 Chunk -> Verify Supabase updates -> Verify Google Sheet logging.
- [ ] Verify responsive design on mobile screens (since micro-reading often happens on phones).
- [ ] Deploy final frontend to Vercel.
- [ ] Activate all n8n production workflows.
