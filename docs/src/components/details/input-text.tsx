import { useState } from 'react'
import { Input, IconType } from '@acomponents/core'

// Example component
export const InputTextPreview = () => {
  const [value, setValue] = useState('')
  
  return (
    <div className="max-w-md">
      <Input.Text 
        label="Full Name"
        placeholder="Enter your name"
        value={value}
        onChange={(val) => setValue(val)}
        leftIcon={IconType.USER}
        clearable
      />
    </div>
  )
}

// Component details
const InputTextDetails = {
  description: 'Basic text input component with icons, validation, and clearable functionality.',
  features: [
    'Text input with controlled/uncontrolled support',
    'Left and right icon support',
    'Multiple size variants (sm, default, md, lg, xl)',
    '4 style variants (default, outline, filled, underline)',
    'Clearable functionality',
    'Error states and validation',
    'TypeScript support'
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
      type: 'string',
      required: false,
      description: 'The controlled input value'
    },
    {
      name: 'onChange',
      type: '(value: string) => void',
      required: false,
      description: 'Callback fired when input value changes'
    },
    {
      name: 'leftIcon',
      type: 'IconType',
      required: false,
      description: 'Icon to display on the left side'
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
      title: 'Basic Text Input',
      description: 'Simple text input with icon and clearable functionality.',
      code: `<Input.Text 
  label="Full Name"
  placeholder="Enter your name"
  leftIcon={IconType.USER}
  clearable
/>`,
      preview: InputTextPreview
    }
  ]
}

export default InputTextDetails