# 👾 Doceox
### ✨ Features:

- **Sm2 Algorithm For An Effective Learning**
- **Seamless Crypto-Validated Auth**
- **Native Telegram Stars Monetization**
- **FSD-Compliant Flat Routing**
- **Dynamic Contextual UI/UX Sync**
- **Haptic & Interface Acceleration**
- **Public And Private Decks & Sharing**
- **TWA Admin Panel**
- **Streak Notifications**

---

### 🔥 Stack:

- **Framework Core:** Next.js 16 (App Router)
- **UI Runtime Environment:** React 19
- **TWA Context Type Drivers**
- **Authentication Engine:** Auth.js v5 / NextAuth.js v5 Custom Provider
- **Database Engine:** PostgreSQL
- **Data Modeling Layer:** Prisma ORM
- **Application State Store:** Zustand
- **Asynchronous Server State:** TanStack Query v5 (React Query)
- **Validation Layer:** React Hook Form + Zod validation schemas
- **Component Foundations:** shadcn/ui + Radix UI Primitives
- **Styling Architecture:** Tailwind CSS 4 (Next-gen compiler infrastructure)
- **Test Suite Framework:** Vitest simulation space
- **CI/CD Pipeline Matrix:** GitHub Actions automation workflows

---

### 🏗️ Architecture & Codebase Topology:

The code scales natively relying tightly on the strict **Feature-Sliced Design (FSD)** paradigm.

```text
src/
├── app/          # Global entry points, providers mapping, styling assets, and app layouts
├── views/        # Screen-level composition architectures and main app view layers
├── widgets/      # Compound reusable interface compounds connecting features and domains
├── features/     # Encapsulated user mutations, invoice triggers, and contextual actions
├── entities/     # Decoupled domain models, Prisma engine queries, and schema-level state blocks
├── shared/       # Reusable agnostic tools: UI Kit, TWA SDK Hooks, and network client engines
└── auth.ts       # Central runtime logic handling the custom cryptographic TWA data validator

app/              # Next.js physical file-system localization routing matrix
```
