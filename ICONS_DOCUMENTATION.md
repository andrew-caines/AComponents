# 🎨 AComponents Icon System Documentation

## 🎯 **System Overview**

The AComponents Icon System provides a comprehensive, type-safe way to use icons throughout your React application. Built on top of `react-icons`, it offers a curated collection of 70+ icons accessible via TypeScript enums.

## 📋 **Core Architecture**

### **1. Enum-Based Type System**
```typescript
// Usage - exactly as requested
<Icon type={IconType.DOWNLOAD} />
<Icon type={IconType.STAR} size="lg" color="warning" />
```

### **2. Centralized Icon Registry**
Icons are mapped from various libraries to consistent enum values:

**File: `src/components/icons/iconRegistry.tsx`**
```typescript
import { HiArrowDownTray } from "react-icons/hi2";
import { FaCode } from "react-icons/fa6";

export const iconRegistry = {
  [IconType.DOWNLOAD]: HiArrowDownTray,  // Heroicons v2
  [IconType.CODE]: FaCode,               // FontAwesome 6
  // ... 70+ more icons
}
```

### **3. Flexible Icon Component**
```typescript
// Basic usage
<Icon type={IconType.DOWNLOAD} />

// With customization
<Icon type={IconType.STAR} size="lg" color="warning" />

// Animated
<Icon type={IconType.LOADING} spin />
```

## 🔧 **Features**

### **Sizes (7 options)**
- `xs` - 12px (h-3 w-3)
- `sm` - 16px (h-4 w-4) 
- `default` - 20px (h-5 w-5)
- `md` - 24px (h-6 w-6)
- `lg` - 32px (h-8 w-8)
- `xl` - 40px (h-10 w-10)
- `2xl` - 48px (h-12 w-12)

### **Colors (9 options)**
- `default` - Inherits current text color
- `primary` - Theme primary color
- `secondary` - Theme secondary color
- `success` - Green (#10b981)
- `warning` - Amber (#f59e0b)
- `error` - Theme destructive color
- `muted` - Gray (#6b7280)
- `white` - White
- `black` - Black

### **Special Features**
- **Spin Animation**: `<Icon type={IconType.LOADING} spin />`
- **Custom Classes**: `<Icon type={IconType.USER} className="custom-class" />`
- **SVG Attributes**: Full support for onClick, onHover, etc.

## 📚 **Available Icon Categories**

### **Navigation (8 icons)**
- `IconType.ARROW_LEFT`, `ARROW_RIGHT`, `ARROW_UP`, `ARROW_DOWN`
- `IconType.CHEVRON_LEFT`, `CHEVRON_RIGHT`, `CHEVRON_UP`, `CHEVRON_DOWN`

### **Actions (10 icons)**
- `IconType.DOWNLOAD`, `UPLOAD`, `COPY`, `DELETE`, `EDIT`
- `IconType.SAVE`, `SEARCH`, `FILTER`, `SORT`, `REFRESH`

### **Interface (10 icons)**
- `IconType.CLOSE`, `MENU`, `MORE`, `SETTINGS`, `INFO`
- `IconType.WARNING`, `ERROR`, `SUCCESS`, `HELP`, `QUESTION`

### **Content (7 icons)**
- `IconType.FILE`, `FOLDER`, `IMAGE`, `DOCUMENT`
- `IconType.VIDEO`, `AUDIO`, `LINK`

### **User & Social (6 icons)**
- `IconType.USER`, `USERS`, `PROFILE`
- `IconType.HEART`, `STAR`, `SHARE`

### **Communication (5 icons)**
- `IconType.MAIL`, `PHONE`, `MESSAGE`, `NOTIFICATION`, `BELL`

### **Status (6 icons)**
- `IconType.CHECK`, `PLUS`, `MINUS`, `LOADING`, `LOCK`, `UNLOCK`

### **Layout (4 icons)**
- `IconType.GRID`, `LIST`, `CALENDAR`, `CLOCK`

### **Development (4 icons)**
- `IconType.CODE`, `TERMINAL`, `BUG`, `DATABASE`

## 🎨 **Documentation Features**

### **Interactive Icon Gallery**
The documentation includes a comprehensive icon gallery at `http://localhost:3001` with:

1. **Searchable Icon Grid**: Filter by name or category
2. **Category Filtering**: Browse by icon type
3. **Click-to-Preview**: Click any icon for detailed view
4. **Size Previews**: See icons at 4 different sizes (sm, default, lg, xl)
5. **Copy-to-Clipboard**: Get ready-to-use code snippets

### **Popout Modal Features**
When you click an icon, you get:

1. **Size Preview Grid**: Visual preview at 4 standard sizes
2. **Import Statement**: Copy the exact import you need
3. **Usage Code**: Copy the exact `<Icon type={...} />` code
4. **Enum Reference**: Copy just the `IconType.NAME` enum value

### **Search & Filter**
- **Text Search**: Search by icon name or keyword
- **Category Filter**: Filter by icon category
- **Real-time Results**: Instant filtering as you type

## 🚀 **Usage Examples**

### **In Buttons**
```tsx
// Icon with text
<Button>
  <Icon type={IconType.DOWNLOAD} size="sm" />
  Download File
</Button>

// Icon-only button
<Button size="icon">
  <Icon type={IconType.SETTINGS} />
</Button>
```

### **In Tooltips**
```tsx
<Tooltip content="Save your work">
  <Button variant="ghost">
    <Icon type={IconType.SAVE} />
  </Button>
</Tooltip>
```

### **Status Indicators**
```tsx
// Success state
<Icon type={IconType.SUCCESS} color="success" />

// Loading state
<Icon type={IconType.LOADING} spin />

// Error state
<Icon type={IconType.ERROR} color="error" />
```

### **Navigation**
```tsx
// Back button
<Button variant="ghost">
  <Icon type={IconType.ARROW_LEFT} />
  Back
</Button>

// Dropdown chevron
<Icon type={IconType.CHEVRON_DOWN} size="sm" />
```

## 🔧 **Adding New Icons**

To add new icons to the system:

### **Step 1: Add to Enum**
In `src/types/icon.ts`:
```typescript
export enum IconType {
  // ... existing icons
  NEW_ICON = 'new-icon',
}
```

### **Step 2: Import Icon Component**
In `src/components/icons/iconRegistry.tsx`:
```typescript
import { HiNewIcon } from 'react-icons/hi2'
// or from any other react-icons library
```

### **Step 3: Add to Registry**
```typescript
export const iconRegistry: Record<IconType, React.ComponentType<any>> = {
  // ... existing mappings
  [IconType.NEW_ICON]: HiNewIcon,
}
```

That's it! The new icon is immediately available as `<Icon type={IconType.NEW_ICON} />`.

## 💡 **Design Philosophy**

### **Consistency First**
- One API: Always `<Icon type={IconType.WHATEVER} />`
- Predictable sizing with design system integration
- Consistent color theming across all icons

### **Developer Experience**
- Full TypeScript support with autocomplete
- Enum prevents typos and provides discovery
- Centralized icon management
- Easy to add new icons without touching component code

### **Performance**
- Tree-shaking friendly (only imports used icons)
- Optimized bundle splitting
- Minimal runtime overhead

### **Flexibility**
- Mix icons from different libraries seamlessly
- Custom styling via className prop
- Support for all standard SVG attributes
- Animation support (spin, custom CSS)

## 🎯 **Best Practices**

1. **Use Semantic Names**: Choose `IconType.DOWNLOAD` over generic names
2. **Size Appropriately**: Use `sm` in buttons, `default` for general use
3. **Color Consistently**: Use theme colors (`primary`, `error`) over custom ones
4. **Animate Purposefully**: Only spin loading/refresh icons
5. **Group Related Icons**: Keep related actions visually similar

The Icon System provides a robust, scalable solution for icon management in React applications with excellent developer experience and comprehensive documentation!