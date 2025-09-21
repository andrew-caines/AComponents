import * as React from 'react'
import { cn } from '@/utils'
import { 
  BaseInputProps, 
  InputWrapper, 
  InputIcon, 
  ClearButton, 
  inputVariants 
} from './Input'
import { Icon, IconType } from '../icons'

export interface InputPasswordProps
  extends BaseInputProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'onChange' | 'onBlur' | 'onFocus'> {
  value?: string
  defaultValue?: string
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
}

export const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
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
    const [showPassword, setShowPassword] = React.useState(false)
    
    const inputId = id || `input-password-${Math.random().toString(36).substr(2, 9)}`
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

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword)
    }

    const hasLeftPadding = leftIcon
    // Always has right padding for the eye icon, plus clearable if needed
    const paddingLeft = hasLeftPadding ? (size === 'sm' ? 'pl-8' : size === 'xl' ? 'pl-12' : 'pl-10') : ''
    const paddingRight = clearable && currentValue 
      ? (size === 'sm' ? 'pr-16' : size === 'xl' ? 'pr-20' : 'pr-18') // Extra space for both eye and clear
      : (size === 'sm' ? 'pr-8' : size === 'xl' ? 'pr-12' : 'pr-10')

    const eyeIconSize = size === 'sm' ? 'xs' : size === 'xl' ? 'sm' : 'xs'

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
            type={showPassword ? 'text' : 'password'}
            value={currentValue}
            placeholder={placeholder || 'Enter your password'}
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
          
          {/* Password visibility toggle - always present */}
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={cn(
              'absolute top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors',
              clearable && currentValue ? 'right-8' : 'right-3'
            )}
          >
            <Icon 
              type={showPassword ? IconType.EYE_OFF : IconType.EYE} 
              size={eyeIconSize} 
            />
          </button>
          
          {clearable && currentValue && !disabled && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <ClearButton onClear={handleClear} size={size} />
            </div>
          )}
        </div>
      </InputWrapper>
    )
  }
)

InputPassword.displayName = 'InputPassword'
