# 🏔️ Peakmark

<div align="center">

[![TypeScript - 100%](https://peakmark.vercel.app/api/badge?style=for-the-badge&segments=%5B%7B%22text%22%3A%22TypeScript%22%2C%22color%22%3A%22%233178c6%22%2C%22paddingLeft%22%3A12%2C%22id%22%3A%22seg-63tsbmml-mlgqw5qb%22%7D%2C%7B%22text%22%3A%22100%25%22%2C%22color%22%3A%22%230f172a%22%2C%22paddingLeft%22%3A12%2C%22id%22%3A%22seg-ivgn1d50-mlgqw5qb%22%7D%5D&paddingleft=12&advanced=%7B%22size%22%3A%22lg%22%2C%22scale%22%3A1%2C%22opacity%22%3A1%2C%22border%22%3A0%2C%22borderColor%22%3A%22%23ffffff%22%2C%22shadow%22%3A2%2C%22shadowAngle%22%3A135%2C%22glow%22%3A0.5%2C%22rotate%22%3A0%2C%22txtsize%22%3A1%7D&icon=typescript&iconPosition=0&link=https%3A%2F%2Fwww.typescriptlang.org)](https://peakmark.vercel.app)
[![Tailwindcss - 100%](https://peakmark.vercel.app/api/badge?style=for-the-badge&segments=%5B%7B%22text%22%3A%22Tailwindcss%22%2C%22color%22%3A%22%2334d399%22%2C%22paddingLeft%22%3A12%2C%22id%22%3A%22seg-e7hs2z4p-mlgqyh0q%22%7D%2C%7B%22text%22%3A%22100%25%22%2C%22color%22%3A%22%230f172a%22%2C%22paddingLeft%22%3A12%2C%22id%22%3A%22seg-r6mgwf2f-mlgqyh0q%22%7D%5D&paddingleft=12&advanced=%7B%22size%22%3A%22lg%22%2C%22scale%22%3A1%2C%22opacity%22%3A1%2C%22border%22%3A0%2C%22borderColor%22%3A%22%23ffffff%22%2C%22shadow%22%3A2%2C%22shadowAngle%22%3A135%2C%22glow%22%3A0.5%2C%22rotate%22%3A0%2C%22txtsize%22%3A1%7D&icon=tailwindcss&iconPosition=0&link=https%3A%2F%2Fwww.typescriptlang.org)](https://peakmark.vercel.app)
[![tRPC](https://peakmark.vercel.app/api/badge?style=flat&segments=%5B%7B%22text%22%3A%22tRPC%22%2C%22color%22%3A%22%233b82f6%22%2C%22paddingLeft%22%3A12%2C%22id%22%3A%22seg-e7hs2z4p-mlgqyh0q%22%7D%5D&paddingleft=12&advanced=%7B%22size%22%3A%22lg%22%2C%22scale%22%3A1.25%2C%22opacity%22%3A1%2C%22border%22%3A0%2C%22borderColor%22%3A%22%23ffffff%22%2C%22shadow%22%3A0%2C%22shadowAngle%22%3A0%2C%22glow%22%3A0%2C%22rotate%22%3A0%2C%22txtsize%22%3A1%7D&link=https%3A%2F%2Fwww.typescriptlang.org)](https://peakmark.vercel.app)
[![Turborepo](https://peakmark.vercel.app/api/badge?style=flat&segments=%5B%7B%22text%22%3A%22TURBOREPO%22%2C%22color%22%3A%22%23ef4444%22%2C%22paddingLeft%22%3A12%2C%22id%22%3A%22seg-e7hs2z4p-mlgqyh0q%22%7D%5D&paddingleft=12&advanced=%7B%22size%22%3A%22lg%22%2C%22scale%22%3A1.25%2C%22opacity%22%3A1%2C%22border%22%3A0%2C%22borderColor%22%3A%22%23ffffff%22%2C%22shadow%22%3A0%2C%22shadowAngle%22%3A0%2C%22glow%22%3A0%2C%22rotate%22%3A0%2C%22txtsize%22%3A1%7D&link=https%3A%2F%2Fwww.typescriptlang.org)](https://peakmark.vercel.app)

**A modern, full-stack badge generation and customization platform built with the Better-T-Stack**

[Features](#-features) • [Quick Start](#-quick-start) • [Tech Stack](#-tech-stack) • [Project Structure](#-project-structure) • [Documentation](#-documentation)

</div>

---

## ✨ Features

### 🎨 **Badge Customization**
- **Multiple Style Presets**: Choose from 7 different badge styles (Flat, Flat-Square, Rounded, Plastic, Folded, For-The-Badge)
- **Icon Integration**: Extensive icon library for badge customization
- **Advanced Settings**: Fine-tune colors, text, and styling options
- **Real-time Preview**: See changes instantly as you customize

### 🚀 **Modern Architecture**
- **Type-Safe APIs**: End-to-end type safety with tRPC
- **Monorepo Structure**: Efficient code organization with Turborepo
- **Component Library**: Pre-built UI components with shadcn/ui
- **Database ORM**: Type-safe database queries with Prisma

### 🛠️ **Developer Experience**
- **TypeScript First**: Complete type safety across the stack
- **Hot Reload**: Fast refresh for rapid development
- **Code Quality**: Built-in linting and type checking
- **Modern Tooling**: Powered by Bun for lightning-fast performance

### 🎯 **Badge Generation**
- **Dynamic Badge API**: Generate badges on-the-fly via API endpoints
- **Badge Gallery**: Browse and explore pre-made badge templates
- **Query-Based Generation**: Create badges from URL parameters
- **SVG Output**: Scalable vector graphics for perfect quality

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- **[Bun](https://bun.sh/)** (v1.0 or higher)
- **[Node.js](https://nodejs.org/)** (v18 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SinghAman21/peakmark
   cd peakmark
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Start the development server**
   ```bash
   bun run dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application in action!

---

## 🏗️ Tech Stack

### Frontend
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://react.dev/)** - UI library
- **[TailwindCSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible components

### Backend
- **[tRPC](https://trpc.io/)** - End-to-end type-safe APIs

### Development Tools
- **[TypeScript](https://www.typescriptlang.org/)** - Static type checking
- **[Turborepo](https://turbo.build/)** - High-performance build system
- **[Bun](https://bun.sh/)** - Fast all-in-one JavaScript runtime

---

## 📁 Project Structure

```
peakmark/
├── apps/
│   └── web/                                # Next.js application
│       ├── src/
│       │   ├── app/                        # App router (Next.js 14)
│       │   │   ├── api/                    # API routes
│       │   │   │   ├── badge/
│       │   │   │   │   └── route.ts        # Badge generation endpoint
│       │   │   │   └── trpc/
│       │   │   │       └── [trpc]/
│       │   │   │           └── route.ts    # tRPC API handler
│       │   │   ├── editor/
│       │   │   │   └── page.tsx            # Badge editor page
│       │   │   ├── public/                 # Public assets
│       │   │   │   └── favicon_io/         # Favicon files
│       │   │   ├── layout.tsx              # Root layout
│       │   │   ├── page.tsx                # Home page
│       │   │   └── og.tsx                  # OpenGraph image
│       │   │
│       │   ├── components/                 # React components
│       │   │   ├── badgeStyles/            # Badge style preset components
│       │   │   │   ├── BadgeStylePresetPanel.tsx
│       │   │   │   ├── FlatStylePreset.tsx
│       │   │   │   ├── FlatSquareStylePreset.tsx
│       │   │   │   ├── RoundedStylePreset.tsx
│       │   │   │   ├── PlasticStylePreset.tsx
│       │   │   │   ├── FoldedStylePreset.tsx
│       │   │   │   └── ForTheBadgeStylePreset.tsx
│       │   │   ├── editor/                 # Editor panel components
│       │   │   │   ├── CustomizePanel.tsx
│       │   │   │   └── PreviewPanel.tsx
│       │   │   ├── ui/                     # shadcn/ui components
│       │   │   │   ├── button.tsx
│       │   │   │   ├── card.tsx
│       │   │   │   ├── input.tsx
│       │   │   │   ├── select.tsx
│       │   │   │   ├── slider.tsx
│       │   │   │   └── ...                 # More UI components
│       │   │   ├── BadgeEditor.tsx         # Main badge editor
│       │   │   ├── BadgeGallery.tsx        # Badge gallery view
│       │   │   ├── BadgeCard.tsx           # Individual badge card
│       │   │   ├── BadgeSVG.tsx            # SVG badge renderer
│       │   │   ├── BadgeFromQuery.tsx      # Query-based badge
│       │   │   ├── AdvancedBadgeSettings.tsx
│       │   │   ├── SegmentEditor.tsx       # Badge segment editor
│       │   │   ├── IconPicker.tsx          # Icon selection component
│       │   │   ├── Header.tsx              # Site header
│       │   │   ├── HeroSection.tsx         # Landing hero section
│       │   │   └── ...                     # Additional components
│       │   │
│       │   ├── data/                       # Static data
│       │   │   ├── badgeIcons.ts           # Icon definitions
│       │   │   └── seedBadges.ts           # Sample badges
│       │   │
│       │   ├── hooks/                      # Custom React hooks
│       │   │   ├── use-badge-query.ts      # Badge query hook
│       │   │   ├── use-mobile.tsx          # Mobile detection
│       │   │   └── use-toast.ts            # Toast notifications
│       │   │
│       │   ├── lib/                        # Utility libraries
│       │   │   ├── badgeStylePresets.ts    # Style preset definitions
│       │   │   ├── badgeUrlGenerator.ts    # URL generation logic
│       │   │   └── utils.ts                # General utilities
│       │   │
│       │   ├── types/                      # TypeScript types
│       │   │   └── badge.ts                # Badge type definitions
│       │   │
│       │   ├── utils/                      # Helper utilities
│       │   │   └── trpc.ts                 # tRPC client setup
│       │   │
│       │   └── index.css                   # Global styles
│       │
│       ├── components.json                 # shadcn/ui config
│       ├── next.config.ts                  # Next.js configuration
│       ├── postcss.config.mjs              # PostCSS config
│       ├── tsconfig.json                   # TypeScript config
│       └── package.json                    # Web app dependencies
│
├── packages/
│   ├── api/                                # tRPC API layer
│   │   ├── src/
│   │   │   ├── routers/
│   │   │   │   └── index.ts                # API route definitions
│   │   │   ├── context.ts                  # tRPC context
│   │   │   └── index.ts                    # API entry point
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── db/                                 # Database package
│   │   ├── prisma/
│   │   │   └── schema/
│   │   │       └── schema.prisma           # Database schema
│   │   ├── src/
│   │   │   └── index.ts                    # Prisma client export
│   │   ├── prisma.config.ts                # Prisma configuration
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── config/                             # Shared configurations
│   │   ├── tsconfig.base.json              # Base TypeScript config
│   │   └── package.json
│   │
│   └── env/                                # Environment validation
│       ├── src/
│       │   ├── server.ts                   # Server env variables
│       │   └── web.ts                      # Client env variables
│       ├── package.json
│       └── tsconfig.json
│
├── bts.jsonc                               # Better-T-Stack config
├── Docker                                  # Docker configuration
├── index.html                              # HTML entry
├── turbo.json                              # Turborepo configuration
├── tsconfig.json                           # Root TypeScript config
├── vercel.json                             # Vercel deployment config
├── package.json                            # Root package.json
└── README.md                               # This file
```

---

## 📜 Available Scripts

### Development
```bash
bun run dev              # Start development server (all apps)
bun run dev:web          # Start only web app
```

### Building
```bash
bun run build            # Build all applications
bun run build:web        # Build only web app
```

### Type Checking & Linting
```bash
bun run check-types      # Check TypeScript types across all packages
bun run lint             # Run ESLint
```


---

## 🎨 Badge Styles

Peakmark supports multiple badge style presets:

- **Flat** - Clean, modern flat design
- **Flat-Square** - Flat design with sharp corners
- **Rounded** - Smooth rounded corners
- **Plastic** - Glossy, 3D-like appearance
- **Folded** - Unique folded corner effect
- **For-The-Badge** - Bold, attention-grabbing style
- **Custom** - Create your own unique style

---

## 🔧 Configuration

### Environment Variables

#### Required
- `NEXT_PUBLIC_APP_URL` - Application URL

#### Optional
- `NODE_ENV` - Environment mode (development/production)
- `PORT` - Custom port (default: 3001)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- Built with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Powered by the amazing open-source community

---

<div align="center">

**[⬆ Back to Top](#-peakmark)**

Made with ❤️ using TypeScript

</div>


