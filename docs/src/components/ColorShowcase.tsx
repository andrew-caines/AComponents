import { useEffect, useState } from 'react'
import { Palette, Copy, Check } from 'lucide-react'

interface ColorInfo {
  name: string
  variable: string
  value: string
  category: string
}

interface ColorShowcaseProps {
  colorData: {
    id: string
    name: string
    description: string
    category: string
  }
}

export function ColorShowcase({ colorData }: ColorShowcaseProps) {
  const [colors, setColors] = useState<ColorInfo[]>([])
  const [copiedColor, setCopiedColor] = useState<string | null>(null)

  useEffect(() => {
    // Get computed styles from the root element
    const rootStyles = getComputedStyle(document.documentElement)
    
    // Define the color variables we want to showcase
    const colorVariables = [
      { name: 'Primary', variable: '--primary', category: 'Primary' },
      { name: 'Primary Foreground', variable: '--primary-foreground', category: 'Primary' },
      { name: 'Secondary', variable: '--secondary', category: 'Secondary' },
      { name: 'Secondary Foreground', variable: '--secondary-foreground', category: 'Secondary' },
      { name: 'Destructive', variable: '--destructive', category: 'Status' },
      { name: 'Destructive Foreground', variable: '--destructive-foreground', category: 'Status' },
      { name: 'Background', variable: '--background', category: 'Base' },
      { name: 'Foreground', variable: '--foreground', category: 'Base' },
      { name: 'Border', variable: '--border', category: 'UI Elements' },
      { name: 'Input', variable: '--input', category: 'UI Elements' },
      { name: 'Ring', variable: '--ring', category: 'UI Elements' },
      { name: 'Accent', variable: '--accent', category: 'Accent' },
      { name: 'Accent Foreground', variable: '--accent-foreground', category: 'Accent' },
    ]

    // Extract color values
    const extractedColors = colorVariables.map(({ name, variable, category }) => ({
      name,
      variable,
      value: rootStyles.getPropertyValue(variable).trim(),
      category,
    }))

    setColors(extractedColors)
  }, [])

  const copyToClipboard = async (text: string, colorName: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedColor(colorName)
      setTimeout(() => setCopiedColor(null), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  // Group colors by category
  const groupedColors = colors.reduce((acc, color) => {
    if (!acc[color.category]) {
      acc[color.category] = []
    }
    acc[color.category].push(color)
    return acc
  }, {} as Record<string, ColorInfo[]>)

  const ColorBox = ({ color, size }: { color: ColorInfo; size: 'large' | 'medium' | 'small' }) => {
    const sizeClasses = {
      large: 'w-48 h-48', // ~200px
      medium: 'w-24 h-24', // ~100px  
      small: 'w-4 h-4',    // ~16px (about 8pt font size)
    }

    const textSizeClasses = {
      large: 'text-sm',
      medium: 'text-xs',
      small: 'text-[0px]', // Hide text for smallest size
    }

    return (
      <div className="flex flex-col items-center space-y-2">
        <div
          className={`${sizeClasses[size]} rounded-lg shadow-md border-2 border-gray-200 relative group cursor-pointer transition-all hover:scale-105 hover:shadow-lg`}
          style={{ backgroundColor: `var(${color.variable})` }}
          onClick={() => copyToClipboard(`var(${color.variable})`, color.name)}
          title={`${color.name}: ${color.value}`}
        >
          {size !== 'small' && (
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg flex items-center justify-center transition-all">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                {copiedColor === color.name ? (
                  <Check className="w-6 h-6 text-white" />
                ) : (
                  <Copy className="w-6 h-6 text-white" />
                )}
              </div>
            </div>
          )}
        </div>
        
        {size !== 'small' && (
          <div className="text-center">
            <div className={`font-medium text-gray-900 ${textSizeClasses[size]}`}>
              {color.name}
            </div>
            <div className={`text-gray-500 font-mono ${textSizeClasses[size]}`}>
              {color.variable}
            </div>
            <div className={`text-gray-400 text-xs ${size === 'large' ? 'block' : 'hidden'}`}>
              {color.value}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <Palette className="h-8 w-8 text-blue-600" />
              {colorData.name}
            </h1>
            <p className="text-lg text-gray-600">{colorData.description}</p>
          </div>
          <div className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
            {colorData.category}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>💡 Tip:</strong> Click any color box to copy the CSS variable to your clipboard. 
            These colors are automatically synchronized with your design system variables.
          </p>
        </div>
      </div>

      {/* Color Categories */}
      {Object.entries(groupedColors).map(([category, categoryColors]) => (
        <div key={category} className="bg-white rounded-lg shadow-sm border">
          <div className="border-b px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-900">{category}</h2>
          </div>
          
          <div className="p-6">
            {/* Large Size */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Large (200px)</h3>
              <div className="flex flex-wrap gap-6">
                {categoryColors.map((color) => (
                  <ColorBox key={`${color.name}-large`} color={color} size="large" />
                ))}
              </div>
            </div>

            {/* Medium Size */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Medium (100px)</h3>
              <div className="flex flex-wrap gap-4">
                {categoryColors.map((color) => (
                  <ColorBox key={`${color.name}-medium`} color={color} size="medium" />
                ))}
              </div>
            </div>

            {/* Small Size */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Small (16px)</h3>
              <div className="flex flex-wrap gap-2 items-center">
                {categoryColors.map((color) => (
                  <div key={`${color.name}-small`} className="flex items-center gap-2">
                    <ColorBox color={color} size="small" />
                    <span className="text-sm text-gray-600">{color.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* CSS Variables Reference */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900">CSS Variables Reference</h2>
        </div>
        
        <div className="p-6">
          <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-gray-800">
{`:root {
${colors.map(color => `  ${color.variable}: ${color.value};`).join('\n')}
}`}
            </pre>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            <p className="mb-2">
              <strong>Usage in CSS:</strong> <code className="bg-gray-100 px-2 py-1 rounded">color: var(--primary);</code>
            </p>
            <p>
              <strong>Usage in Tailwind:</strong> <code className="bg-gray-100 px-2 py-1 rounded">className="bg-primary text-primary-foreground"</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}