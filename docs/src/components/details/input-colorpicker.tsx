import { useState } from 'react'
import { Input } from '@acomponents/core'

// Example component
export const InputColorPickerPreview = () => {
  const [themeColor, setThemeColor] = useState('#3b82f6')
  const [backgroundColorWithAlpha, setBackgroundColorWithAlpha] = useState('rgba(59, 130, 246, 0.5)')
  
  return (
    <div className="space-y-6 max-w-md">
      {/* Basic Color Picker */}
      <div className="space-y-3">
        <Input.ColorPicker 
          label="Theme Color"
          format="hex"
          value={themeColor}
          onChange={(val) => setThemeColor(val)}
          showPresets
          clearable
        />
        <div 
          className="w-full h-12 rounded-lg border-2 border-gray-200"
          style={{ backgroundColor: themeColor }}
        />
      </div>

      {/* Advanced Color Picker */}
      <div className="space-y-3">
        <Input.ColorPicker 
          label="Background Color"
          format="rgba"
          value={backgroundColorWithAlpha}
          onChange={(val) => setBackgroundColorWithAlpha(val)}
          showAlpha
          showEyeDropper
          showPresets
          presetColors={[
            '#FF0000', '#FF4500', '#FFA500', '#FFD700', 
            '#00FF00', '#00FFFF', '#0000FF', '#8A2BE2'
          ]}
          swatchSize="lg"
        />
        <div 
          className="w-full h-12 rounded-lg border-2 border-gray-200 relative overflow-hidden"
        >
          {/* Checkered background pattern */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(45deg, #ccc 25%, transparent 25%), 
                               linear-gradient(-45deg, #ccc 25%, transparent 25%), 
                               linear-gradient(45deg, transparent 75%, #ccc 75%), 
                               linear-gradient(-45deg, transparent 75%, #ccc 75%)`,
              backgroundSize: '16px 16px',
              backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px'
            }}
          />
          <div 
            className="absolute inset-0"
            style={{ backgroundColor: backgroundColorWithAlpha }}
          />
        </div>
      </div>
    </div>
  )
}

// Component details
const InputColorPickerDetails = {
  description: 'Comprehensive color picker with multiple formats, alpha support, presets, and eye dropper tool.',
  features: [
    'Multiple color formats (hex, rgb, rgba, hsl, hsla, hsv)',
    'Alpha transparency support with visual feedback',
    'Color presets with customizable swatch colors',
    'Eye dropper tool for screen color picking',
    'Real-time color preview and validation',
    'Gradient and wheel picker styles',
    'Keyboard shortcuts and accessibility support'
  ],
  props: [
    {
      name: 'label',
      type: 'string',
      required: false,
      description: 'Label text displayed above the input'
    },
    {
      name: 'value',
      type: 'string',
      required: false,
      description: 'The controlled color value'
    },
    {
      name: 'onChange',
      type: '(value: string) => void',
      required: false,
      description: 'Callback fired when color value changes'
    },
    {
      name: 'format',
      type: "'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hsv'",
      required: false,
      default: "'hex'",
      description: 'Color format for input and output values'
    },
    {
      name: 'showAlpha',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Show alpha/opacity controls'
    },
    {
      name: 'showPresets',
      type: 'boolean',
      required: false,
      default: 'true',
      description: 'Show preset color swatches'
    },
    {
      name: 'presetColors',
      type: 'string[]',
      required: false,
      description: 'Custom array of preset colors to display'
    },
    {
      name: 'swatchSize',
      type: "'sm' | 'md' | 'lg'",
      required: false,
      default: "'md'",
      description: 'Size of color swatches and preview'
    },
    {
      name: 'showInput',
      type: 'boolean',
      required: false,
      default: 'true',
      description: 'Show text input for manual color entry'
    },
    {
      name: 'showEyeDropper',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Show eye dropper tool (requires browser support)'
    }
  ],
  examples: [
    {
      title: 'Color Picker with Alpha Support',
      description: 'Color pickers with different formats, alpha transparency, and preset colors.',
      code: `<div className="space-y-6 max-w-md">
  {/* Basic Color Picker */}
  <Input.ColorPicker 
    label="Theme Color"
    format="hex"
    showPresets
    clearable
  />

  {/* Advanced Color Picker */}
  <Input.ColorPicker 
    label="Background Color"
    format="rgba"
    showAlpha
    showEyeDropper
    showPresets
    presetColors={[
      '#FF0000', '#FF4500', '#FFA500', '#FFD700', 
      '#00FF00', '#00FFFF', '#0000FF', '#8A2BE2'
    ]}
    swatchSize="lg"
  />
</div>`,
      preview: InputColorPickerPreview
    }
  ]
}

export default InputColorPickerDetails