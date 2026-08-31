# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev` - Runs Vite dev server at http://localhost:5173
- **Build for production**: `npm run build` - Compiles TypeScript and builds optimized assets
- **Preview production build**: `npm run preview` - Locally preview the production build
- **Lint code**: `npm run lint` - Runs Oxlint for code quality checks
- **Run type checking**: `npx tsc --noEmit` - TypeScript type checking without emitting files

## Project Architecture

### High-Level Structure
```
src/
├── assets/             # Static assets (images, icons, etc.)
├── components/         # Reusable UI components organized by feature
│   ├── header/         # Site header with cart display
│   ├── checkout-header/# Checkout-specific header
│   └── homepage/       # Homepage-specific components
├── interfaces/         # TypeScript interfaces for data models
├── pages/              # Page components mapped to routes
│   ├── homepage/       # Product listing page
│   ├── checkout/       # Checkout flow (multi-step)
│   ├── orders/         # Order history page
│   └── tracking/       # Order tracking page
├── utils/              # Utility functions (e.g., money formatting)
└── App.tsx             # Main application component with routing
```

### Key Architectural Patterns

1. **State Management**: Uses React Hooks (`useState`, `useEffect`) for local component state
2. **Data Fetching**: Direct Axios calls to REST API endpoints (expects backend at `http://localhost:3000`)
3. **Routing**: React Router v6 with lazy-loaded page components
4. **Styling**: CSS modules (via Vite) for scoped styling - each component has its own `.css` file
5. **Type Safety**: Extensive use of TypeScript interfaces for props, state, and API responses
6. **Component Composition**: 
   - Pages contain feature-specific components
   - Reusable components are in `/components`
   - Product listing uses a `Product` component for individual items

### API Integration
The application expects a backend API with these endpoints:
- `GET /api/products` - Product catalog
- `GET /api/cart-items` - Cart contents
- `POST /api/cart-items` - Add items to cart
- `GET /api/delivery-options` - Shipping options
- `GET /api/payment-summary` - Cost breakdown

### Important Files
- `src/App.tsx`: Main app component with route definitions
- `src/main.tsx`: Application entry point
- `src/Interfaces/`: Shared TypeScript interfaces
- `src/utils/money.ts`: Currency formatting utility

### Common Development Tasks
- Adding new features typically involves:
  1. Creating/updating interfaces in `/src/interfaces/`
  2. Building components in `/src/components/` or `/src/pages/`
  3. Adding routes in `App.tsx` if needed
  4. Implementing API calls with Axios
  5. Styling with CSS modules (`.css` files alongside components)

### Code Quality
- Uses Oxlint for linting with React, TypeScript, and OXC plugins
- Follows React hooks rules strictly
- TypeScript strict mode enabled via tsconfig
- Component props and state are strongly typed
- Separate components into own files where possible