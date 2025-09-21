import { useState } from 'react'
import { Input } from '@acomponents/core'

// Example component
export const InputPasswordPreview = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  return (
    <div className="space-y-4 max-w-md">
      <Input.Password 
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChange={(val) => setPassword(val)}
        required
      />
      <Input.Password 
        label="Confirm Password"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChange={(val) => setConfirmPassword(val)}
        error={password !== confirmPassword && confirmPassword ? "Passwords don't match" : undefined}
        required
      />
    </div>
  )
}

// Component details
const InputPasswordDetails = {
  description: 'Password input with toggleable visibility using eye icons and validation support.',
  features: [
    'Toggleable visibility with eye icon',
    'Automatic show/hide password functionality',
    'Built-in password validation support',
    'All standard input features (sizing, variants, icons)',
    'Secure text masking',
    'Custom validation for password strength'
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
      description: 'The controlled password value'
    },
    {
      name: 'onChange',
      type: '(value: string) => void',
      required: false,
      description: 'Callback fired when password changes'
    },
    {
      name: 'required',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Whether the input is required'
    },
    {
      name: 'error',
      type: 'string',
      required: false,
      description: 'Error message to display below the input'
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Whether the input is disabled'
    },
    {
      name: 'size',
      type: "'sm' | 'default' | 'md' | 'lg' | 'xl'",
      required: false,
      default: "'default'",
      description: 'The size variant of the input'
    },
    {
      name: 'variant',
      type: "'default' | 'outline' | 'filled' | 'underline'",
      required: false,
      default: "'default'",
      description: 'The visual style variant of the input'
    },
    {
      name: 'className',
      type: 'string',
      required: false,
      description: 'Additional CSS classes to apply'
    }
  ],
  examples: [
    {
      title: 'Password Input with Confirmation',
      description: 'Password inputs with visibility toggle and confirmation validation.',
      code: `<div className="space-y-4 max-w-md">
  <Input.Password 
    label="Password"
    placeholder="Enter your password"
    required
  />
  <Input.Password 
    label="Confirm Password"
    placeholder="Confirm your password"
    error={password !== confirmPassword ? "Passwords don't match" : undefined}
    required
  />
</div>`,
      preview: InputPasswordPreview
    }
  ]
}

export default InputPasswordDetails