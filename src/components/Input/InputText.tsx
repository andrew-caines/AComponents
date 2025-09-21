import * as React from 'react'
import { cn } from '@/utils'
import { 
  BaseInputProps, 
  InputWrapper, 
  InputIcon, 
  ClearButton, 
  inputVariants 
} from './Input'

export interface InputTextProps
  extends BaseInputProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'onChange' | 'onBlur' | 'onFocus'> {
  value?: string
  defaultValue?: string
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
}

export const InputText = React.forwardRef<HTMLInputElement, InputTextProps>(
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
    const [isValid, setIsValid] = React.useState(true)
    
    const inputId = id || `input-text-${Math.random().toString(36).substr(2, 9)}`
    const currentValue = value !== undefined ? value : internalValue
    const hasError = error || (validator && !isValid)
    const finalState = hasError ? 'error' : state

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      
      if (value === undefined) {
        setInternalValue(newValue)
      }
      
      if (validator) {
        setIsValid(validator(newValue))
      }
      
      onChange?.(newValue, e)
    }


    const handleClear = () => {
      const newValue = ''
      if (value === undefined) {
        setInternalValue(newValue)
      }
      if (validator) {
        setIsValid(validator(newValue))
      }
      onChange?.(newValue, { target: { value: newValue } } as React.ChangeEvent<HTMLInputElement>)
    }

    const hasLeftPadding = leftIcon
    const hasRightPadding = rightIcon || clearable || (rightIcon && clearable)
    const paddingLeft = hasLeftPadding ? (size === 'sm' ? 'pl-8' : size === 'xl' ? 'pl-12' : 'pl-10') : ''
    const paddingRight = hasRightPadding ? (size === 'sm' ? 'pr-8' : size === 'xl' ? 'pr-12' : 'pr-10') : ''

    return (
      <InputWrapper
        label={label}
        description={description}
        error={error}
        required={required}
        size={size}
        htmlFor={inputId}
      >
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            name={name}
            type="text"
            value={currentValue}
            placeholder={placeholder}
            disabled={disabled}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
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
          
          {clearable && currentValue && !disabled && (
            <ClearButton onClear={handleClear} size={size} />
          )}
        </div>
      </InputWrapper>
    )
  }
)

InputText.displayName = 'InputText'
