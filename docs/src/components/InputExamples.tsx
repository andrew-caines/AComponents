import { useState } from 'react'
import { Input, IconType } from '@acomponents/core'

// Basic Input Examples
export const BasicInputExample = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  
  return (
    <div className="space-y-4 max-w-md">
      <Input.Text 
        label="Full Name"
        placeholder="Enter your name"
        value={name}
        onChange={(value) => setName(value)}
        leftIcon={IconType.USER}
        clearable
      />
      <Input.Email 
        label="Email Address"
        placeholder="Enter your email"
        value={email}
        onChange={(value) => setEmail(value)}
        required
      />
    </div>
  )
}

// Input Variants Example
export const InputVariantsExample = () => (
  <div className="space-y-4 max-w-md">
    <Input.Text 
      label="Default"
      placeholder="Default variant"
      variant="default"
    />
    <Input.Text 
      label="Filled"
      placeholder="Filled variant"
      variant="filled"
    />
    <Input.Text 
      label="Outline"
      placeholder="Outline variant"
      variant="outline"
    />
    <Input.Text 
      label="Underline"
      placeholder="Underline variant"
      variant="underline"
    />
  </div>
)

// Input Sizes Example
export const InputSizesExample = () => (
  <div className="space-y-4 max-w-md">
    <Input.Text 
      label="Small"
      placeholder="Small size"
      size="sm"
    />
    <Input.Text 
      label="Default"
      placeholder="Default size"
      size="default"
    />
    <Input.Text 
      label="Medium"
      placeholder="Medium size"
      size="md"
    />
    <Input.Text 
      label="Large"
      placeholder="Large size"
      size="lg"
    />
    <Input.Text 
      label="Extra Large"
      placeholder="Extra large size"
      size="xl"
    />
  </div>
)

// Password Input Example
export const PasswordInputExample = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  return (
    <div className="space-y-4 max-w-md">
      <Input.Password 
        label="Password"
        placeholder="Enter password"
        value={password}
        onChange={(value) => setPassword(value)}
        required
      />
      <Input.Password 
        label="Confirm Password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(value) => setConfirmPassword(value)}
        error={password !== confirmPassword && confirmPassword ? "Passwords don't match" : undefined}
        required
      />
    </div>
  )
}

// Specialized Inputs Example
export const SpecializedInputsExample = () => {
  const [searchTerm, setSearchTerm] = useState('')
  
  return (
    <div className="space-y-4 max-w-md">
      <Input.Search 
        label="Search"
        placeholder="Type to search..."
        value={searchTerm}
        onChange={(value) => setSearchTerm(value)}
        onSearch={(query) => console.log('Searching for:', query)}
        clearable
      />
      <Input.Tel 
        label="Phone Number"
        isLocal
        onChange={(formatted, unmasked) => console.log('Phone:', formatted, unmasked)}
      />
      <Input.Url 
        label="Website"
        placeholder="https://example.com"
        clearable
      />
    </div>
  )
}

// Numeric Inputs Example
export const NumericInputsExample = () => {
  const [age, setAge] = useState<number | undefined>()
  const [price, setPrice] = useState<number | undefined>()
  
  return (
    <div className="space-y-4 max-w-md">
      <Input.Number 
        label="Age"
        placeholder="Enter your age"
        min={0}
        max={120}
        value={age}
        onChange={(value) => setAge(value)}
      />
      <Input.Decimal 
        label="Price"
        placeholder="0.00"
        min={0}
        precision={2}
        value={price}
        onChange={(value) => setPrice(value)}
      />
    </div>
  )
}

// Text Area Example
export const TextAreaExample = () => {
  const [message, setMessage] = useState('')
  
  return (
    <div className="max-w-md">
      <Input.TextArea 
        label="Message"
        placeholder="Enter your message..."
        value={message}
        onChange={(value) => setMessage(value)}
        height={4}
        resize="vertical"
        clearable
        description={`${message.length}/500 characters`}
      />
    </div>
  )
}

// File Upload Example
export const FileUploadExample = () => (
  <div className="max-w-md">
    <Input.File 
      label="Profile Picture"
      accept="image/*"
      validation={{ maxSize: 5 * 1024 * 1024 }}
      showPreview
      dragAndDrop
      onChange={(files) => console.log('Files selected:', files)}
    />
  </div>
)

// Range Input Example
export const RangeInputExample = () => {
  const [volume, setVolume] = useState(50)
  
  return (
    <div className="max-w-md">
      <Input.Range 
        label="Volume"
        min={0}
        max={100}
        value={volume}
        onChange={(value) => setVolume(value)}
        showValue
        showTicks
        tickStep={10}
      />
    </div>
  )
}

// Individual component examples
export const BasicTextInputExample = () => {
  const [name, setName] = useState('')
  
  return (
    <div className="max-w-md">
      <Input.Text 
        label="Full Name"
        placeholder="Enter your name"
        value={name}
        onChange={(value) => setName(value)}
        leftIcon={IconType.USER}
        clearable
      />
    </div>
  )
}

export const BasicPasswordInputExample = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  return (
    <div className="space-y-4 max-w-md">
      <Input.Password 
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChange={(value) => setPassword(value)}
        required
      />
      <Input.Password 
        label="Confirm Password"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChange={(value) => setConfirmPassword(value)}
        error={password !== confirmPassword && confirmPassword ? "Passwords don't match" : undefined}
        required
      />
    </div>
  )
}

export const BasicNumericInputExample = () => {
  const [age, setAge] = useState<number | undefined>()
  const [price, setPrice] = useState<number | undefined>()
  
  return (
    <div className="space-y-4 max-w-md">
      <Input.Number 
        label="Age"
        placeholder="Enter your age"
        min={0}
        max={120}
        value={age}
        onChange={(value) => setAge(value)}
      />
      <Input.Decimal 
        label="Price ($)"
        placeholder="0.00"
        min={0}
        precision={2}
        value={price}
        onChange={(value) => setPrice(value)}
      />
    </div>
  )
}

export const BasicTextAreaExample = () => {
  const [message, setMessage] = useState('')
  
  return (
    <div className="max-w-md">
      <Input.TextArea 
        label="Message"
        placeholder="Enter your message..."
        value={message}
        onChange={(value) => setMessage(value)}
        height={4}
        resize="vertical"
        clearable
        description={`${message.length}/500 characters`}
      />
    </div>
  )
}

export const BasicSpecializedInputExample = () => {
  const [searchTerm, setSearchTerm] = useState('')
  
  return (
    <div className="space-y-4 max-w-md">
      <Input.Search 
        label="Search Products"
        placeholder="Type to search..."
        value={searchTerm}
        onChange={(value) => setSearchTerm(value)}
        onSearch={(query) => console.log('Searching for:', query)}
        clearable
      />
      <Input.Tel 
        label="Phone Number"
        isLocal
        onChange={(formatted, unmasked) => console.log('Phone:', formatted, unmasked)}
      />
      <Input.Email 
        label="Email Address"
        placeholder="Enter your email"
        required
      />
      <Input.Url 
        label="Website"
        placeholder="https://example.com"
        clearable
      />
    </div>
  )
}

export const BasicFileUploadExample = () => {
  const [files, setFiles] = useState<File[]>([])
  
  return (
    <div className="max-w-md space-y-4">
      <Input.File 
        label="Profile Picture"
        accept="image/*"
        validation={{ maxSize: 5 * 1024 * 1024 }}
        showPreview
        dragAndDrop
        onChange={(files) => {
          setFiles(files)
          console.log('Files selected:', files)
        }}
      />
      {files.length > 0 && (
        <div className="text-sm text-gray-600">
          Selected: {files.map(f => f.name).join(', ')}
        </div>
      )}
    </div>
  )
}

export const BasicRangeExample = () => {
  const [volume, setVolume] = useState(50)
  
  return (
    <div className="max-w-md space-y-4">
      <Input.Range 
        label="Volume"
        min={0}
        max={100}
        value={volume}
        onChange={(value) => setVolume(value)}
        showValue
        showTicks
        tickStep={10}
      />
      <div className="p-3 bg-gray-50 rounded text-sm">
        Current volume: {volume}%
      </div>
    </div>
  )
}

export const BasicColorPickerExample = () => {
  const [color, setColor] = useState('#3b82f6')
  
  return (
    <div className="space-y-4 max-w-md">
      <Input.ColorPicker 
        label="Theme Color"
        format="hex"
        value={color}
        onChange={(value) => setColor(value)}
        showPresets
        clearable
      />
      <div className="space-y-2">
        <div className="text-sm font-medium text-gray-700">Preview:</div>
        <div 
          className="w-full h-16 rounded-lg border-2 border-gray-200"
          style={{ backgroundColor: color }}
        />
        <div className="text-sm text-gray-600">
          Selected color: {color}
        </div>
      </div>
    </div>
  )
}

export const BasicDateInputExample = () => {
  const [date, setDate] = useState('')
  
  return (
    <div className="max-w-md space-y-4">
      <Input.Date 
        label="Date of Birth"
        value={date}
        onChange={(value) => setDate(value)}
        max="2010-01-01"
        required
      />
      {date && (
        <div className="p-3 bg-gray-50 rounded text-sm">
          Selected date: {new Date(date).toLocaleDateString()}
        </div>
      )}
    </div>
  )
}

// Legacy Color Picker Example (keeping for backward compatibility)
export const ColorPickerExample = () => {
  const [color, setColor] = useState('#3b82f6')
  
  return (
    <div className="space-y-4 max-w-md">
      <Input.ColorPicker 
        label="Theme Color"
        format="hex"
        value={color}
        onChange={(value) => setColor(value)}
        showPresets
        clearable
      />
      <div 
        className="w-full h-16 rounded-lg border"
        style={{ backgroundColor: color }}
      />
    </div>
  )
}

// Date Input Example
export const DateInputExample = () => {
  const [date, setDate] = useState('')
  
  return (
    <div className="max-w-md">
      <Input.Date 
        label="Date of Birth"
        value={date}
        onChange={(value) => setDate(value)}
        max="2010-01-01"
        required
      />
    </div>
  )
}

// Form Validation Example
export const FormValidationExample = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: undefined as number | undefined
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.age || formData.age < 18) newErrors.age = 'Must be at least 18 years old'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const updateField = <K extends keyof typeof formData>(
    field: K, 
    value: typeof formData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="space-y-4 max-w-md">
      <Input.Text 
        label="Full Name"
        placeholder="Enter your name"
        value={formData.name}
        onChange={(value) => updateField('name', value)}
        error={errors.name}
        required
        leftIcon={IconType.USER}
      />
      
      <Input.Email 
        label="Email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={(value) => updateField('email', value)}
        error={errors.email}
        required
      />
      
      <Input.Number 
        label="Age"
        placeholder="Enter your age"
        value={formData.age}
        onChange={(value) => updateField('age', value)}
        error={errors.age}
        min={1}
        max={120}
        required
      />
      
      <button
        onClick={validateForm}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Validate Form
      </button>
    </div>
  )
}