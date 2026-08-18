<div align="center">

#  PRAXIS
**The Cognitive Operating System for High-Performers**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![Groq](https://img.shields.io/badge/Groq_AI-Fast_Inference-f55036?style=for-the-badge)](https://groq.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Most productivity apps treat all time as equal. That is a flaw.

**Praxis** is an advanced time-blocking, Pomodoro execution, and AI-powered habit telemetry platform wrapped in a premium, dark-luxury interface. Built for deep work, designed for discipline.

[**📚 Documentation**](#getting-started) · [**🐛 Report Bug**](https://github.com/gangasingh007/Praxis/issues) · [**💡 Request Feature**](https://github.com/gangasingh007/Praxis/issues)

</div>

---

## Table of Contents
- [Why Praxis?](#why-praxis)
- [Core Features](#-core-protocols-features)
- [Tech Stack](#-system-architecture)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#-file-structure-overview)
- [Configuration](#configuration-reference)
- [API & Usage](#api--usage)
- [Development](#development)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)
- [License](#license)

---

## Why Praxis?

Traditional productivity tools are built on a flawed premise: **all time is created equal**. They treat your 3 AM as equivalent to your peak focus hours at 10 AM. Praxis rejects this.

Praxis understands that:
- **Time-blocking is non-negotiable** for deep work execution
- **Focus is a finite resource** — protect it with a tactical Pomodoro timer
- **Habits compound** — track streaks, get AI-powered encouragement, and watch behavior transform
- **Data reveals patterns** — your telemetry dashboard shows where your deep work actually happens

Whether you're a software engineer, researcher, executive, or creative professional, Praxis is engineered for the cognitive demands of high-performance work.

---

## 🗃️ System Architecture

Praxis is built to handle complex state management and lightning-fast AI inference without compromising on a premium, hardware-adjacent aesthetic.

### 🖥️ Frontend Stack
* **Framework:** Next.js 14 (App Router with Server Actions)
* **Language:** TypeScript 5.x
* **Styling:** Tailwind CSS + custom CSS variables for dark-luxury gradients
* **UI Components:** Shadcn UI (Zinc/Slate design system)
* **Notifications:** Sonner (elegant, highly customizable toasts)
* **Animations:** Framer Motion & GSAP (ScrollTrigger for telemetry visualization)
* **State Management:** Zustand (lightweight, decoupled Pomodoro timer persistence)
* **Drag & Drop:** `@dnd-kit/core` (modern, accessible drag-and-drop engine)

### ⚙️ Backend & Data Stack
* **Database:** PostgreSQL (primary data store)
* **ORM:** Prisma (type-safe database queries with auto-migrations)
* **Authentication:** Clerk (passwordless auth with social login)
* **AI Inference:** Groq API SDK (LLaMA-3 for ultra-low-latency habit rewards)
* **Analytics & Visualization:** Recharts (responsive, performant charts)

### Why This Stack?
- **Type Safety:** TypeScript + Prisma eliminate entire classes of runtime errors
- **Performance:** Groq's inference is 10x faster than standard LLMs (zero-latency habit feedback)
- **Developer Experience:** Next.js 14 Server Actions replace REST APIs; less boilerplate, fewer bugs
- **Scalability:** PostgreSQL + Prisma handle complex time-series queries efficiently

---

## 🚀 Core Features

## 🚀 Core Features

### 01_ Dynamic Planner
The operational core of Praxis. Stop treating tasks like a flat checklist.

**What it does:** Map unassigned tasks directly into specific time blocks on your daily timeline using an intuitive drag-and-drop interface powered by `@dnd-kit/core`. 

**Why it matters:** 
- Visual time-blocking prevents double-booking and context-switching costs
- Estimated task durations show capacity constraints upfront
- Color-coded priority/category system helps identify focus vs. admin work
- Real-time timeline updates keep your day synchronized across devices

### 02_ Deep Focus Execution
A decoupled Pomodoro timer engineered for distraction-free work sessions.

**What it does:** 
- Glowing SVG progress ring with tactical HUD (persists across navigation)
- Zustand-managed timer state syncs with your browser's session
- Configurable work/rest intervals (default: 25/5 Pomodoro)
- Auto-start next session or break without leaving your current task

**Why it matters:**
- Persistent timer means you won't lose focus flow when switching contexts
- Pomodoro intervals train attention span and prevent burnout
- Audio cues (optional) gently alert you when intervals complete

### 03_ The Habit Protocol
Engineered consistency through behavioral tracking and AI-powered reinforcement.

**What it does:**
- Track daily habits with streak counters (consecutive days completed)
- Upon completion, trigger Groq API calls for instant, context-aware AI rewards
- Cyberpunk-themed motivational messages generated based on your streak
- Historical habit data drives behavioral insights

**Why it matters:**
- Habits compound: 1% daily improvement → 37x better in a year
- Streak psychology is powerful (don't break the chain)
- AI rewards are personalized, never repetitive, always encouraging
- Habit data feeds directly into your Neural Insights dashboard

### 04_ Neural Insights (Telemetry Dashboard)
A data-driven view into where your deep work actually happens.

**What it does:**
- Time-series charts showing focus hours per day/week/month
- Subject/topic distribution (how much time on engineering vs. meetings?)
- Performance metrics: average task completion time, session streaks
- Identify patterns: "I'm most focused at 9-11 AM on Tuesdays"

**Why it matters:**
- Most people guess about their productivity; Praxis shows facts
- Pattern recognition enables strategic scheduling of deep work
- Catch performance leaks early (e.g., "I lost 3 focus hours to meetings this week")

---

## Prerequisites

Before starting, ensure you have:

- **Node.js** 18+ or **Bun** 1.x (highly recommended for speed)
- **PostgreSQL** 14+ (local or remote instance, e.g., Supabase, Neon, Railway)
- **Git** for cloning the repository
- API keys for:
  - **Clerk** (authentication) — [Sign up free](https://clerk.com)
  - **Groq** (AI inference) — [Sign up free](https://console.groq.com)

Optional but recommended:
- **Docker** (for PostgreSQL if you don't have it installed)
- A code editor (VS Code recommended)

---

## Getting Started

### Quick Start (5 minutes)

#### 1. Clone the Repository
```bash
git clone https://github.com/gangasingh007/Praxis.git
cd Praxis
```

#### 2. Install Dependencies
Using **Bun** (recommended for speed):
```bash
bun install
```

Or using **npm/yarn**:
```bash
npm install
# or
yarn install
```

#### 3. Set Up Environment Variables
Create a `.env.local` file in the root directory:
```env
# ============================================
# Database (PostgreSQL required)
# ============================================
DATABASE_URL="postgresql://user:password@localhost:5432/praxis_db"

# ============================================
# Clerk Authentication
# Get these from: https://dashboard.clerk.com
# ============================================
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# ============================================
# Groq AI (for habit rewards)
# Get your API key: https://console.groq.com
# ============================================
GROQ_API_KEY="gsk_..."
```

**Environment Variable Guide:**
- `DATABASE_URL`: Connection string to PostgreSQL. Use `postgresql://localhost/praxis_db` for local development
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Public key (safe to expose in frontend)
- `CLERK_SECRET_KEY`: Secret key (backend only, never commit)
- `GROQ_API_KEY`: API key for Groq (keep secure)

#### 4. Set Up the Database
```bash
# Create database schema and run migrations
bunx prisma migrate deploy

# Optional: seed with sample data
bunx prisma db seed
```

#### 5. Start the Development Server
```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the landing page.

#### 6. Create Your First Account
Click "Sign Up" and authenticate via Clerk. You'll be redirected to the dashboard.

---

## Configuration Reference

### Environment Variables Explained

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | ✅ Yes | PostgreSQL connection string | `postgresql://user:pass@localhost/praxis` |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | ✅ Yes | Clerk public key (frontend) | `pk_test_abc123...` |
| `CLERK_SECRET_KEY` | ✅ Yes | Clerk secret key (backend only) | `sk_test_abc123...` |
| `GROQ_API_KEY` | ✅ Yes | Groq API key for AI rewards | `gsk_abc123...` |

### Database Setup Options

**Local PostgreSQL:**
```bash
# macOS with Homebrew
brew install postgresql@15
brew services start postgresql@15

# Linux (Ubuntu/Debian)
sudo apt-get install postgresql postgresql-contrib
sudo service postgresql start

# Windows
# Download from: https://www.postgresql.org/download/windows/
```

**Cloud Databases (Recommended):**
- **Supabase** (PostgreSQL + Auth): [supabase.com](https://supabase.com)
- **Neon** (Serverless PostgreSQL): [neon.tech](https://neon.tech)
- **Railway** (Simple deployment): [railway.app](https://railway.app)

---

## API & Usage

### Server Actions (Next.js)

Praxis uses Next.js Server Actions instead of REST APIs. All mutations are in `src/actions/`:

#### Creating a Task
```typescript
// src/actions/task-actions.ts
import { createTask } from '@/actions/task-actions';

const newTask = await createTask({
  title: 'Complete quarterly planning',
  description: 'Align Q2 goals with team',
  duration: 120, // minutes
  priority: 'high',
  dueDate: new Date('2026-05-20'),
});
```

#### Completing a Habit
```typescript
// src/actions/goal-actions.ts
import { completeHabit } from '@/actions/goal-actions';

const result = await completeHabit(habitId);
// Triggers Groq API call for AI reward
```

#### Fetching User Data
```typescript
// src/lib/prisma.ts
import { prisma } from '@/lib/prisma';

const tasks = await prisma.task.findMany({
  where: { userId: currentUser.id },
  orderBy: { createdAt: 'desc' },
  take: 10,
});
```

### React Hooks

#### usePomodoro
```typescript
import { usePomodoro } from '@/hooks/use-pomodoro';

export function FocusTimer() {
  const { timeLeft, isRunning, toggle } = usePomodoro();
  
  return (
    <div>
      <p>{timeLeft}s remaining</p>
      <button onClick={toggle}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
    </div>
  );
}
```

#### useTasks
```typescript
import { useTasks } from '@/hooks/use-tasks';

export function TaskBoard() {
  const { tasks, createTask, completeTask } = useTasks();
  // Your component logic
}
```

---

## 📂 Project Structure

```
Praxis/
├── src/
│   ├── actions/                    # Next.js Server Actions
│   │   ├── ai-actions.ts          # Groq API integration (habit rewards)
│   │   ├── auth-actions.ts        # Clerk-related mutations
│   │   ├── goal-actions.ts        # Goal/habit CRUD
│   │   └── task-actions.ts        # Task CRUD & time-blocking
│   │
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx             # Root layout with Clerk provider
│   │   ├── page.tsx               # Landing page
│   │   ├── (auth)/                # Public auth routes
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (dashboard)/           # Protected dashboard routes
│   │   │   ├── planner/           # Time-blocking interface
│   │   │   ├── focus/             # Pomodoro timer
│   │   │   ├── habits/            # Habit tracking
│   │   │   └── insights/          # Telemetry dashboard
│   │   ├── (public)/              # Public pages (docs, etc.)
│   │   └── docs/                  # Documentation pages (GSAP + Recharts)
│   │
│   ├── components/
│   │   ├── auth/                  # Profile, settings, user menu
│   │   ├── planner/               # DnD calendar, task cards, timeline
│   │   ├── pomodoro/              # Focus timer with HUD
│   │   ├── habits/                # Habit cards, streak counters
│   │   ├── insights/              # Charts, analytics visualizations
│   │   ├── landing/               # Hero, features, testimonials
│   │   ├── docs/                  # Documentation components
│   │   ├── ui/                    # Shadcn UI primitives
│   │   └── shared/                # Reusable utilities (sidebars, etc.)
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── use-pomodoro.ts        # Timer state & persistence
│   │   ├── use-tasks.ts           # Task management logic
│   │   ├── use-sidebar.ts         # Sidebar state
│   │   └── use-mobile.ts          # Mobile detection
│   │
│   ├── lib/
│   │   ├── auth.ts                # Clerk helper functions
│   │   ├── prisma.ts              # Prisma client singleton
│   │   ├── utils.ts               # General utilities (cn, etc.)
│   │   └── planner-utils.ts       # Time-blocking calculations
│   │
│   └── types/
│       └── index.ts               # TypeScript interfaces (Task, Goal, User)
│
├── prisma/
│   ├── schema.prisma              # Data model (Clerk integration)
│   └── migrations/                # Versioned schema changes
│
├── public/                        # Static assets (favicon, og-image)
├── .env.local                     # Environment variables (gitignored)
├── next.config.ts                 # Next.js configuration
├── tsconfig.json                  # TypeScript configuration
├── tailwind.config.ts             # Tailwind + dark-luxury theme
├── components.json                # Shadcn UI config
└── package.json                   # Dependencies & scripts
```

---

## Development

### Scripts

```bash
# Start development server with hot reload
bun run dev

# Build for production
bun run build

# Start production server
bun run start

# Run Prisma Studio (visual database editor)
bunx prisma studio

# Create a new migration (after schema changes)
bunx prisma migrate dev --name description_of_change

# Format code with Prettier
bun run format

# Lint with ESLint
bun run lint

# Type-check TypeScript without building
bun run type-check
```

### Database Migrations

When you modify `prisma/schema.prisma`:

```bash
# Create a new migration file
bunx prisma migrate dev --name your_migration_name

# View migration status
bunx prisma migrate status

# Reset database (development only!)
bunx prisma migrate reset
```

### Clerk Authentication

Praxis uses **Clerk** for passwordless authentication:

1. **Sign up** at [clerk.com](https://clerk.com)
2. **Create a new application**
3. **Copy keys** to `.env.local`
4. Clerk automatically syncs user data to your Prisma User model

No need to manage passwords, JWT tokens, or session logic—Clerk handles it all.

### Adding New Features

#### New Server Action
```typescript
// src/actions/my-actions.ts
'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function myAction(input: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  return prisma.someModel.create({
    data: { userId, title: input },
  });
}
```

#### New React Hook
```typescript
// src/hooks/use-my-feature.ts
'use client';

import { useState } from 'react';

export function useMyFeature() {
  const [state, setState] = useState(null);
  
  return { state, setState };
}
```

---

## Troubleshooting

### Common Issues & Solutions

#### "connection refused" / Cannot connect to PostgreSQL
```bash
# Check if PostgreSQL is running
# macOS
brew services list

# Linux
sudo systemctl status postgresql

# Windows
# Open Services app, check PostgreSQL status

# Or use Railway.app for zero-setup PostgreSQL
```

#### "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is missing"
```bash
# Ensure .env.local exists in root directory
# Restart dev server after adding variables
bun run dev
```

#### "Prisma schema out of sync with database"
```bash
# Reset and re-apply migrations (dev only)
bunx prisma migrate reset

# Or manually update schema
bunx prisma migrate dev --name fix_schema
```

#### Pomodoro timer not persisting
- Ensure Zustand is installed: `bun install zustand`
- Check browser DevTools → Application → Local Storage for `pomodoro-store`
- Clear browser cache if needed

#### Groq API returns 401 (Unauthorized)
- Verify `GROQ_API_KEY` is correct in `.env.local`
- Log in to [console.groq.com](https://console.groq.com) and regenerate key if needed
- Restart dev server after updating API key

#### "Habit rewards endpoint returns 500 error"
- Check Groq API quota (free tier has limits)
- Verify GPT-OSS model is available in your region
- Check server logs: `bun run dev` will show detailed errors

---

## Roadmap

### ✅ Current (v0.1.0)
- [x] Time-blocking planner with drag-and-drop
- [x] Pomodoro timer with persistence
- [x] Habit tracking with streak counters
- [x] AI-powered habit rewards (Groq)
- [x] Telemetry dashboard (Recharts)
- [x] Dark luxury UI (Tailwind + custom CSS)

### 🔄 Planned (v0.2.0)
- [ ] Goal setting with milestone tracking
- [ ] Weekly & monthly review protocols
- [ ] Focus hour optimization (identify peak times)
- [ ] Calendar sync (Google Calendar, Apple Calendar)
- [ ] Mobile app (React Native)
- [ ] Team collaboration mode
- [ ] Focus session analytics (where deep work happens)

### 🚀 Future (v0.3.0+)
- [ ] Voice-guided focus sessions (audio cues)
- [ ] Integration with popular tools (Slack, Notion, Linear)
- [ ] Advanced time-series forecasting (predict burnout)
- [ ] AR/VR focus mode (immersive deep work)
- [ ] Blockchain-based habit NFT badges

---

## 🛡️ Security & Privacy

**Data Sovereignty:**
- All data is stored in your PostgreSQL instance (self-hosted or managed cloud)
- Clerk handles authentication securely (no passwords stored)
- Prisma ensures safe queries (SQL injection prevention)
- Environment variables keep API keys secure

**No Telemetry:**
- Praxis does not track user behavior outside your instance
- No third-party analytics (except Clerk for auth metrics)
- Your habits, goals, and schedule stay private

---

## Contributing

Contributions are welcome! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes** and test locally
4. **Commit with clear messages** (`git commit -m 'Add amazing feature'`)
5. **Push to your branch** (`git push origin feature/amazing-feature`)
6. **Open a Pull Request** with a detailed description

---

## License

Praxis is released under the **MIT License**. See [LICENSE](LICENSE) for details.
