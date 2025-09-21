import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils'
import { Icon, IconType } from '../icons'

const inputVariants = cva(
  'flex w-full rounded-md border border-input bg-background text-foreground px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-8 px-2 text-xs',
        default: 'h-10 px-3 text-sm',
        md: 'h-11 px-4 text-base',
        lg: 'h-12 px-4 text-base',
        xl: 'h-14 px-6 text-lg',
      },
      variant: {
        default: 'border-input focus:border-ring',
        outline: 'border-2 border-muted focus:border-ring',
        filled: 'bg-muted border-transparent focus:border-ring',
        underline: 'border-0 border-b-2 border-input rounded-none focus:border-ring',
      },
      radius: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        default: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full',
      },
      state: {
        default: '',
        error: 'border-destructive focus:border-destructive ring-destructive',
        success: 'border-green-500 focus:border-green-500 ring-green-500',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
      radius: 'default',
      state: 'default',
    },
  }
)

const labelVariants = cva(
  'block font-medium text-foreground mb-1',
  {
    variants: {
      size: {
        sm: 'text-xs',
        default: 'text-sm',
        md: 'text-base',
        lg: 'text-base',
        xl: 'text-lg',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
)

export interface BaseInputProps<T = string> extends VariantProps<typeof inputVariants> {
  label?: string
  description?: string
  error?: string
  required?: boolean
  leftIcon?: IconType
  rightIcon?: IconType
  clearable?: boolean
  placeholder?: string
  disabled?: boolean
  validator?: (value: T) => boolean
  className?: string
  id?: string
  name?: string
  value?: T
  defaultValue?: T
  onChange?: (value: T, event?: any) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
  onClear?: (value: T) => void
}

export interface InputWrapperProps {
  label?: string
  description?: string
  error?: string
  required?: boolean
  size?: BaseInputProps['size']
  disabled?: boolean
  clearable?: boolean
  onClear?: () => void
  radius?: BaseInputProps['radius']
  children: React.ReactNode
  htmlFor?: string
}

export const InputWrapper: React.FC<InputWrapperProps> = ({
  label,
  description,
  error,
  required,
  size,
  clearable = false,
  onClear,
  children,
  htmlFor,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={htmlFor}
          className={cn(labelVariants({ size }))}
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      {description && (
        <p className="text-xs text-muted-foreground mb-1">{description}</p>
      )}
      <div className="relative">
        {children}
        {clearable && onClear && (
          <ClearButton onClear={onClear} size={size} />
        )}
      </div>
      {error && (
        <p className="text-xs text-destructive mt-1">{error}</p>
      )}
    </div>
  )
}

interface InputIconProps {
  icon: IconType
  position: 'left' | 'right'
  size?: BaseInputProps['size']
  onClick?: () => void
}

export const InputIcon: React.FC<InputIconProps> = ({ 
  icon, 
  position, 
  size = 'default',
  onClick 
}) => {
  const iconSize = size === 'sm' ? 'xs' : size === 'xl' ? 'sm' : 'xs'
  const positionClasses = position === 'left' 
    ? 'left-3' 
    : 'right-3'
  
  return (
    <div 
      className={cn(
        'absolute top-1/2 transform -translate-y-1/2 text-muted-foreground',
        positionClasses,
        onClick && 'cursor-pointer hover:text-foreground transition-colors'
      )}
      onClick={onClick}
    >
      <Icon type={icon} size={iconSize} />
    </div>
  )
}

interface ClearButtonProps {
  onClear: () => void
  size?: BaseInputProps['size']
}

export const ClearButton: React.FC<ClearButtonProps> = ({ onClear, size }) => {
  const iconSize = size === 'sm' ? 'xs' : size === 'xl' ? 'sm' : 'xs'
  
  return (
    <button
      type="button"
      onClick={onClear}
      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
    >
      <Icon type={IconType.CLOSE} size={iconSize} />
    </button>
  )
}

export { inputVariants }
