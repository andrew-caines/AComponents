# AComponents Documentation

This is the built-in documentation site for the AComponents library. It's a micro React app that showcases all components with live examples, code snippets, and comprehensive prop documentation.

## Features

- **Live Component Previews**: See components in action with interactive examples
- **Code Examples**: Copy-paste ready code snippets for each component
- **Props Documentation**: Complete TypeScript prop definitions with descriptions
- **Multiple Examples**: Each component has multiple usage examples
- **Responsive Design**: Works on desktop and mobile devices
- **Syntax Highlighting**: Beautiful code highlighting with Prism.js

## Getting Started

### Install Dependencies

From the docs directory:
```bash
npm install
```

Or from the root library directory:
```bash
npm run docs:install
```

### Development

Start the development server:
```bash
npm run dev
```

Or from the root:
```bash
npm run docs:dev
```

The docs will be available at `http://localhost:3001`

### Building

Build for production:
```bash
npm run build
```

Or from the root:
```bash
npm run docs:build
```

## Adding New Components

To add documentation for a new component:

1. **Create example components** in `src/data/components.tsx`
2. **Add component data** to the `componentsData` array with:
   - Component info (name, description, category)
   - Import statements
   - Features list
   - Props documentation
   - Examples with preview components

3. **Import the component** from the parent library using `@acomponents/core`

## Structure

- `src/components/` - Documentation UI components
- `src/data/` - Component documentation data
- `src/styles/` - CSS and styling
- `src/types.ts` - TypeScript type definitions

## Technology Stack

- **React 19** - UI framework
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Syntax Highlighter** - Code highlighting
- **Lucide React** - Icons