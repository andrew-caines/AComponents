import React, { useState } from 'react'
import { Input, IconType } from '@acomponents/core'

// Basic Examples Component
export const BasicInputExamples: React.FC = () => {
  const [textValue, setTextValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')

  return (
    <div className="space-y-8 p-6">
      <h2 className="text-2xl font-bold mb-6">Basic Input Examples</h2>
      
      {/* Text Input */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Text Input</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input.Text 
            label="Full Name"
            placeholder="Enter your full name"
            leftIcon={IconType.USER}
            clearable
            value={textValue}
            onChange={(value) => setTextValue(value)}
          />
          
          <Input.Text 
            label="Username"
            placeholder="Choose username"
            description="Must be unique and 3-20 characters"
            validator={(value) => value.length >= 3 && value.length <= 20}
            error={textValue && (textValue.length < 3 || textValue.length > 20) ? "Must be 3-20 characters" : undefined}
            variant="filled"
          />
        </div>
      </div>

      {/* Email Input */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Email Input</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input.Email 
            label="Email Address"
            placeholder="Enter your email"
            required
            clearable
            value={emailValue}
            onChange={(value) => setEmailValue(value)}
          />
          
          <Input.Email 
            label="Work Email"
            placeholder="name@company.com"
            validator={(value) => value.includes('@company.com') || !value}
            error={emailValue && emailValue.includes('@') && !emailValue.includes('@company.com') ? "Must be a company email" : undefined}
            variant="outline"
          />
        </div>
      </div>

      {/* Password Input */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Password Input</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input.Password 
            label="Password"
            placeholder="Enter your password"
            required
            value={passwordValue}
            onChange={(value) => setPasswordValue(value)}
          />
          
          <Input.Password 
            label="New Password"
            placeholder="Strong password"
            description="Must be at least 8 characters"
            validator={(value) => value.length >= 8}
            error={passwordValue && passwordValue.length < 8 ? "Password must be at least 8 characters" : undefined}
            variant="underline"
          />
        </div>
      </div>
    </div>
  )
}

// Specialized Inputs Component
export const SpecializedInputExamples: React.FC = () => {
  const [searchValue, setSearchValue] = useState('')
  const [phoneValue, setPhoneValue] = useState('')
  const [urlValue, setUrlValue] = useState('')

  const handleSearch = (query: string) => {
    console.log('Searching for:', query)
    // Perform search logic here
  }

  return (
    <div className="space-y-8 p-6">
      <h2 className="text-2xl font-bold mb-6">Specialized Input Examples</h2>
      
      {/* Search Input */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Search Input</h3>
        <Input.Search 
          label="Search Products"
          placeholder="Type to search..."
          value={searchValue}
          onChange={(value) => setSearchValue(value)}
          onSearch={handleSearch}
          clearable
          size="lg"
        />
      </div>

      {/* Phone Input */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Phone Number Input</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input.Tel 
            label="Phone Number (Local)"
            isLocal
            onChange={(formatted, unmasked) => {
              setPhoneValue(unmasked)
              console.log('Formatted:', formatted, 'Unmasked:', unmasked)
            }}
          />
          
          <Input.Tel 
            label="Phone Number (International)"
            isInternational
            onChange={(formatted, unmasked) => {
              console.log('Formatted:', formatted, 'Unmasked:', unmasked)
            }}
          />
        </div>
      </div>

      {/* URL Input */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">URL Input</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input.Url 
            label="Website"
            placeholder="https://example.com"
            clearable
            value={urlValue}
            onChange={(value) => setUrlValue(value)}
          />
          
          <Input.Url 
            label="GitHub Profile"
            placeholder="https://github.com/username"
            validator={(value) => value.includes('github.com') || !value}
            error={urlValue && urlValue.includes('http') && !urlValue.includes('github.com') ? "Must be a GitHub URL" : undefined}
          />
        </div>
      </div>
    </div>
  )
}

// Numeric Inputs Component
export const NumericInputExamples: React.FC = () => {
  const [age, setAge] = useState<number | undefined>()
  const [price, setPrice] = useState<number | undefined>()
  const [quantity, setQuantity] = useState<number | undefined>(1)

  return (
    <div className="space-y-8 p-6">
      <h2 className="text-2xl font-bold mb-6">Numeric Input Examples</h2>
      
      {/* Number Input */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Number Input</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input.Number 
            label="Age"
            min={0}
            max={150}
            placeholder="Enter your age"
            value={age}
            onChange={(value) => setAge(value)}
          />
          
          <Input.Number 
            label="Quantity"
            min={1}
            max={99}
            defaultValue={1}
            step={1}
            value={quantity}
            onChange={(value) => setQuantity(value)}
          />
          
          <Input.Number 
            label="Rating"
            min={1}
            max={5}
            step={1}
            placeholder="1-5 stars"
          />
        </div>
      </div>

      {/* Decimal Input */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Decimal Input</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input.Decimal 
            label="Price ($)"
            min={0}
            precision={2}
            placeholder="0.00"
            value={price}
            onChange={(value) => setPrice(value)}
          />
          
          <Input.Decimal 
            label="Weight (kg)"
            precision={1}
            min={0}
            max={500}
            placeholder="0.0"
          />
          
          <Input.Decimal 
            label="Temperature (°C)"
            precision={1}
            min={-50}
            max={50}
            placeholder="0.0"
          />
        </div>
      </div>
    </div>
  )
}

// Complex Inputs Component
export const ComplexInputExamples: React.FC = () => {
  const [message, setMessage] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [rangeValue, setRangeValue] = useState(50)
  const [dateValue, setDateValue] = useState('')

  return (
    <div className="space-y-8 p-6">
      <h2 className="text-2xl font-bold mb-6">Complex Input Examples</h2>
      
      {/* TextArea */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Text Area</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input.TextArea 
            label="Message"
            placeholder="Enter your message..."
            height={4}
            resize="vertical"
            clearable
            value={message}
            onChange={(value) => setMessage(value)}
          />
          
          <Input.TextArea 
            label="Comments"
            placeholder="Add comments..."
            height={6}
            resize="none"
            maxLength={500}
            description={`${message.length}/500 characters`}
          />
        </div>
      </div>

      {/* Range Input */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Range Input</h3>
        <div className="space-y-4">
          <Input.Range 
            label="Volume"
            min={0}
            max={100}
            value={rangeValue}
            onChange={(value) => setRangeValue(value)}
            showValue
            showTicks
            tickStep={10}
          />
          
          <Input.Range 
            label="Price Range"
            min={0}
            max={1000}
            step={50}
            defaultValue={500}
            marks={[
              { value: 0, label: '$0' },
              { value: 250, label: '$250' },
              { value: 500, label: '$500' },
              { value: 750, label: '$750' },
              { value: 1000, label: '$1000' }
            ]}
            showValue
          />
        </div>
      </div>

      {/* File Input */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">File Input</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input.File 
            label="Profile Picture"
            accept="image/*"
            validation={{ maxSize: 5 * 1024 * 1024 }} // 5MB
            showPreview
            dragAndDrop
            onChange={(files) => console.log('Profile picture:', files)}
          />
          
          <Input.File 
            label="Documents"
            multiple
            accept=".pdf,.doc,.docx"
            validation={{
              maxFiles: 5,
              maxSize: 10 * 1024 * 1024, // 10MB per file
              allowedTypes: ['.pdf', '.doc', '.docx']
            }}
            onChange={(files) => setFiles(files)}
          />
        </div>
      </div>

      {/* Date Input */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Date Input</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input.Date 
            label="Date of Birth"
            required
            max="2010-01-01"
            value={dateValue}
            onChange={(value) => setDateValue(value)}
          />
          
          <Input.Date 
            label="Event Date"
            min="2024-01-01"
            max="2024-12-31"
          />
          
          <Input.Date 
            label="Deadline"
            min={new Date().toISOString().split('T')[0]} // Today
            required
          />
        </div>
      </div>
    </div>
  )
}

// Color Picker Examples Component
export const ColorPickerExamples: React.FC = () => {
  const [themeColor, setThemeColor] = useState('#3b82f6')
  const [backgroundColorWithAlpha, setBackgroundColorWithAlpha] = useState('rgba(59, 130, 246, 0.5)')

  return (
    <div className="space-y-8 p-6">
      <h2 className="text-2xl font-bold mb-6">Color Picker Examples</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Color Picker */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Basic Color Picker</h3>
          <Input.ColorPicker 
            label="Theme Color"
            format="hex"
            value={themeColor}
            onChange={(value) => setThemeColor(value)}
            showPresets
            clearable
          />
          <div 
            className="w-full h-16 rounded-lg border"
            style={{ backgroundColor: themeColor }}
          />
        </div>

        {/* Advanced Color Picker */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Advanced Color Picker with Alpha</h3>
          <Input.ColorPicker 
            label="Background Color"
            format="rgba"
            value={backgroundColorWithAlpha}
            onChange={(value) => setBackgroundColorWithAlpha(value)}
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
            className="w-full h-16 rounded-lg border relative overflow-hidden"
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

      {/* Swatch Only Mode */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Swatch Only Mode</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Input.ColorPicker 
            label="Primary"
            format="hex"
            defaultValue="#3b82f6"
            showInput={false}
            swatchSize="lg"
          />
          
          <Input.ColorPicker 
            label="Secondary"
            format="hex"
            defaultValue="#10b981"
            showInput={false}
            swatchSize="lg"
          />
          
          <Input.ColorPicker 
            label="Warning"
            format="hex"
            defaultValue="#f59e0b"
            showInput={false}
            swatchSize="lg"
          />
          
          <Input.ColorPicker 
            label="Danger"
            format="hex"
            defaultValue="#ef4444"
            showInput={false}
            swatchSize="lg"
          />
        </div>
      </div>
    </div>
  )
}

// Size and Variant Examples
export const SizeVariantExamples: React.FC = () => {
  const sizes: Array<'sm' | 'default' | 'md' | 'lg' | 'xl'> = ['sm', 'default', 'md', 'lg', 'xl']
  const variants: Array<'default' | 'outline' | 'filled' | 'underline'> = ['default', 'outline', 'filled', 'underline']

  return (
    <div className="space-y-8 p-6">
      <h2 className="text-2xl font-bold mb-6">Size and Variant Examples</h2>
      
      {/* Size Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Size Variants</h3>
        <div className="space-y-3">
          {sizes.map(size => (
            <Input.Text 
              key={size}
              size={size}
              label={`${size.charAt(0).toUpperCase() + size.slice(1)} Size`}
              placeholder={`This is ${size} size`}
              leftIcon={IconType.USER}
              clearable
            />
          ))}
        </div>
      </div>

      {/* Variant Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Style Variants</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {variants.map(variant => (
            <Input.Text 
              key={variant}
              variant={variant}
              label={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Variant`}
              placeholder={`This is ${variant} variant`}
              leftIcon={IconType.STAR}
              clearable
            />
          ))}
        </div>
      </div>

      {/* Radius Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Radius Options</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {(['none', 'sm', 'default', 'lg', 'xl', 'full'] as const).map(radius => (
            <Input.Text 
              key={radius}
              radius={radius}
              label={`${radius.charAt(0).toUpperCase() + radius.slice(1)} Radius`}
              placeholder={`Radius: ${radius}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// Complete Form Example
export const CompleteFormExample: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    website: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    bio: '',
    avatar: [] as File[],
    newsletter: false,
    theme: '#3b82f6',
    experience: 5,
    skills: [] as File[]
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName) newErrors.firstName = 'First name is required'
    if (!formData.lastName) newErrors.lastName = 'Last name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.password) newErrors.password = 'Password is required'
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    if (formData.password && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('Form submitted:', formData)
      alert('Form submitted successfully!')
    } catch (error) {
      console.error('Submit error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateFormData = <K extends keyof typeof formData>(
    key: K, 
    value: typeof formData[K]
  ) => {
    setFormData(prev => ({ ...prev, [key]: value }))
    // Clear error when user starts typing
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }))
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Complete Registration Form</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="bg-gray-50 p-6 rounded-lg space-y-4">
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input.Text 
              label="First Name"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={(value) => updateFormData('firstName', value)}
              error={errors.firstName}
              required
              leftIcon={IconType.USER}
              clearable
            />
            
            <Input.Text 
              label="Last Name"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={(value) => updateFormData('lastName', value)}
              error={errors.lastName}
              required
              leftIcon={IconType.USER}
              clearable
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input.Email 
              label="Email Address"
              placeholder="Enter email"
              value={formData.email}
              onChange={(value) => updateFormData('email', value)}
              error={errors.email}
              required
              clearable
            />
            
            <Input.Tel 
              label="Phone Number"
              isLocal
              onChange={(formatted, unmasked) => updateFormData('phone', unmasked)}
            />
          </div>

          <Input.Url 
            label="Website (Optional)"
            placeholder="https://your-website.com"
            value={formData.website}
            onChange={(value) => updateFormData('website', value)}
            clearable
          />

          <Input.Date 
            label="Date of Birth"
            value={formData.birthDate}
            onChange={(value) => updateFormData('birthDate', value)}
            max="2010-01-01"
          />
        </div>

        {/* Account Security */}
        <div className="bg-gray-50 p-6 rounded-lg space-y-4">
          <h3 className="text-lg font-semibold mb-4">Account Security</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input.Password 
              label="Password"
              placeholder="Enter password"
              value={formData.password}
              onChange={(value) => updateFormData('password', value)}
              error={errors.password}
              required
            />
            
            <Input.Password 
              label="Confirm Password"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={(value) => updateFormData('confirmPassword', value)}
              error={errors.confirmPassword}
              required
            />
          </div>
        </div>

        {/* Profile Customization */}
        <div className="bg-gray-50 p-6 rounded-lg space-y-4">
          <h3 className="text-lg font-semibold mb-4">Profile Customization</h3>
          
          <Input.TextArea 
            label="Bio"
            placeholder="Tell us about yourself..."
            value={formData.bio}
            onChange={(value) => updateFormData('bio', value)}
            height={4}
            clearable
            description={`${formData.bio.length}/500 characters`}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input.File 
              label="Profile Picture"
              accept="image/*"
              validation={{ maxSize: 5 * 1024 * 1024 }}
              showPreview
              onChange={(files) => updateFormData('avatar', files)}
            />
            
            <Input.ColorPicker 
              label="Theme Color"
              format="hex"
              value={formData.theme}
              onChange={(value) => updateFormData('theme', value)}
              showPresets
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input.Range 
              label="Years of Experience"
              min={0}
              max={20}
              value={formData.experience}
              onChange={(value) => updateFormData('experience', value)}
              showValue
              showTicks
              tickStep={5}
            />
            
            <Input.File 
              label="Skills Certificates"
              multiple
              accept=".pdf,.jpg,.png"
              validation={{ maxFiles: 3, maxSize: 2 * 1024 * 1024 }}
              onChange={(files) => updateFormData('skills', files)}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            onClick={() => setFormData({
              firstName: '', lastName: '', email: '', phone: '',
              website: '', password: '', confirmPassword: '', birthDate: '',
              bio: '', avatar: [], newsletter: false, theme: '#3b82f6',
              experience: 5, skills: []
            })}
          >
            Reset
          </button>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              'px-6 py-2 rounded-md text-white font-medium',
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            )}
          >
            {isSubmitting ? 'Submitting...' : 'Register'}
          </button>
        </div>
      </form>
    </div>
  )
}

// Helper function for className concatenation (if not already available)
function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

// Main Examples Component
export const InputExamplesShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState('basic')

  const tabs = [
    { id: 'basic', label: 'Basic Inputs', component: BasicInputExamples },
    { id: 'specialized', label: 'Specialized', component: SpecializedInputExamples },
    { id: 'numeric', label: 'Numeric', component: NumericInputExamples },
    { id: 'complex', label: 'Complex', component: ComplexInputExamples },
    { id: 'color', label: 'Color Picker', component: ColorPickerExamples },
    { id: 'variants', label: 'Sizes & Variants', component: SizeVariantExamples },
    { id: 'form', label: 'Complete Form', component: CompleteFormExample },
  ]

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || BasicInputExamples

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap',
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto py-6">
        <ActiveComponent />
      </main>
    </div>
  )
}