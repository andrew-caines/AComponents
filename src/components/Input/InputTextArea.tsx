import * as React from 'react'
import { cn } from '@/utils'
import { 
  BaseInputProps, 
  InputWrapper
} from './Input'
import { Icon, IconType } from '../icons'

export interface InputTextAreaProps
  extends Omit<BaseInputProps<string>, 'leftIcon' | 'rightIcon' | 'onChange' | 'onBlur' | 'onFocus'>,
    Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'onChange' | 'onBlur' | 'onFocus' | 'value' | 'defaultValue'> {
  value?: string
  defaultValue?: string
  height?: number // Number of rows to show
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
  onChange?: (value: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void
}

export const InputTextArea = React.forwardRef<HTMLTextAreaElement, InputTextAreaProps>(
  (
    {
      label,
      description,
      error,
      required,
      clearable,
      placeholder,
      disabled,
      validator,
      className,
      size,
      variant,
      radius,
      state,
      height = 4,
      resize = 'vertical',
      value,
      defaultValue,
      onChange,
      onBlur,
      onFocus,
      id,
      name,
      rows,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || '')
    
    const inputId = id || `input-textarea-${Math.random().toString(36).substr(2, 9)}`
    const currentValue = value !== undefined ? value : internalValue
    const hasError = !!error
    const finalState = hasError ? 'error' : state

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value
      
      if (value === undefined) {
        setInternalValue(newValue)
      }
      
      
      onChange?.(newValue, e)
    }

    const handleClear = () => {
      const newValue = ''
      if (value === undefined) {
        setInternalValue(newValue)
      }
      onChange?.(newValue, { target: { value: newValue } } as React.ChangeEvent<HTMLTextAreaElement>)
    }

    const resizeClasses = {
      'none': 'resize-none',
      'vertical': 'resize-y',
      'horizontal': 'resize-x',
      'both': 'resize'
    }

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
          <textarea
            ref={ref}
            id={inputId}
            name={name}
            value={currentValue}
            placeholder={placeholder}
            disabled={disabled}
            rows={rows || height}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
            className={cn(
              // Base textarea styles (removing height constraint from inputVariants)
              'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              // Size variants for padding and text
              {
                'px-2 py-1.5 text-xs': size === 'sm',
                'px-3 py-2 text-sm': size === 'default',
                'px-4 py-2.5 text-base': size === 'md',
                'px-4 py-3 text-base': size === 'lg',
                'px-6 py-4 text-lg': size === 'xl',
              },
              // Variant styles
              {
                'border-input focus:border-ring': variant === 'default',
                'border-2 border-muted focus:border-ring': variant === 'outline',
                'bg-muted border-transparent focus:border-ring': variant === 'filled',
                'border-0 border-b-2 border-input rounded-none focus:border-ring': variant === 'underline',
              },
              // Radius styles
              {
                'rounded-none': radius === 'none',
                'rounded-sm': radius === 'sm',
                'rounded-md': radius === 'default',
                'rounded-lg': radius === 'lg',
                'rounded-xl': radius === 'xl',
                'rounded-full': radius === 'full',
              },
              // State styles
              {
                'border-destructive focus:border-destructive ring-destructive': finalState === 'error',
                'border-green-500 focus:border-green-500 ring-green-500': finalState === 'success',
              },
              // Resize styles
              resizeClasses[resize],
              // Clear button padding
              clearable ? 'pr-10' : '',
              className
            )}
            {...props}
          />
          
          {clearable && currentValue && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon type={IconType.CLOSE} size="xs" />
            </button>
          )}
        </div>
      </InputWrapper>
    )
  }
)

InputTextArea.displayName = 'InputTextArea'
