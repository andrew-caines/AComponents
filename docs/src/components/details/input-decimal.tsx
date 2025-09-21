import { useState } from 'react'
import { Input, IconType } from '@acomponents/core'

// Example component
export const InputDecimalPreview = () => {
  const [price, setPrice] = useState<number | undefined>()
  const [weight, setWeight] = useState<number | undefined>()
  const [temperature, setTemperature] = useState<number | undefined>()
  
  return (
    <div className="space-y-4 max-w-md">
      <Input.Decimal 
        label="Price ($)"
        placeholder="0.00"
        min={0}
        precision={2}
        value={price}
        onChange={(val) => setPrice(val)}
        leftIcon={IconType.DOLLAR}
        variant="filled"
      />
      <Input.Decimal 
        label="Weight (kg)"
        placeholder="0.0"
        precision={1}
        min={0}
        max={500}
        value={weight}
        onChange={(val) => setWeight(val)}
        leftIcon={IconType.SCALE}
        clearable
      />
      <Input.Decimal 
        label="Temperature (°C)"
        placeholder="0.0"
        precision={1}
        min={-50}
        max={50}
        value={temperature}
        onChange={(val) => setTemperature(val)}
        variant="outline"
      />
    </div>
  )
}

// Component details
const InputDecimalDetails = {
  description: 'Decimal number input component with precision controls and floating-point validation.',
  features: [
    'Floating-point number input with precision control',
    'Customizable decimal places (0-10)',
    'Min/max value constraints with validation',
    'Automatic decimal formatting and parsing',
    'All standard input features (sizing, variants, icons)',
    'Currency and measurement formatting support',
    'Keyboard shortcuts and number validation'
  ],
  props: [
    {
      name: 'label',
      type: 'string',
      required: false,
      description: 'Label text displayed above the input'
    },
    {
      name: 'placeholder',
      type: 'string',
      required: false,
      description: 'Placeholder text when input is empty'
    },
    {
      name: 'value',
      type: 'number | undefined',
      required: false,
      description: 'The controlled decimal value'
    },
    {
      name: 'onChange',
      type: '(value: number | undefined) => void',
      required: false,
      description: 'Callback fired when decimal value changes'
    },
    {
      name: 'precision',
      type: 'number',
      required: false,
      default: '2',
      description: 'Number of decimal places to allow (0-10)'
    },
    {
      name: 'min',
      type: 'number',
      required: false,
      description: 'Minimum allowed value'
    },
    {
      name: 'max',
      type: 'number',
      required: false,
      description: 'Maximum allowed value'
    },
    {
      name: 'step',
      type: 'number',
      required: false,
      description: 'Step size for increment/decrement operations'
    },
    {
      name: 'allowNegative',
      type: 'boolean',
      required: false,
      default: 'true',
      description: 'Whether negative numbers are allowed'
    },
    {
      name: 'clearable',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Show clear button when input has value'
    }
  ],
  examples: [
    {
      title: 'Decimal Input with Precision',
      description: 'Decimal inputs with different precision levels and constraints.',
      code: `<div className="space-y-4 max-w-md">
  <Input.Decimal 
    label="Price ($)"
    placeholder="0.00"
    min={0}
    precision={2}
    leftIcon={IconType.DOLLAR}
    variant="filled"
  />
  <Input.Decimal 
    label="Weight (kg)"
    placeholder="0.0"
    precision={1}
    min={0}
    max={500}
    leftIcon={IconType.SCALE}
    clearable
  />
  <Input.Decimal 
    label="Temperature (°C)"
    placeholder="0.0"
    precision={1}
    min={-50}
    max={50}
    variant="outline"
  />
</div>`,
      preview: InputDecimalPreview
    }
  ]
}

export default InputDecimalDetails