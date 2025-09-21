import * as React from 'react'
import { cn } from '@/utils'
import { 
  BaseInputProps, 
  InputWrapper, 
  InputIcon, 
  ClearButton, 
  inputVariants 
} from './Input'
import { IconType } from '../icons'

export interface InputEmailProps
  extends BaseInputProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'onChange' | 'onBlur' | 'onFocus'> {
  value?: string
  defaultValue?: string
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
}

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

// Restrict input to valid email characters only
const isValidEmailChar = (char: string): boolean => {
  return /[a-zA-Z0-9._%+-@]/.test(char)
}

export const InputEmail = React.forwardRef<HTMLInputElement, InputEmailProps>(
  (
    {
      label,
      description,
      error,
      required,
      leftIcon,
      rightIcon,
      clearable,
      placeholder,
      disabled,
      validator,
      className,
      size,
      variant,
      radius,
      state,
      value,
      defaultValue,
      onChange,
      onBlur,
      onFocus,
      id,
      name,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || '')
    
    const inputId = id || `input-email-${Math.random().toString(36).substr(2, 9)}`
    const currentValue = value !== undefined ? value : internalValue
    
    // Email validation
    const validateEmail = (email: string): boolean => {
      if (!email) return true // Empty is valid unless required
      return EMAIL_REGEX.test(email)
    }

    // Combine custom validator with built-in email validation
    const isEmailValid = validateEmail(currentValue) && (validator ? validator(currentValue) : true)
    const hasError = error || !isEmailValid
    const finalState = hasError ? 'error' : state

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Allow special keys (backspace, delete, arrow keys, etc.)
      if (e.ctrlKey || e.altKey || e.metaKey || 
          ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter'].includes(e.key)) {
        return
      }
      
      // Block invalid email characters
      if (!isValidEmailChar(e.key)) {
        e.preventDefault()
      }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      
      if (value === undefined) {
        setInternalValue(newValue)
      }
      
      
      onChange?.(newValue, e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      // Validate on blur
      onBlur?.(e)
    }

    const handleClear = () => {
      const newValue = ''
      if (value === undefined) {
        setInternalValue(newValue)
      }
      onChange?.(newValue, { target: { value: newValue } } as React.ChangeEvent<HTMLInputElement>)
    }

    const hasLeftPadding = leftIcon || !leftIcon // Default email icon if none provided
    const hasRightPadding = rightIcon || clearable
    const paddingLeft = hasLeftPadding ? (size === 'sm' ? 'pl-8' : size === 'xl' ? 'pl-12' : 'pl-10') : ''
    const paddingRight = hasRightPadding ? (size === 'sm' ? 'pr-8' : size === 'xl' ? 'pr-12' : 'pr-10') : ''

    const emailError = !isEmailValid && currentValue ? 'Please enter a valid email address' : error

    return (
      <InputWrapper
        label={label}
        description={description}
        error={emailError}
        required={required}
        size={size}
        htmlFor={inputId}
      >
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            name={name}
            type="email"
            value={currentValue}
            placeholder={placeholder || 'Enter your email'}
            disabled={disabled}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyPress}
            className={cn(
              inputVariants({ size, variant, radius, state: finalState }),
              paddingLeft,
              paddingRight,
              className
            )}
            {...props}
          />
          
          {/* Default email icon if none provided */}
          <InputIcon 
            icon={leftIcon || IconType.MAIL} 
            position="left" 
            size={size} 
          />
          
          {rightIcon && !clearable && (
            <InputIcon icon={rightIcon} position="right" size={size} />
          )}
          
          {clearable && currentValue && !disabled && (
            <ClearButton onClear={handleClear} size={size} />
          )}
        </div>
      </InputWrapper>
    )
  }
)

InputEmail.displayName = 'InputEmail'
