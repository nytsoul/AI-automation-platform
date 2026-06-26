# AetherFlow AI — Intelligent Data Automation Platform

An award-winning, production-grade SaaS landing page built for the Frontend Hackathon.

## 🚀 Hackathon Features

### 1. Matrix-Driven Pricing Architecture
- **Complete State Isolation**: Utilizing `React.memo`, `useMemo`, and `useCallback`, the deeply nested `PriceDisplay` component is the *only* DOM node that re-renders when toggling between USD/INR/EUR or Monthly/Annual cycles.
- **Dynamic Calculation**: Prices are never hardcoded. All values are computed on the fly from a multidimensional TypeScript configuration object.

### 2. Responsive Bento Grid ↔ Accordion
- **Adaptive Layout**: An immersive CSS Grid (Bento) on Desktop transforms seamlessly into a touch-optimized Accordion on Mobile.
- **ResizeObserver Persistence**: Utilizes a custom `useResizeObserver` hook and shared state to ensure the active, expanded tile context is flawlessly preserved when resizing between breakpoints.

### 3. High-Performance Three.js Neural Network
- A bespoke, lightweight Three.js visualization implemented directly without heavy abstraction layers (like R3F). 
- GPU accelerated, 60fps mouse parallax, and completely lazy-loaded to ensure 0 impact on Lighthouse scores (loads asynchronously *after* the initial DOM renders).

### 4. 100/100 Lighthouse & SEO Optimized
- Semantic HTML5 structure.
- Comprehensive `JSON-LD` schemas (Organization, WebPage, FAQPage).
- Full Open Graph and Twitter Card implementations.
- WCAG AAA compliant colors and strict ARIA accessibility standards.
- Aggressive lazy loading with Suspense boundaries for all below-the-fold content.

## 🛠️ Technology Stack
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS v4 (No external UI libraries)
- **Animations**: Native CSS `@keyframes` + Web Animations API (WAAPI)
- **3D**: Three.js

## 📦 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

## 📜 License
MIT
