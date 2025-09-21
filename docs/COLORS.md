# Colors Section Documentation

## Overview
The Colors section provides a dynamic, interactive showcase of your design system's color palette. It automatically reads CSS custom properties and displays them in multiple sizes for easy reference.

## Features

### 🎨 **Dynamic Color Detection**
- Automatically reads colors from CSS custom properties (`:root` variables)
- Updates in real-time when you change base colors
- No manual updating required

### 📐 **Three Size Display**
- **Large (200px)**: Perfect for detailed color inspection
- **Medium (100px)**: Good balance of detail and overview
- **Small (16px)**: Compact view similar to 8pt font size

### 🎯 **Interactive Features**
- **Click to Copy**: Click any color box to copy the CSS variable to clipboard
- **Hover Effects**: Visual feedback with scaling and shadows
- **Success Indicators**: Check mark appears when color is copied

### 🏷️ **Organized Categories**
Colors are automatically grouped by purpose:
- **Primary**: Main brand colors
- **Secondary**: Supporting colors
- **Status**: Destructive/error colors
- **Base**: Background and foreground
- **UI Elements**: Borders, inputs, focus rings
- **Accent**: Highlight and accent colors

## How It Works

### Automatic Synchronization
The color showcase uses `getComputedStyle(document.documentElement)` to read the current CSS custom properties. This means:

1. **Change colors in** `src/styles/variables.css`
2. **Colors automatically update** in the documentation
3. **No manual editing** of documentation required

### CSS Variables Structure
```css
:root {
  --primary: #3b82f6;
  --primary-foreground: #ffffff;
  --secondary: #f1f5f9;
  /* ... more colors */
}
```

### Usage Examples
- **CSS**: `color: var(--primary);`
- **Tailwind**: `className="bg-primary text-primary-foreground"`

## Adding New Colors

To add new colors to the showcase:

1. **Add the CSS variable** to `src/styles/variables.css`
2. **Update the color variables array** in `ColorShowcase.tsx`:
   ```typescript
   const colorVariables = [
     // ... existing colors
     { name: 'New Color', variable: '--new-color', category: 'Custom' },
   ]
   ```

The color will automatically appear in the documentation with all three sizes and copy functionality.

## Customization

### Categories
You can customize color categories by updating the `category` field in the `colorVariables` array.

### Sizes
Modify the size classes in the `ColorBox` component:
```typescript
const sizeClasses = {
  large: 'w-48 h-48',   // Customize large size
  medium: 'w-24 h-24',  // Customize medium size  
  small: 'w-4 h-4',     // Customize small size
}
```

This creates a powerful, self-maintaining color documentation system that scales with your design system!