import { useState } from 'react'
import { Input } from '@acomponents/core'

// Example component
export const InputRangePreview = () => {
  const [volume, setVolume] = useState(50)
  const [priceRange, setPriceRange] = useState(500)
  
  return (
    <div className="space-y-6 max-w-md">
      <Input.Range 
        label="Volume"
        min={0}
        max={100}
        value={volume}
        onChange={(val) => setVolume(val)}
        showValue
        showTicks
        tickStep={10}
      />
      <Input.Range 
        label="Price Range"
        min={0}
        max={1000}
        step={50}
        value={priceRange}
        onChange={(val) => setPriceRange(val)}
        marks={[
          { value: 0, label: '$0' },
          { value: 250, label: '$250' },
          { value: 500, label: '$500' },
          { value: 750, label: '$750' },
          { value: 1000, label: '$1000' }
        ]}
        showValue
      />
      <div className="bg-gray-50 p-3 rounded-md text-sm">
        Volume: {volume}% | Price: ${priceRange}
      </div>
    </div>
  )
}

// Component details
const InputRangeDetails = {
  description: 'Range slider input component with customizable ticks, marks, and value display.',
  features: [
    'Smooth slider interaction with mouse and keyboard',
    'Customizable min/max values and step size',
    'Visual tick marks with configurable intervals',
    'Custom marks with labels at specific values',
    'Real-time value display and formatting',
    'All standard input features (sizing, variants)',
    'Accessibility support with ARIA attributes'
  ],
  props: [
    {
      name: 'label',
      type: 'string',
      required: false,
      description: 'Label text displayed above the slider'
    },
    {
      name: 'value',
      type: 'number',
      required: false,
      description: 'The controlled slider value'
    },
    {
      name: 'onChange',
      type: '(value: number) => void',
      required: false,
      description: 'Callback fired when slider value changes'
    },
    {
      name: 'min',
      type: 'number',
      required: false,
      default: '0',
      description: 'Minimum slider value'
    },
    {
      name: 'max',
      type: 'number',
      required: false,
      default: '100',
      description: 'Maximum slider value'
    },
    {
      name: 'step',
      type: 'number',
      required: false,
      default: '1',
      description: 'Step size for slider movement'
    },
    {
      name: 'showValue',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Display current value above the slider'
    },
    {
      name: 'showTicks',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Show tick marks along the slider'
    },
    {
      name: 'tickStep',
      type: 'number',
      required: false,
      description: 'Interval for tick mark placement'
    },
    {
      name: 'marks',
      type: '{ value: number, label: string }[]',
      required: false,
      description: 'Custom marks with labels at specific positions'
    }
  ],
  examples: [
    {
      title: 'Range Input with Ticks and Marks',
      description: 'Range sliders with tick marks, custom marks, and value display.',
      code: `<div className="space-y-6 max-w-md">
  <Input.Range 
    label="Volume"
    min={0}
    max={100}
    showValue
    showTicks
    tickStep={10}
  />
  <Input.Range 
    label="Price Range"
    min={0}
    max={1000}
    step={50}
    marks={[
      { value: 0, label: '$0' },
      { value: 250, label: '$250' },
      { value: 500, label: '$500' },
      { value: 750, label: '$750' },
      { value: 1000, label: '$1000' }
    ]}
    showValue
  />
</div>`,
      preview: InputRangePreview
    }
  ]
}

export default InputRangeDetails