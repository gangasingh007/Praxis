<div align="center">

# ⚡️ PRAXIS
**The Cognitive Operating System for High-Performers**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![Groq](https://img.shields.io/badge/Groq_AI-Fast_Inference-f55036?style=for-the-badge)](https://groq.com/)

Most productivity apps treat all time as equal. That is a flaw.<br>
Praxis is an advanced time-blocking, Pomodoro execution, and AI habit telemetry platform wrapped in a dark luxury UI.

[View Demo](#) · [Report Bug](#) · [Request Feature](#)

</div>

---

## 🗃️ System Architecture

Praxis is built to handle complex state management and lightning-fast AI inference without compromising on a premium, hardware-adjacent aesthetic.

### 🖥️ Frontend
* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS + custom CSS variables for dark-luxury gradients
* **UI Components:** Shadcn UI (Zinc/Slate base)
* **Notifications:** Sonner (elegant, highly customizable toasts)
* **Animations:** Framer Motion & GSAP (ScrollTrigger for telemetry docs)
* **State Management:** Zustand (for decoupled Pomodoro timer persistence)
* **Drag & Drop:** `@dnd-kit/core`

### ⚙️ Backend & Data
* **Database:** PostgreSQL
* **ORM:** Prisma
* **Authentication:** Clerk
* **AI Telemetry:** Groq API SDK (LLaMA-3 for zero-latency habit rewards)
* **Analytics:** Recharts

---

## 🚀 Core Protocols (Features)

### 01_ Dynamic Planner
The core engine. Stop treating tasks like a checklist. Praxis uses an intuitive drag-and-drop interface (`@dnd-kit`) to map unassigned tasks directly into specific time blocks on your daily timeline. 

### 02_ Deep Focus Execution
A decoupled Pomodoro timer built with Zustand and animated via Framer Motion. Features a glowing SVG progress ring and a tactical HUD that persists even as you navigate through different routes in the application.

### 03_ The Habit Protocol
Engineered consistency. Track high-impact daily behaviors. Upon completion, Praxis triggers a server action to the Groq API, instantly generating context-aware, cyberpunk-themed AI rewards and motivation based on your current streak.

### 04_ Neural Insights
A telemetry dashboard utilizing Recharts to map your focus hours, subject distribution, and performance leaks over time. Identify patterns in your deep work execution.

---

## 🛠️ Initialization (Local Setup)

To spin up the Praxis environment locally, ensure you have [Bun](https://bun.sh/) installed for optimal package execution.

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/praxis.git
cd praxis
```

### 2. Install dependencies
```bash
bun install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add your secure keys:
```env
# Database (PostgreSQL / Supabase / Neon)
DATABASE_URL="postgresql://user:password@localhost:5432/praxis"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# Groq AI
GROQ_API_KEY="gsk_..."
```

### 4. Provision the Database
Push the Prisma schema to your PostgreSQL instance:
```bash
bunx prisma db push
```

### 5. Execute the System
```bash
bun run dev
```
Navigate to `http://localhost:3000` to access the Praxis terminal.

---

## 📂 File Structure Overview

```text
src/
├── actions/             # Next.js Server Actions (Database mutations, Groq AI calls)
├── app/                 # App Router (Pages, Layouts, Auth Routes)
│   ├── (dashboard)/     # Protected application routes (Planner, Focus, Habits, Insights)
├── components/          # Reusable UI & Protocol components
│   ├── ui/              # Shadcn primitives
│   ├── planner/         # Drag-and-drop calendar modules
│   ├── pomodoro/        # Zustand-powered focus timer
├── hooks/               # Custom React hooks (usePomodoro)
├── lib/                 # Utility functions (Prisma client, cn merge)
└── prisma/              # Schema and migrations
```

---

## 🛡️ Data Sovereignty 
Praxis relies on Clerk for secure authentication and Prisma for safe data querying. Your schedule, habits, and telemetry remain strictly under your authorization.

<div align="center">
  <br>
  <p className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-[0.4em]">
    Praxis OS v0.1.0 /// Authored for the High-Performer
  </p>
</div>
