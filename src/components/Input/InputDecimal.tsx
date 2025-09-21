import * as React from 'react'
import { cn } from '@/utils'
import { 
  BaseInputProps, 
  InputWrapper, 
  InputIcon, 
  ClearButton, 
  inputVariants 
} from './Input'

export interface InputDecimalProps
  extends Omit<BaseInputProps<number>, 'onChange' | 'onBlur' | 'onFocus'>,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'min' | 'max' | 'step' | 'onChange' | 'onBlur' | 'onFocus' | 'value' | 'defaultValue'> {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  precision?: number // Number of decimal places
  onChange?: (value: number | undefined, event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
}

export const InputDecimal = React.forwardRef<HTMLInputElement, InputDecimalProps>(
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
      min,
      max,
      precision = 2,
      onChange,
      onBlur,
      onFocus,
      id,
      name,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<number | undefined>(defaultValue)
    const [inputValue, setInputValue] = React.useState(() => {
      if (defaultValue !== undefined) {
        return defaultValue.toFixed(precision)
      }
      return ''
    })
    
    const inputId = id || `input-decimal-${Math.random().toString(36).substr(2, 9)}`
    const currentValue = value !== undefined ? value : internalValue
    const step = Math.pow(10, -precision) // e.g., precision 2 = step 0.01

    // Validate decimal constraints
    const validateDecimal = (num: number | undefined): boolean => {
      if (num === undefined) return !required
      if (min !== undefined && num < min) return false
      if (max !== undefined && num > max) return false
      return true
    }

    const isDecimalValid = validateDecimal(currentValue) && (validator && currentValue !== undefined ? validator(currentValue) : true)
    const hasError = error || !isDecimalValid
    const finalState = hasError ? 'error' : state

    // Format number to specified precision
    const formatDecimal = (num: number): string => {
      return num.toFixed(precision)
    }

    // Parse decimal with precision limit
    const parseDecimal = (str: string): number | undefined => {
      if (str === '' || str === '-' || str === '.') return undefined
      const num = parseFloat(str)
      if (isNaN(num)) return undefined
      
      // Round to precision to avoid floating point issues
      return Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision)
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Allow special keys
      if (e.ctrlKey || e.altKey || e.metaKey || 
          ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter'].includes(e.key)) {
        return
      }
      
      // Allow numbers, minus sign (at start), and one decimal point
      const currentValue = (e.target as HTMLInputElement).value
      const allowedChars = /[0-9\-\.]/
      
      if (!allowedChars.test(e.key)) {
        e.preventDefault()
        return
      }
      
      // Prevent multiple decimal points
      if (e.key === '.' && currentValue.includes('.')) {
        e.preventDefault()
        return
      }
      
      // Prevent minus sign not at start
      if (e.key === '-' && (e.target as HTMLInputElement).selectionStart !== 0) {
        e.preventDefault()
        return
      }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let stringValue = e.target.value
      
      // Limit decimal places during input
      const decimalIndex = stringValue.indexOf('.')
      if (decimalIndex !== -1 && stringValue.length > decimalIndex + precision + 1) {
        stringValue = stringValue.slice(0, decimalIndex + precision + 1)
      }
      
      setInputValue(stringValue)
      
      const numValue = parseDecimal(stringValue)
      
      if (value === undefined) {
        setInternalValue(numValue)
      }
      
      
      onChange?.(numValue, e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      // Format the display value on blur if we have a valid number
      if (currentValue !== undefined && !isNaN(currentValue)) {
        const formatted = formatDecimal(currentValue)
        setInputValue(formatted)
      } else if (inputValue && !parseDecimal(inputValue)) {
        // Clear invalid input
        setInputValue('')
      }
      
      onBlur?.(e)
    }

    const handleClear = () => {
      setInputValue('')
      const newValue = undefined
      
      if (value === undefined) {
        setInternalValue(newValue)
      }
      onChange?.(newValue, { target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)
    }

    // Update input display when controlled value changes
    React.useEffect(() => {
      if (value !== undefined) {
        setInputValue(formatDecimal(value))
      }
    }, [value, precision])

    const hasLeftPadding = leftIcon
    const hasRightPadding = rightIcon || clearable
    const paddingLeft = hasLeftPadding ? (size === 'sm' ? 'pl-8' : size === 'xl' ? 'pl-12' : 'pl-10') : ''
    const paddingRight = hasRightPadding ? (size === 'sm' ? 'pr-8' : size === 'xl' ? 'pr-12' : 'pr-10') : ''

    // Generate error message based on constraints
    let decimalError = error
    if (!isDecimalValid && currentValue !== undefined) {
      if (min !== undefined && max !== undefined) {
        decimalError = `Please enter a number between ${min} and ${max}`
      } else if (min !== undefined) {
        decimalError = `Please enter a number greater than or equal to ${min}`
      } else if (max !== undefined) {
        decimalError = `Please enter a number less than or equal to ${max}`
      }
    }

    const placeholderText = placeholder || `0.${'0'.repeat(precision)}`

    return (
      <InputWrapper
        label={label}
        description={description}
        error={decimalError}
        required={required}
        size={size}
        htmlFor={inputId}
      >
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            name={name}
            type="number"
            value={inputValue}
            placeholder={placeholderText}
            disabled={disabled}
            min={min}
            max={max}
            step={step}
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
          
          {leftIcon && (
            <InputIcon icon={leftIcon} position="left" size={size} />
          )}
          
          {rightIcon && !clearable && (
            <InputIcon icon={rightIcon} position="right" size={size} />
          )}
          
          {clearable && inputValue && !disabled && (
            <ClearButton onClear={handleClear} size={size} />
          )}
        </div>
      </InputWrapper>
    )
  }
)

InputDecimal.displayName = 'InputDecimal'
