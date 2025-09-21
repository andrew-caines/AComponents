import * as React from 'react'
import { cn } from '@/utils'
import { 
  BaseInputProps, 
  InputWrapper, 
  InputIcon, 
  ClearButton, 
  inputVariants 
} from './Input'

export interface InputNumberProps
  extends Omit<BaseInputProps<number>, 'onChange' | 'onBlur' | 'onFocus'>,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'min' | 'max' | 'step' | 'onChange' | 'onBlur' | 'onFocus' | 'value' | 'defaultValue'> {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  onChange?: (value: number | undefined, event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
}

export const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>(
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
      step = 1,
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
    const [inputValue, setInputValue] = React.useState(defaultValue?.toString() || '')
    
    const inputId = id || `input-number-${Math.random().toString(36).substr(2, 9)}`
    const currentValue = value !== undefined ? value : internalValue

    // Validate number constraints
    const validateNumber = (num: number | undefined): boolean => {
      if (num === undefined) return !required
      if (min !== undefined && num < min) return false
      if (max !== undefined && num > max) return false
      return true
    }

    const isNumberValid = validateNumber(currentValue) && (validator && currentValue !== undefined ? validator(currentValue) : true)
    const hasError = error || !isNumberValid
    const finalState = hasError ? 'error' : state

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Allow special keys
      if (e.ctrlKey || e.altKey || e.metaKey || 
          ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter'].includes(e.key)) {
        return
      }
      
      // Allow numbers, minus sign (at start), and decimal point
      const allowedChars = /[0-9\-]/
      if (!allowedChars.test(e.key)) {
        e.preventDefault()
      }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const stringValue = e.target.value
      setInputValue(stringValue)
      
      let numValue: number | undefined
      
      if (stringValue === '' || stringValue === '-') {
        numValue = undefined
      } else {
        const parsed = parseInt(stringValue, 10)
        numValue = isNaN(parsed) ? undefined : parsed
      }
      
      if (value === undefined) {
        setInternalValue(numValue)
      }
      
      
      onChange?.(numValue, e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      // Format the display value on blur
      if (currentValue !== undefined) {
        setInputValue(currentValue.toString())
      } else {
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
        setInputValue(value.toString())
      }
    }, [value])

    const hasLeftPadding = leftIcon
    const hasRightPadding = rightIcon || clearable
    const paddingLeft = hasLeftPadding ? (size === 'sm' ? 'pl-8' : size === 'xl' ? 'pl-12' : 'pl-10') : ''
    const paddingRight = hasRightPadding ? (size === 'sm' ? 'pr-8' : size === 'xl' ? 'pr-12' : 'pr-10') : ''

    // Generate error message based on constraints
    let numberError = error
    if (!isNumberValid && currentValue !== undefined) {
      if (min !== undefined && max !== undefined) {
        numberError = `Please enter a number between ${min} and ${max}`
      } else if (min !== undefined) {
        numberError = `Please enter a number greater than or equal to ${min}`
      } else if (max !== undefined) {
        numberError = `Please enter a number less than or equal to ${max}`
      }
    }

    return (
      <InputWrapper
        label={label}
        description={description}
        error={numberError}
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
            placeholder={placeholder}
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

InputNumber.displayName = 'InputNumber'
