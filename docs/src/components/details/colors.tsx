import { useState } from 'react'
import { Copy, Check, Palette } from 'lucide-react'

// Color Swatch Component
const ColorSwatch = ({ 
  color, 
  name, 
  variable, 
  size = 'md' 
}: { 
  color: string
  name: string
  variable?: string
  size?: 'sm' | 'md' | 'lg' 
}) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      <div
        className={`${sizeClasses[size]} rounded-lg border-2 border-gray-200 cursor-pointer transition-all hover:scale-105 hover:shadow-md relative group`}
        style={{ backgroundColor: color }}
        onClick={() => copyToClipboard(variable || color)}
        title={`Click to copy: ${variable || color}`}
      >
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg flex items-center justify-center transition-all">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            {copied ? (
              <Check className="w-5 h-5 text-white" />
            ) : (
              <Copy className="w-4 h-4 text-white" />
            )}
          </div>
        </div>
      </div>
      <div className="text-center">
        <div className="text-sm font-medium text-gray-900">{name}</div>
        <div className="text-xs text-gray-500 font-mono">{variable || color}</div>
      </div>
    </div>
  )
}

// Example component
export const ColorsPreview = () => {
  // Primary Color Palette
  const primaryColors = [
    { name: 'Primary', color: '#3b82f6', variable: '--primary' },
    { name: 'Primary Foreground', color: '#ffffff', variable: '--primary-foreground' },
    { name: 'Secondary', color: '#f1f5f9', variable: '--secondary' },
    { name: 'Secondary Foreground', color: '#1e293b', variable: '--secondary-foreground' },
  ]

  // Status Colors
  const statusColors = [
    { name: 'Success', color: '#10b981', variable: '--success' },
    { name: 'Warning', color: '#f59e0b', variable: '--warning' },
    { name: 'Destructive', color: '#ef4444', variable: '--destructive' },
    { name: 'Destructive Foreground', color: '#ffffff', variable: '--destructive-foreground' },
  ]

  // Base Colors
  const baseColors = [
    { name: 'Background', color: '#ffffff', variable: '--background' },
    { name: 'Foreground', color: '#1f2937', variable: '--foreground' },
    { name: 'Border', color: '#d1d5db', variable: '--border' },
    { name: 'Input', color: '#d1d5db', variable: '--input' },
    { name: 'Ring', color: '#3b82f6', variable: '--ring' },
  ]

  // Accent Colors
  const accentColors = [
    { name: 'Accent', color: '#f9fafb', variable: '--accent' },
    { name: 'Accent Foreground', color: '#374151', variable: '--accent-foreground' },
  ]

  // Extended Color Palette
  const extendedColors = [
    { name: 'Slate 50', color: '#f8fafc' },
    { name: 'Slate 100', color: '#f1f5f9' },
    { name: 'Slate 200', color: '#e2e8f0' },
    { name: 'Slate 300', color: '#cbd5e1' },
    { name: 'Slate 400', color: '#94a3b8' },
    { name: 'Slate 500', color: '#64748b' },
    { name: 'Slate 600', color: '#475569' },
    { name: 'Slate 700', color: '#334155' },
    { name: 'Slate 800', color: '#1e293b' },
    { name: 'Slate 900', color: '#0f172a' },
  ]

  return (
    <div className="space-y-12 max-w-6xl">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <Palette className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Color System</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A comprehensive color palette with CSS variables for consistent theming across your components.
        </p>
      </div>

      {/* Primary Colors */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Primary Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {primaryColors.map((color, index) => (
            <ColorSwatch
              key={index}
              color={color.color}
              name={color.name}
              variable={color.variable}
              size="lg"
            />
          ))}
        </div>
      </div>

      {/* Status Colors */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Status Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statusColors.map((color, index) => (
            <ColorSwatch
              key={index}
              color={color.color}
              name={color.name}
              variable={color.variable}
              size="lg"
            />
          ))}
        </div>
      </div>

      {/* Base Colors */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Base Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {baseColors.map((color, index) => (
            <ColorSwatch
              key={index}
              color={color.color}
              name={color.name}
              variable={color.variable}
              size="md"
            />
          ))}
        </div>
      </div>

      {/* Accent Colors */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Accent Colors</h2>
        <div className="grid grid-cols-2 gap-6">
          {accentColors.map((color, index) => (
            <ColorSwatch
              key={index}
              color={color.color}
              name={color.name}
              variable={color.variable}
              size="lg"
            />
          ))}
        </div>
      </div>

      {/* Extended Palette */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Extended Palette</h2>
        <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
          {extendedColors.map((color, index) => (
            <ColorSwatch
              key={index}
              color={color.color}
              name={color.name}
              size="sm"
            />
          ))}
        </div>
      </div>

      {/* Usage Examples */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Usage Examples</h2>
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* CSS Variables */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-gray-900 mb-2">CSS Variables</h3>
              <pre className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
{`color: var(--primary);
background: var(--background);
border: var(--border);`}
              </pre>
            </div>

            {/* Tailwind Classes */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-gray-900 mb-2">Tailwind Classes</h3>
              <pre className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
{`className="bg-primary 
text-primary-foreground 
border-border"`}
              </pre>
            </div>

            {/* Component Usage */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-gray-900 mb-2">Component Usage</h3>
              <pre className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
{`<Button 
  variant="primary"
  className="bg-primary"
/>`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Color Variables Reference */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">CSS Variables Reference</h2>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <pre className="text-sm text-gray-800 overflow-x-auto">
{`:root {
  /* Primary colors */
  --primary: #3b82f6;
  --primary-foreground: #ffffff;
  
  /* Secondary colors */
  --secondary: #f1f5f9;
  --secondary-foreground: #1e293b;
  
  /* Status colors */
  --success: #10b981;
  --warning: #f59e0b;
  --destructive: #ef4444;
  --destructive-foreground: #ffffff;
  
  /* Base colors */
  --background: #ffffff;
  --foreground: #1f2937;
  --border: #d1d5db;
  --input: #d1d5db;
  --ring: #3b82f6;
  
  /* Accent colors */
  --accent: #f9fafb;
  --accent-foreground: #374151;
}`}
          </pre>
        </div>
      </div>
    </div>
  )
}

// Component details
const ColorsDetails = {
  description: 'A comprehensive color system with CSS variables, swatches, and usage examples for consistent theming.',
  features: [
    'CSS custom properties for dynamic theming',
    'Semantic color naming convention',
    'Light and dark theme support',
    'Tailwind CSS integration',
    'Accessible color contrast ratios',
    'Copy-to-clipboard functionality',
    'Visual color preview and organization'
  ],
  props: [
    {
      name: 'CSS Variables',
      type: 'Custom Properties',
      required: false,
      description: 'All colors are defined as CSS custom properties for easy theming'
    },
    {
      name: 'Tailwind Integration',
      type: 'Utility Classes',
      required: false,
      description: 'Colors are mapped to Tailwind utility classes for rapid development'
    }
  ],
  examples: [
    {
      title: 'Color Palette Showcase',
      description: 'Complete color system with swatches, CSS variables, and usage examples.',
      code: `// CSS Variables Usage
:root {
  --primary: #3b82f6;
  --primary-foreground: #ffffff;
  --background: #ffffff;
  --foreground: #1f2937;
}

// Tailwind Classes
<div className="bg-primary text-primary-foreground">
  Primary colored element
</div>

// Direct CSS
.my-element {
  background-color: var(--primary);
  color: var(--primary-foreground);
}`,
      preview: ColorsPreview
    }
  ]
}

export default ColorsDetails