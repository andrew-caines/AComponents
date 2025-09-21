# Icon System Usage Examples

## Basic Usage

```tsx
import { Icon, IconType } from '@acomponents/core'

// Simple icon usage
<Icon type={IconType.DOWNLOAD} />

// With size and color
<Icon type={IconType.STAR} size="lg" color="warning" />

// Spinning loader
<Icon type={IconType.LOADING} spin />
```

## Available Sizes
- `xs` - 12px (3 units)
- `sm` - 16px (4 units) 
- `default` - 20px (5 units)
- `md` - 24px (6 units)
- `lg` - 32px (8 units)
- `xl` - 40px (10 units)
- `2xl` - 48px (12 units)

## Available Colors
- `default` - Inherits current text color
- `primary` - Primary theme color
- `secondary` - Secondary theme color
- `success` - Green
- `warning` - Amber
- `error` - Destructive/red
- `muted` - Gray
- `white` - White
- `black` - Black

## Icon Categories

### Navigation
- `IconType.ARROW_LEFT`, `IconType.ARROW_RIGHT`, `IconType.ARROW_UP`, `IconType.ARROW_DOWN`
- `IconType.CHEVRON_LEFT`, `IconType.CHEVRON_RIGHT`, `IconType.CHEVRON_UP`, `IconType.CHEVRON_DOWN`

### Actions
- `IconType.DOWNLOAD`, `IconType.UPLOAD`, `IconType.COPY`, `IconType.DELETE`
- `IconType.EDIT`, `IconType.SAVE`, `IconType.SEARCH`, `IconType.REFRESH`

### Interface
- `IconType.CLOSE`, `IconType.MENU`, `IconType.SETTINGS`, `IconType.INFO`
- `IconType.WARNING`, `IconType.ERROR`, `IconType.SUCCESS`

### Content
- `IconType.FILE`, `IconType.FOLDER`, `IconType.IMAGE`, `IconType.DOCUMENT`
- `IconType.VIDEO`, `IconType.AUDIO`, `IconType.LINK`

### User & Social
- `IconType.USER`, `IconType.USERS`, `IconType.PROFILE`
- `IconType.HEART`, `IconType.STAR`, `IconType.SHARE`

## Adding New Icons

To add new icons to the system:

1. **Add to IconType enum** in `src/types/icon.ts`:
```typescript
export enum IconType {
  // ... existing icons
  NEW_ICON = 'new-icon',
}
```

2. **Import the icon component** in `src/components/icons/iconRegistry.tsx`:
```typescript
import { HiNewIcon } from 'react-icons/hi2'
// or
import { FaNewIcon } from 'react-icons/fa6'
```

3. **Add to the registry**:
```typescript
export const iconRegistry: Record<IconType, React.ComponentType<any>> = {
  // ... existing mappings
  [IconType.NEW_ICON]: HiNewIcon,
}
```

The icon is now available as `<Icon type={IconType.NEW_ICON} />`!

## In Buttons and Other Components

```tsx
// Icon in button
<Button>
  <Icon type={IconType.DOWNLOAD} size="sm" />
  Download
</Button>

// Icon-only button
<Button size="icon">
  <Icon type={IconType.SETTINGS} />
</Button>

// In tooltips
<Tooltip content="Save file">
  <Button variant="ghost">
    <Icon type={IconType.SAVE} />
  </Button>
</Tooltip>
```