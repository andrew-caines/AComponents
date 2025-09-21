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

export interface InputUrlProps
  extends BaseInputProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'onChange' | 'onBlur' | 'onFocus'> {
  value?: string
  defaultValue?: string
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
}

// URL validation regex - supports http, https, ftp, etc.
const URL_REGEX = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i

// More permissive URL regex that also accepts domains without protocol
const URL_WITH_DOMAIN_REGEX = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?(\?[;&a-z\d%_\.,~+=-]*)?(\#[-a-z\d_]*)?$/i

// Restrict input to valid URL characters
const isValidUrlChar = (char: string): boolean => {
  return /[a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=%\-]/.test(char)
}

export const InputUrl = React.forwardRef<HTMLInputElement, InputUrlProps>(
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
    
    const inputId = id || `input-url-${Math.random().toString(36).substr(2, 9)}`
    const currentValue = value !== undefined ? value : internalValue
    
    // URL validation
    const validateUrl = (url: string): boolean => {
      if (!url) return true // Empty is valid unless required
      
      // First try strict URL validation
      if (URL_REGEX.test(url)) return true
      
      // Then try more permissive validation for domains
      if (URL_WITH_DOMAIN_REGEX.test(url)) return true
      
      return false
    }

    // Combine custom validator with built-in URL validation
    const isUrlValid = validateUrl(currentValue) && (validator ? validator(currentValue) : true)
    const hasError = error || !isUrlValid
    const finalState = hasError ? 'error' : state

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Allow special keys (backspace, delete, arrow keys, etc.)
      if (e.ctrlKey || e.altKey || e.metaKey || 
          ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter'].includes(e.key)) {
        return
      }
      
      // Block invalid URL characters
      if (!isValidUrlChar(e.key)) {
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

    const hasLeftPadding = leftIcon || !leftIcon // Default link icon if none provided
    const hasRightPadding = rightIcon || clearable
    const paddingLeft = hasLeftPadding ? (size === 'sm' ? 'pl-8' : size === 'xl' ? 'pl-12' : 'pl-10') : ''
    const paddingRight = hasRightPadding ? (size === 'sm' ? 'pr-8' : size === 'xl' ? 'pr-12' : 'pr-10') : ''

    const urlError = !isUrlValid && currentValue ? 'Please enter a valid URL' : error

    return (
      <InputWrapper
        label={label}
        description={description}
        error={urlError}
        required={required}
        size={size}
        htmlFor={inputId}
      >
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            name={name}
            type="url"
            value={currentValue}
            placeholder={placeholder || 'https://example.com'}
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
          
          {/* Default link icon if none provided */}
          <InputIcon 
            icon={leftIcon || IconType.LINK} 
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

InputUrl.displayName = 'InputUrl'
