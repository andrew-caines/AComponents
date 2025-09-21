# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

AComponents is a React component library built on Radix UI primitives, designed for maximum flexibility and accessibility. The library follows a primitive-based approach to component design, emphasizing composability through the `asChild` prop pattern.

## Common Development Commands

### Build and Development
```bash
# Build the library (TypeScript compilation + Vite build)
npm run build

# Start development server
npm run dev

# Preview the built library
npm run preview

# Clean build artifacts
npm run clean
```

### Code Quality
```bash
# Type checking without emitting files
npm run type-check

# Lint source code
npm run lint
```

### Package Installation
```bash
# Install all dependencies
npm install
```

## Architecture Overview

### Project Structure
- **`src/index.ts`**: Main entry point, exports all components and utilities
- **`src/components/`**: React components built on Radix primitives
- **`src/utils/`**: Utility functions (primarily the `cn` class name utility)

### Key Architectural Patterns

**Primitive-Based Components**: All components are built on Radix UI primitives for accessibility and behavior, with custom styling using `class-variance-authority` (cva) for variant management.

**Composition via asChild**: Components support the `asChild` prop pattern from `@radix-ui/react-slot`, allowing behavior merging with any element. This enables flexible composition like wrapping Next.js Link components.

**Variant System**: Uses `class-variance-authority` for type-safe variant management with default styles and customizable variants (size, appearance, etc.).

**Path Aliases**: TypeScript configured with `@/*` path alias pointing to `src/*` for clean imports.

### Build Configuration

**Dual Build Process**: 
1. TypeScript compilation for type definitions (`tsconfig.build.json`)
2. Vite build for JavaScript bundling with library mode

**External Dependencies**: React and React DOM are marked as external dependencies and peer dependencies, allowing consuming projects to control the React version.

**Type Generation**: Uses `vite-plugin-dts` for automatic `.d.ts` file generation with proper type exports.

### Component Development Guidelines

When adding new components to this library:

1. **Follow the existing pattern**: Use Radix primitives as the foundation
2. **Support asChild**: Always implement the `asChild` prop for composition flexibility
3. **Use cva for variants**: Define variants using `class-variance-authority` for consistent styling API
4. **Export everything**: Add exports to the appropriate `index.ts` files
5. **TypeScript first**: Ensure full TypeScript support with proper prop interfaces

### Deployment Patterns

This library is designed to work in two deployment scenarios:

**Git Submodule (Recommended)**: Add as a submodule to consuming projects, allowing direct source access and customization.

**NPM Package**: Published as `@acomponents/core` for standard npm installation.

### CSS and Styling

The library expects consuming applications to provide CSS custom properties for design tokens (e.g., `--primary`, `--secondary`, `--destructive`). Components use Tailwind-style utility classes that should be processed by the consuming application's build system.