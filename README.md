# AComponents

A React component library built on Radix primitives, designed for maximum flexibility and accessibility.

## Philosophy

This library embraces the primitive-based approach to component design:

- **Composable**: Build complex UIs from simple, focused primitives
- **Accessible**: Built on Radix UI's accessibility-first primitives
- **Flexible**: Use the `asChild` prop to merge behavior with your own elements
- **Type-safe**: Full TypeScript support with proper type inference

## Installation

### As a Git Submodule (Recommended)

Add this library as a submodule to your project:

```bash
git submodule add https://github.com/yourusername/acomponents.git src/lib/acomponents
cd src/lib/acomponents
npm install
npm run build
```

Then in your project, you can import directly:

```tsx
import { Button } from './lib/acomponents/dist'
```

### As an NPM Package

```bash
npm install @acomponents/core
```

## Usage

### Basic Button

```tsx
import { Button } from '@acomponents/core'

function App() {
  return (
    <Button variant="default" size="lg">
      Click me
    </Button>
  )
}
```

### Using asChild for Composition

The `asChild` prop lets you merge the button behavior with any element:

```tsx
import { Button } from '@acomponents/core'
import Link from 'next/link'

function NavLink() {
  return (
    <Button asChild variant="ghost">
      <Link href="/about">About</Link>
    </Button>
  )
}
```

## Available Components

- **Button**: Built on `@radix-ui/react-slot` for maximum composability

## Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Type check
npm run type-check

# Lint
npm run lint
```

## Submodule Workflow

### Adding to a Project

```bash
# Add as submodule
git submodule add https://github.com/yourusername/acomponents.git lib/acomponents

# Initialize and update
git submodule update --init --recursive
```

### Updating the Submodule

```bash
# In your main project
cd lib/acomponents
git pull origin main
cd ../..
git add lib/acomponents
git commit -m "Update acomponents submodule"
```

### Building in CI/CD

Make sure your CI/CD pipeline builds the submodule:

```yaml
# Example GitHub Action step
- name: Build submodules
  run: |
    git submodule update --init --recursive
    cd lib/acomponents
    npm install
    npm run build
```

## License

MIT