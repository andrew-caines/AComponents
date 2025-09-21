import { useState } from 'react'
import { Input, IconType } from '@acomponents/core'

// Example component
export const InputUrlPreview = () => {
  const [website, setWebsite] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  
  return (
    <div className="space-y-4 max-w-md">
      <Input.Url 
        label="Website"
        placeholder="https://example.com"
        value={website}
        onChange={(val) => setWebsite(val)}
        leftIcon={IconType.LINK}
        clearable
      />
      <Input.Url 
        label="GitHub Profile"
        placeholder="https://github.com/username"
        value={githubUrl}
        onChange={(val) => setGithubUrl(val)}
        validator={(value) => value.includes('github.com') || !value}
        error={githubUrl && githubUrl.includes('http') && !githubUrl.includes('github.com') ? "Must be a GitHub URL" : undefined}
        leftIcon={IconType.CODE}
        variant="outline"
      />
    </div>
  )
}

// Component details
const InputUrlDetails = {
  description: 'URL input component with automatic protocol detection and URL validation.',
  features: [
    'Automatic protocol (http/https) detection and addition',
    'URL format validation with regex patterns',
    'Domain validation and formatting',
    'All standard input features (sizing, variants, icons)',
    'Custom URL validation rules',
    'Real-time URL preview and validation',
    'Support for various URL schemes (http, https, ftp, etc.)'
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
      description: 'The controlled URL value'
    },
    {
      name: 'onChange',
      type: '(value: string) => void',
      required: false,
      description: 'Callback fired when URL value changes'
    },
    {
      name: 'validator',
      type: '(value: string) => boolean',
      required: false,
      description: 'Custom validation function for URL format'
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
    },
    {
      name: 'autoProtocol',
      type: 'boolean',
      required: false,
      default: 'true',
      description: 'Automatically add https:// if no protocol specified'
    }
  ],
  examples: [
    {
      title: 'URL Input with Validation',
      description: 'URL inputs with automatic protocol handling and custom domain validation.',
      code: `<div className="space-y-4 max-w-md">
  <Input.Url 
    label="Website"
    placeholder="https://example.com"
    leftIcon={IconType.LINK}
    clearable
  />
  <Input.Url 
    label="GitHub Profile"
    placeholder="https://github.com/username"
    validator={(value) => value.includes('github.com') || !value}
    error={!isValid ? "Must be a GitHub URL" : undefined}
    leftIcon={IconType.CODE}
    variant="outline"
  />
</div>`,
      preview: InputUrlPreview
    }
  ]
}

export default InputUrlDetails