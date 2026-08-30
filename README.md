# eCommerce Application

A full-featured eCommerce web application built with React, TypeScript, and Vite.

## Features

- **Product Browse**: View a catalog of products with images, names, ratings, and prices
- **Shopping Cart**: Add products to cart, adjust quantities, and view cart summary
- **Checkout Process**: 
  - Review selected items in the cart
  - Select delivery options with estimated delivery times
  - View payment summary including taxes and total cost
- **Order History**: View past orders with details and ability to reorder items
- **Order Tracking**: Track the status of shipments with progress indicators
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: CSS Modules (via Vite) for scoped styling
- **State Management**: React Hooks (useState, useEffect)
- **Routing**: React Router v6
- **HTTP Client**: Axios for API requests
- **Linting**: Oxlint with custom configuration for code quality

## Project Structure

```
src/
├── assets/             # Static assets (images, icons)
├── components/         # Reusable UI components
│   ├── header/         # Site header with cart quantity
│   ├── checkout-header/# Checkout-specific header
│   └── homepage/       # Homepage-specific components (ProductsGrid)
├── interfaces/         # TypeScript interfaces for data models
├── pages/              # Page components
│   ├── homepage/       # Product listing page
│   ├── checkout/       # Checkout flow
│   ├── orders/         # Order history page
│   └── tracking/       # Order tracking page
├── utils/              # Utility functions (e.g., money formatting)
└── App.tsx             # Main application component with routing
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser to `http://localhost:5173`

### API Endpoints

This application expects a backend API running on `http://localhost:3000` with the following endpoints:

- `GET /api/products` - Retrieve list of products
- `GET /api/cart-items` - Retrieve cart items
- `GET /api/cart-items?expand=product` - Retrieve cart items with product details
- `GET /api/delivery-options` - Retrieve delivery options
- `GET /api/delivery-options?expand=estimatedDeliveryTime` - Retrieve delivery options with estimated times
- `GET /api/payment-summary` - Retrieve payment summary (taxes, total, etc.)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run Oxlint for code quality checks

## Configuration

### Oxlint

The project uses Oxlint for linting. To enable type-aware lint rules, install `oxlint-tsgolint` and update `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

## Learn More

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/guide/)
- [Oxlint Documentation](https://oxc.rs/docs/guide/usage/linter/rules)

## Acknowledgments

- Product images and icons used in this project are for demonstration purposes only.
- This project was created as a learning exercise in building full-stack web applications.