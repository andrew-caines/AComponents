# Input Component System

A comprehensive collection of form input components with consistent styling, validation, and advanced features.

## Overview

The Input component system provides 14 different input types, each designed for specific use cases while maintaining consistent styling and behavior. All components support controlled/uncontrolled usage, validation, error states, icons, and accessibility features.

## Installation

```bash
npm install @acomponents/core
```

## Basic Usage

```tsx
import { Input } from '@acomponents/core'

// Basic usage
<Input.Text label="Name" placeholder="Enter your name" />

// With validation and error
<Input.Email 
  label="Email" 
  required
  error="Please enter a valid email"
/>

// Controlled usage
const [value, setValue] = useState('')
<Input.Text 
  value={value} 
  onChange={(newValue) => setValue(newValue)}
/>
```

## Component Types

| Component | Description | Use Case |
|-----------|-------------|----------|
| `Input.Text` | Basic text input | General text input |
| `Input.Password` | Password input with toggle visibility | Secure text entry |
| `Input.Email` | Email input with validation | Email addresses |
| `Input.Url` | URL input with validation | Web addresses |
| `Input.Search` | Search input with search callback | Search functionality |
| `Input.Hidden` | Hidden input field | Form data storage |
| `Input.Number` | Integer number input | Whole numbers |
| `Input.Decimal` | Decimal number input with precision | Prices, measurements |
| `Input.Tel` | Phone number with formatting | Phone numbers |
| `Input.TextArea` | Multi-line text input | Long text content |
| `Input.Date` | Date picker input | Date selection |
| `Input.Range` | Slider/range input | Value selection |
| `Input.File` | File upload with drag-drop | File uploads |
| `Input.ColorPicker` | Color selection with picker | Color values |

## Shared Props

All Input components share these common properties:

### Basic Props

```typescript
interface BaseInputProps<T = string> {
  // Display
  label?: string
  description?: string
  placeholder?: string
  
  // State
  value?: T
  defaultValue?: T
  disabled?: boolean
  required?: boolean
  
  // Validation
  error?: string
  validator?: (value: T) => boolean
  
  // Styling
  size?: 'sm' | 'default' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'outline' | 'filled' | 'underline'
  radius?: 'none' | 'sm' | 'default' | 'lg' | 'xl' | 'full'
  className?: string
  
  // Icons & Actions
  leftIcon?: IconType
  rightIcon?: IconType
  clearable?: boolean
  
  // Events
  onChange?: (value: T, event?: any) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
  onClear?: (value: T) => void
}
```

### Size Variants

```tsx
<Input.Text size="sm" />     // Small
<Input.Text size="default" /> // Default (medium)
<Input.Text size="md" />     // Medium
<Input.Text size="lg" />     // Large
<Input.Text size="xl" />     // Extra Large
```

### Style Variants

```tsx
<Input.Text variant="default" />    // Default border
<Input.Text variant="outline" />    // Thicker border
<Input.Text variant="filled" />     // Filled background
<Input.Text variant="underline" />  // Underline only
```

### Radius Options

```tsx
<Input.Text radius="none" />     // Square corners
<Input.Text radius="sm" />       // Small radius
<Input.Text radius="default" />  // Default radius
<Input.Text radius="lg" />       // Large radius
<Input.Text radius="xl" />       // Extra large radius
<Input.Text radius="full" />     // Fully rounded
```

## Detailed Component Documentation

### Input.Text

Basic text input with optional icons and validation.

```tsx
interface InputTextProps extends BaseInputProps<string> {
  type?: 'text' | 'password' | 'email' | 'url' | 'tel'
}

// Examples
<Input.Text 
  label="Full Name"
  placeholder="Enter your full name"
  leftIcon={IconType.USER}
  clearable
/>

<Input.Text 
  label="Username"
  description="Must be unique and 3-20 characters"
  validator={(value) => value.length >= 3 && value.length <= 20}
  error={!isValid ? "Username must be 3-20 characters" : undefined}
/>
```

### Input.Password

Password input with toggleable visibility using eye icons.

```tsx
// Basic password input
<Input.Password 
  label="Password"
  placeholder="Enter your password"
  required
/>

// With validation
<Input.Password 
  label="New Password"
  validator={(value) => value.length >= 8}
  error={!isValid ? "Password must be at least 8 characters" : undefined}
/>
```

### Input.Email

Email input with built-in email validation and character restrictions.

```tsx
// Basic email input
<Input.Email 
  label="Email Address"
  placeholder="Enter your email"
  required
/>

// With custom validation
<Input.Email 
  label="Work Email"
  validator={(value) => value.endsWith('@company.com')}
  error={!isValid ? "Must be a company email" : undefined}
/>
```

### Input.Url

URL input with validation for proper web addresses.

```tsx
// Basic URL input
<Input.Url 
  label="Website"
  placeholder="https://example.com"
/>

// With validation for specific domains
<Input.Url 
  label="GitHub Profile"
  validator={(value) => value.includes('github.com')}
  placeholder="https://github.com/username"
/>
```

### Input.Search

Search input with onSearch callback triggered by Enter key.

```tsx
interface InputSearchProps extends BaseInputProps<string> {
  onSearch?: (value: string) => void
}

<Input.Search 
  label="Search Products"
  placeholder="Type to search..."
  onSearch={(query) => performSearch(query)}
  clearable
/>
```

### Input.Number

Integer number input with min/max constraints.

```tsx
interface InputNumberProps extends BaseInputProps<number> {
  min?: number
  max?: number
  step?: number
}

<Input.Number 
  label="Age"
  min={0}
  max={150}
  placeholder="Enter your age"
/>

<Input.Number 
  label="Quantity"
  min={1}
  max={99}
  defaultValue={1}
  step={1}
/>
```

### Input.Decimal

Decimal number input with precision controls.

```tsx
interface InputDecimalProps extends BaseInputProps<number> {
  min?: number
  max?: number
  precision?: number // Number of decimal places
}

<Input.Decimal 
  label="Price"
  min={0}
  precision={2}
  placeholder="0.00"
  leftIcon={IconType.DOLLAR}
/>

<Input.Decimal 
  label="Weight (kg)"
  precision={1}
  min={0}
  max={500}
/>
```

### Input.Tel

Phone number input with local and international formatting.

```tsx
interface InputTelProps extends BaseInputProps<string> {
  isInternational?: boolean
  isLocal?: boolean // Default
  onChange?: (formatted: string, unmasked: string, event: ChangeEvent) => void
}

// Local format: (780) 699-5330
<Input.Tel 
  label="Phone Number"
  isLocal
/>

// International format: +1 (780) 699-5330
<Input.Tel 
  label="International Phone"
  isInternational
/>
```

### Input.TextArea

Multi-line text area with height controls and resize options.

```tsx
interface InputTextAreaProps extends BaseInputProps<string> {
  height?: number // Number of rows
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
}

<Input.TextArea 
  label="Description"
  height={4}
  resize="vertical"
  placeholder="Enter description..."
/>

<Input.TextArea 
  label="Comments"
  height={6}
  resize="none"
  maxLength={500}
/>
```

### Input.Date

Date picker input using native HTML date input.

```tsx
<Input.Date 
  label="Date of Birth"
  required
/>

<Input.Date 
  label="Event Date"
  min="2024-01-01"
  max="2024-12-31"
/>
```

### Input.Range

Slider/range input with ticks, marks, and value display.

```tsx
interface InputRangeProps extends BaseInputProps<number> {
  min?: number
  max?: number
  step?: number
  showValue?: boolean
  showTicks?: boolean
  tickStep?: number
  marks?: { value: number; label?: string }[]
  orientation?: 'horizontal' | 'vertical'
}

<Input.Range 
  label="Volume"
  min={0}
  max={100}
  defaultValue={50}
  showValue
  showTicks
/>

<Input.Range 
  label="Price Range"
  min={0}
  max={1000}
  step={50}
  marks={[
    { value: 0, label: '$0' },
    { value: 500, label: '$500' },
    { value: 1000, label: '$1000' }
  ]}
/>
```

### Input.File

File upload with drag-and-drop, validation, and preview support.

```tsx
interface InputFileProps extends BaseInputProps<File[]> {
  accept?: string
  multiple?: boolean
  dragAndDrop?: boolean
  showPreview?: boolean
  previewSize?: 'sm' | 'md' | 'lg'
  validation?: {
    maxSize?: number // in bytes
    minSize?: number
    maxFiles?: number
    allowedTypes?: string[] // MIME types or extensions
  }
}

// Basic file upload
<Input.File 
  label="Profile Picture"
  accept="image/*"
  validation={{ maxSize: 5 * 1024 * 1024 }} // 5MB
/>

// Multiple files with validation
<Input.File 
  label="Documents"
  multiple
  accept=".pdf,.doc,.docx"
  validation={{
    maxFiles: 5,
    maxSize: 10 * 1024 * 1024, // 10MB per file
    allowedTypes: ['.pdf', '.doc', '.docx']
  }}
/>
```

### Input.ColorPicker

Comprehensive color picker with multiple formats and advanced features.

```tsx
interface InputColorPickerProps extends BaseInputProps<string> {
  format?: 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hsv'
  showAlpha?: boolean
  showPresets?: boolean
  presetColors?: string[]
  swatchSize?: 'sm' | 'md' | 'lg'
  showInput?: boolean
  showEyeDropper?: boolean
  pickerStyle?: 'wheel' | 'gradient' | 'swatches'
}

// Basic color picker
<Input.ColorPicker 
  label="Theme Color"
  format="hex"
  defaultValue="#3b82f6"
/>

// Advanced color picker with alpha
<Input.ColorPicker 
  label="Background Color"
  format="rgba"
  showAlpha
  showEyeDropper
  presetColors={['#FF0000', '#00FF00', '#0000FF', '#FFFF00']}
/>
```

## Advanced Examples

### Form with Validation

```tsx
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.message) newErrors.message = 'Message is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      // Submit form
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input.Text 
        label="Full Name"
        value={formData.name}
        onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
        error={errors.name}
        required
        leftIcon={IconType.USER}
      />
      
      <Input.Email 
        label="Email Address"
        value={formData.email}
        onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
        error={errors.email}
        required
        leftIcon={IconType.MAIL}
      />
      
      <Input.Tel 
        label="Phone Number"
        value={formData.phone}
        onChange={(formatted, unmasked) => setFormData(prev => ({ ...prev, phone: unmasked }))}
        leftIcon={IconType.PHONE}
      />
      
      <Input.TextArea 
        label="Message"
        value={formData.message}
        onChange={(value) => setFormData(prev => ({ ...prev, message: value }))}
        error={errors.message}
        required
        height={4}
      />
      
      <button type="submit">Send Message</button>
    </form>
  )
}
```

### Dynamic Form Builder

```tsx
const DynamicForm = ({ fields }) => {
  const [values, setValues] = useState({})
  
  const renderField = (field) => {
    const commonProps = {
      key: field.name,
      label: field.label,
      value: values[field.name] || '',
      onChange: (value) => setValues(prev => ({ ...prev, [field.name]: value })),
      required: field.required,
      error: field.error
    }
    
    switch (field.type) {
      case 'text':
        return <Input.Text {...commonProps} />
      case 'email':
        return <Input.Email {...commonProps} />
      case 'number':
        return <Input.Number {...commonProps} min={field.min} max={field.max} />
      case 'date':
        return <Input.Date {...commonProps} />
      case 'file':
        return <Input.File {...commonProps} accept={field.accept} />
      case 'color':
        return <Input.ColorPicker {...commonProps} format={field.format} />
      default:
        return <Input.Text {...commonProps} />
    }
  }
  
  return (
    <div className="space-y-4">
      {fields.map(renderField)}
    </div>
  )
}
```

## Styling & Theming

All components use CSS variables for theming and can be customized using Tailwind CSS classes.

### CSS Variables

```css
:root {
  --input-border-color: theme(colors.gray.300);
  --input-border-focus: theme(colors.blue.500);
  --input-background: theme(colors.white);
  --input-text: theme(colors.gray.900);
  --input-placeholder: theme(colors.gray.500);
  --input-error: theme(colors.red.500);
}
```

### Custom Styling

```tsx
// Using className prop
<Input.Text 
  className="border-purple-300 focus:border-purple-500"
  label="Custom Styled Input"
/>

// Using variant and size
<Input.Text 
  variant="filled"
  size="lg"
  radius="full"
  label="Styled Input"
/>
```

## Accessibility

All Input components follow ARIA guidelines and best practices:

- Proper labeling with `htmlFor` associations
- ARIA attributes for screen readers
- Keyboard navigation support
- Focus management
- Error announcements
- Required field indicators

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### EyeDropper API

The `showEyeDropper` feature in `Input.ColorPicker` requires the EyeDropper API, which is currently supported in:
- Chrome 95+
- Edge 95+

## Performance

- Lazy loading for complex components
- Optimized re-renders with proper memoization
- Tree-shakable imports for minimal bundle size
- No external dependencies beyond React

## Migration Guide

### From v1.x to v2.x

The Input system was completely rewritten in v2.0 with breaking changes:

```tsx
// v1.x
<TextInput value={value} onChange={setValue} />

// v2.x
<Input.Text value={value} onChange={(newValue) => setValue(newValue)} />
```

Key changes:
- All inputs are now under the `Input` namespace
- `onChange` callbacks now provide the typed value as the first parameter
- Validation is now handled via the `validator` prop
- Icons use the `IconType` enum instead of string names

## Contributing

See our [Contributing Guide](../CONTRIBUTING.md) for information on how to contribute to the Input system.

## License

MIT License - see [LICENSE](../LICENSE) file for details.