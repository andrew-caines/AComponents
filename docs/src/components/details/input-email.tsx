import { useState } from 'react'
import { Input, IconType } from '@acomponents/core'

// Example component
export const InputEmailPreview = () => {
  const [email, setEmail] = useState('')
  const [workEmail, setWorkEmail] = useState('')
  
  return (
    <div className="space-y-4 max-w-md">
      <Input.Email 
        label="Email Address"
        placeholder="Enter your email"
        value={email}
        onChange={(val) => setEmail(val)}
        leftIcon={IconType.MAIL}
        clearable
        required
      />
      <Input.Email 
        label="Work Email"
        placeholder="name@company.com"
        value={workEmail}
        onChange={(val) => setWorkEmail(val)}
        validator={(value) => value.includes('@company.com') || !value}
        error={workEmail && workEmail.includes('@') && !workEmail.includes('@company.com') ? "Must be a company email" : undefined}
        variant="filled"
      />
    </div>
  )
}

// Component details
const InputEmailDetails = {
  description: 'Email input component with built-in email validation and automatic formatting.',
  features: [
    'Built-in email validation with regex patterns',
    'Automatic @ symbol handling and formatting',
    'Domain validation and suggestion support',
    'All standard input features (sizing, variants, icons)',
    'Custom email validation rules',
    'Real-time validation feedback',
    'Keyboard shortcuts for email completion'
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
      description: 'The controlled email value'
    },
    {
      name: 'onChange',
      type: '(value: string) => void',
      required: false,
      description: 'Callback fired when email value changes'
    },
    {
      name: 'validator',
      type: '(value: string) => boolean',
      required: false,
      description: 'Custom validation function for email format'
    },
    {
      name: 'error',
      type: 'string',
      required: false,
      description: 'Error message to display below the input'
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
      title: 'Email Input with Validation',
      description: 'Email inputs with built-in validation and custom domain requirements.',
      code: `<div className="space-y-4 max-w-md">
  <Input.Email 
    label="Email Address"
    placeholder="Enter your email"
    leftIcon={IconType.MAIL}
    clearable
    required
  />
  <Input.Email 
    label="Work Email"
    placeholder="name@company.com"
    validator={(value) => value.includes('@company.com') || !value}
    error={!isValid ? "Must be a company email" : undefined}
    variant="filled"
  />
</div>`,
      preview: InputEmailPreview
    }
  ]
}

export default InputEmailDetails