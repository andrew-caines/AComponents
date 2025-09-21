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

export interface InputTelProps
  extends Omit<BaseInputProps<string>, 'onChange' | 'onBlur' | 'onFocus'>,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'onChange' | 'onBlur' | 'onFocus' | 'value' | 'defaultValue'> {
  value?: string
  defaultValue?: string
  isInternational?: boolean
  isLocal?: boolean // Default - local formatting
  onChange?: (value: string, unmaskedValue: string, event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
}

// Format phone number for display
const formatPhoneNumber = (value: string, isInternational: boolean): string => {
  // Remove all non-numeric characters
  const numbers = value.replace(/\D/g, '')
  
  if (isInternational) {
    // International format: +1 (780) 699-5330
    if (numbers.length === 0) return ''
    if (numbers.length <= 1) return `+${numbers}`
    if (numbers.length <= 4) return `+${numbers.slice(0, 1)} (${numbers.slice(1)}`
    if (numbers.length <= 7) return `+${numbers.slice(0, 1)} (${numbers.slice(1, 4)}) ${numbers.slice(4)}`
    return `+${numbers.slice(0, 1)} (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 11)}`
  } else {
    // Local format: (780) 699-5330
    if (numbers.length === 0) return ''
    if (numbers.length <= 3) return `(${numbers}`
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`
  }
}

// Get unmasked value (numbers only)
const getUnmaskedValue = (value: string): string => {
  return value.replace(/\D/g, '')
}

// Validate phone number
const isValidPhoneNumber = (numbers: string, isInternational: boolean): boolean => {
  if (!numbers) return true // Empty is valid unless required
  
  if (isInternational) {
    // International: expect 11 digits (1 + 10 digit number)
    return numbers.length === 11 && numbers.startsWith('1')
  } else {
    // Local: expect 10 digits
    return numbers.length === 10
  }
}

export const InputTel = React.forwardRef<HTMLInputElement, InputTelProps>(
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
      isInternational = false,
      isLocal = true,
      onChange,
      onBlur,
      onFocus,
      id,
      name,
      ...props
    },
    ref
  ) => {
    // Determine format mode (international takes precedence)
    const useInternationalFormat = isInternational && !isLocal
    
    const [internalValue, setInternalValue] = React.useState(() => {
      if (defaultValue) {
        return formatPhoneNumber(defaultValue, useInternationalFormat)
      }
      return ''
    })
    
    const inputId = id || `input-tel-${Math.random().toString(36).substr(2, 9)}`
    
    // Get current formatted and unmasked values
    const currentFormattedValue = value !== undefined 
      ? formatPhoneNumber(value, useInternationalFormat)
      : internalValue
    const currentUnmaskedValue = getUnmaskedValue(currentFormattedValue)
    
    // Validate phone number
    const isPhoneValid = isValidPhoneNumber(currentUnmaskedValue, useInternationalFormat) && 
                        (validator ? validator(currentUnmaskedValue) : true)
    const hasError = error || !isPhoneValid
    const finalState = hasError ? 'error' : state

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Allow special keys
      if (e.ctrlKey || e.altKey || e.metaKey || 
          ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter'].includes(e.key)) {
        return
      }
      
      // Only allow numbers
      if (!/[0-9]/.test(e.key)) {
        e.preventDefault()
      }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value
      const numbersOnly = getUnmaskedValue(inputValue)
      
      // Limit to maximum digits
      const maxDigits = useInternationalFormat ? 11 : 10
      if (numbersOnly.length > maxDigits) {
        return // Don't update if exceeding max digits
      }
      
      const formattedValue = formatPhoneNumber(numbersOnly, useInternationalFormat)
      
      if (value === undefined) {
        setInternalValue(formattedValue)
      }
      
      
      onChange?.(formattedValue, numbersOnly, e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(e)
    }

    const handleClear = () => {
      const newValue = ''
      const newUnmaskedValue = ''
      
      if (value === undefined) {
        setInternalValue(newValue)
      }
      onChange?.(newValue, newUnmaskedValue, { target: { value: newValue } } as React.ChangeEvent<HTMLInputElement>)
    }

    // Update internal value when controlled value changes
    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(formatPhoneNumber(value, useInternationalFormat))
      }
    }, [value, useInternationalFormat])

    const hasLeftPadding = leftIcon || !leftIcon // Default phone icon if none provided
    const hasRightPadding = rightIcon || clearable
    const paddingLeft = hasLeftPadding ? (size === 'sm' ? 'pl-8' : size === 'xl' ? 'pl-12' : 'pl-10') : ''
    const paddingRight = hasRightPadding ? (size === 'sm' ? 'pr-8' : size === 'xl' ? 'pr-12' : 'pr-10') : ''

    // Generate error message
    let phoneError = error
    if (!isPhoneValid && currentUnmaskedValue) {
      if (useInternationalFormat) {
        phoneError = 'Please enter a valid international phone number (11 digits)'
      } else {
        phoneError = 'Please enter a valid phone number (10 digits)'
      }
    }

    const placeholderText = placeholder || (useInternationalFormat ? '+1 (780) 699-5330' : '(780) 699-5330')

    return (
      <InputWrapper
        label={label}
        description={description}
        error={phoneError}
        required={required}
        size={size}
        htmlFor={inputId}
      >
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            name={name}
            type="tel"
            value={currentFormattedValue}
            placeholder={placeholderText}
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
          
          {/* Default phone icon if none provided */}
          <InputIcon 
            icon={leftIcon || IconType.PHONE} 
            position="left" 
            size={size} 
          />
          
          {rightIcon && !clearable && (
            <InputIcon icon={rightIcon} position="right" size={size} />
          )}
          
          {clearable && currentFormattedValue && !disabled && (
            <ClearButton onClear={handleClear} size={size} />
          )}
        </div>
      </InputWrapper>
    )
  }
)

InputTel.displayName = 'InputTel'
