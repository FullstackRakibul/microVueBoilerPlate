# 🔥 microVueBoilerPlate

A production-ready **Vue 3 + TypeScript** admin dashboard boilerplate — built with Vite, Pinia, Ant Design Vue, and Tailwind CSS. Designed as a clean starting point for billing panels, CRM dashboards, and internal business tools.

![Vue](https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vuedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-3.0-FFD859?logo=pinia&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2-06B6D4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Vue 3 + Composition API** | Modern reactive architecture with `<script setup>` SFCs |
| **TypeScript** | Full type safety across stores, routes, and components |
| **Vite** | Blazing-fast HMR and optimized production builds |
| **Pinia** | Lightweight, type-safe state management |
| **Ant Design Vue 4** | Enterprise-grade UI component library with auto-import |
| **Tailwind CSS 4** | Utility-first styling with custom design tokens |
| **Vue Router 5** | File-based routing with auth guards |
| **Chart.js** | Interactive data visualizations on the dashboard |
| **Axios** | Pre-configured HTTP client with auth interceptors |
| **Vue DevTools** | Integrated Vite plugin for debugging |

---

## 🏗️ Project Structure

```
src/
├── assets/               # Static assets, images, and global CSS
│   ├── main.css          # Global stylesheet entry
│   └── media/            # Media files (images, icons)
├── components/
│   ├── forms/            # Form components (e.g., ClientModal)
│   └── shared/           # Reusable UI components (e.g., KPIBox)
├── layouts/
│   ├── Sidebar.vue       # Navigation sidebar
│   ├── HeaderComponent.vue # Top header bar
│   ├── ContentContainer.vue # Page content wrapper
│   └── Footer.vue        # Footer component
├── router/
│   └── index.ts          # Route definitions with auth guards
├── stores/
│   ├── auth.ts           # Authentication state & login logic
│   ├── clients.ts        # Client CRUD operations
│   ├── dashboard.ts      # Dashboard statistics & analytics
│   └── counter.ts        # Example counter store
├── views/
│   ├── Dashboard.vue     # Main dashboard with KPIs & charts
│   ├── Login.vue         # Authentication page
│   ├── Clients.vue       # Client management table
│   ├── Invoices.vue      # Invoice listing
│   ├── Payments.vue      # Payment tracking
│   ├── Reports.vue       # Analytics reports
│   └── ...               # Additional views
├── App.vue               # Root component with layout logic
└── main.ts               # Application entry point
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 20.x
- **npm** ≥ 10.x (or pnpm / yarn)

### Installation

```bash
# Clone the repository
git clone https://github.com/FullstackRakibul/microVueBoilerPlate.git
cd microVueBoilerPlate

# Install dependencies
npm install
```

### Development

```bash
# Start dev server with hot-reload (default: http://localhost:5173)
npm run dev
```

### Production Build

```bash
# Type-check and build for production
npm run build

# Preview the production build locally
npm run preview
```

---

## 🔐 Authentication

The boilerplate includes a mock authentication system for development:

| Field | Value |
|-------|-------|
| **Email** | `admin@ch24.com` |
| **Password** | `admin@ch24.com` |

> ⚠️ **Replace** the mock auth in `src/stores/auth.ts` with your real API integration before deploying to production.

---

## 🛣️ Route Map

| Path | View | Auth Required |
|------|------|:---:|
| `/login` | Login | ✗ |
| `/` | Dashboard | ✓ |
| `/clients` | Clients | ✓ |
| `/agencies` | Agencies | ✓ |
| `/ad-bookings` | Ad Bookings | ✓ |
| `/invoices` | Invoices | ✓ |
| `/invoices/:id` | Invoice Details | ✓ |
| `/payments` | Payments | ✓ |
| `/reports` | Reports | ✓ |
| `/delivery-logs` | Delivery Logs | ✓ |
| `/settings` | Settings | ✓ |

---

## 🧩 Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Vue 3 | ^3.5 |
| Language | TypeScript | ~6.0 |
| Build Tool | Vite | ^8.0 |
| State | Pinia | ^3.0 |
| Router | Vue Router | ^5.0 |
| UI Library | Ant Design Vue | ^4.2 |
| CSS | Tailwind CSS | ^4.2 |
| Charts | Chart.js | ^4.5 |
| HTTP | Axios | ^1.15 |
| Icons | Lucide Vue Next | ^1.0 |

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Type-check + production build |
| `npm run build-only` | Production build without type-check |
| `npm run type-check` | Run TypeScript type checking |
| `npm run preview` | Preview production build locally |

---

## 🤝 Contributing

Contributions are welcome! Please read the [Contributing Guidelines](CONTRIBUTING.md) before submitting a pull request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🔒 Security

For security concerns, please see our [Security Policy](SECURITY.md).

---

## 💡 Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/)
- [Vue - Official Extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (formerly Volar)
- [TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/FullstackRakibul">FullstackRakibul</a>
</p>