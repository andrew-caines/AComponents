import { useState } from 'react'
import { Input, IconType } from '@acomponents/core'

// Example component
export const InputNumberPreview = () => {
  const [age, setAge] = useState<number | undefined>()
  const [quantity, setQuantity] = useState<number | undefined>(1)
  const [rating, setRating] = useState<number | undefined>()
  
  return (
    <div className="space-y-4 max-w-md">
      <Input.Number 
        label="Age"
        placeholder="Enter your age"
        min={0}
        max={150}
        value={age}
        onChange={(val) => setAge(val)}
        leftIcon={IconType.USER}
        clearable
      />
      <Input.Number 
        label="Quantity"
        min={1}
        max={99}
        value={quantity}
        onChange={(val) => setQuantity(val)}
        step={1}
        variant="filled"
        description="Select between 1 and 99 items"
      />
      <Input.Number 
        label="Rating"
        min={1}
        max={5}
        step={1}
        value={rating}
        onChange={(val) => setRating(val)}
        placeholder="1-5 stars"
        leftIcon={IconType.STAR}
        variant="outline"
      />
    </div>
  )
}

// Component details
const InputNumberDetails = {
  description: 'Number input component for integer values with min/max constraints and step controls.',
  features: [
    'Integer-only input validation',
    'Min/max value constraints with validation',
    'Step controls for increment/decrement',
    'Automatic number formatting and parsing',
    'All standard input features (sizing, variants, icons)',
    'Keyboard shortcuts (arrow keys, page up/down)',
    'Custom validation rules for number ranges'
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
      description: 'The controlled number value'
    },
    {
      name: 'onChange',
      type: '(value: number | undefined) => void',
      required: false,
      description: 'Callback fired when number value changes'
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
      default: '1',
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
    },
    {
      name: 'leftIcon',
      type: 'IconType',
      required: false,
      description: 'Icon to display on the left side'
    }
  ],
  examples: [
    {
      title: 'Number Input with Constraints',
      description: 'Number inputs with min/max values, step controls, and validation.',
      code: `<div className="space-y-4 max-w-md">
  <Input.Number 
    label="Age"
    placeholder="Enter your age"
    min={0}
    max={150}
    leftIcon={IconType.USER}
    clearable
  />
  <Input.Number 
    label="Quantity"
    min={1}
    max={99}
    step={1}
    variant="filled"
    description="Select between 1 and 99 items"
  />
  <Input.Number 
    label="Rating"
    min={1}
    max={5}
    step={1}
    placeholder="1-5 stars"
    leftIcon={IconType.STAR}
    variant="outline"
  />
</div>`,
      preview: InputNumberPreview
    }
  ]
}

export default InputNumberDetails