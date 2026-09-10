<div align="center">
  <h1>Clarenze Kenshien A. Alao — Personal Portfolio</h1>

  <p>
    A full-stack portfolio showcasing my projects, technical skills, and experience in modern web development.
  </p>

  <p>
    <a href="https://kenshien.is-a.dev/">
      <strong>Visit Portfolio</strong>
    </a>
  </p>

  <p>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" /></a>
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
    <a href="https://cloudinary.com/"><img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" alt="Cloudinary" /></a>
  </p>
</div>

<br />

## About

This repository contains the source code for **Clarenze Kenshien A. Alao's personal portfolio**, deployed at **[kenshien.is-a.dev](https://kenshien.is-a.dev/)**.

The portfolio is built as a unified, lightweight full-stack **Next.js** application. It showcases my work, technical skills, education, development environment setup, and provides an administrative management console for content updates.

## Features

- **Featured Projects** — Showcase of software projects and web applications with descriptions, technical tags, GitHub repositories, and live demo links.
- **Technical Skills** — Categorized overview of languages, frontend/backend frameworks, databases, tools, and platforms with light/dark adaptive icons.
- **Academic Journey** — Education timeline highlighting institutions, degrees, durations, and map locations.
- **Development Setup** — Detailed breakdown of my everyday operating systems, IDEs, package managers, and tools.
- **Command Center (Dashboard)** — Protected administrative dashboard for managing projects, skills, education history, setup items, and incoming messages.
- **Contact & Messaging** — Interactive contact form with automated feedback and admin notification inbox.
- **Media & Image Optimization** — Integrated Cloudinary image storage with custom transformation loaders.
- **Aesthetic UI & Themes** — Clean terminal/code-inspired aesthetic, fluid responsive layout, and full dark/light theme support.
- **SEO & Social Previews** — Automated Open Graph metadata, dynamic sitemap, robots.txt, and semantic HTML structure.

## Tech Stack

### Framework & Language

- **Next.js (App Router)** — Server Components, Server Actions, Route Handlers, and Turbopack
- **React** — React Compiler enabled for automatic memoization
- **TypeScript** — End-to-end type safety across the entire application

### Styling & Design System

- **Tailwind CSS**
- **Next Themes** — Seamless dark/light mode toggling
- **React Icons** — Optimized icon imports via `@react-icons`

### Data Storage & Media

- **File-Based JSON Datastore** — Lightweight, zero-overhead JSON data layer with atomic serialized writes and serverless fallback support
- **Cloudinary** — Cloud storage for image assets with custom dynamic optimization loaders
- **Bcrypt.js** — Secure password verification for administrative access
- **Zod** — Runtime schema parsing and input validation

### Client State & Data Fetching

- **TanStack React Query** — Client-side caching, background refetching, and optimistic updates

## Architecture Overview

The application adopts a consolidated Next.js full-stack architecture:

```text
Next.js (App Router)
 ├── Server Components (SEO-optimized pre-rendering & data fetching)
 ├── Server Actions & API Route Handlers (Secure administrative mutations)
 ├── Client Components (Interactive modals, tabs, theme toggle)
 ├── In-Memory Auth & Signed Session Cookies (HMAC-SHA256)
 ├── Cloudinary Storage Layer (Project & skill media)
 └── JSON Datastore Layer (Local file store with serverless-safe fallback)
```

## Getting Started

### Prerequisites

- **Node.js** >= 20 (Node 22 LTS recommended)
- **pnpm** >= 11

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/KenshienAlao/portfolio.git
   cd portfolio/frontend
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the `frontend/` directory with the following variables:

   ```env
   SESSION_SECRET="your-super-secret-session-key"

   # Admin Credentials
   ADMIN_CODE=kenshien
   ADMIN_PASSWORD_HASH="your-bcrypt-password-hash"

   # Cloudinary Media Configuration
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_SECRET=your_api_secret
   ```

4. Start the development server:

   ```bash
   pnpm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `pnpm run dev` — Starts the development server with Turbopack.
- `pnpm run build` — Creates an optimized production build.
- `pnpm run start` — Runs the production server.
- `pnpm run lint` — Runs ESLint checks.

## Contact

If you are interested in working together, discussing opportunities, collaborating on a project, or simply connecting, feel free to reach out.

<div align="center">
  <a href="mailto:kenshienworkacc@gmail.com">
    <img src="https://img.shields.io/badge/Email-kenshienworkacc%40gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
  </a>
  <a href="https://www.linkedin.com/in/KenshienAlao/">
    <img src="https://img.shields.io/badge/LinkedIn-KenshienAlao-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
  <a href="https://github.com/KenshienAlao">
    <img src="https://img.shields.io/badge/GitHub-KenshienAlao-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>
</div>

<br />

---

<div align="center">
  <sub>
    Built with care and attention to detail by
    <strong>Clarenze Kenshien A. Alao</strong>
  </sub>
</div>
