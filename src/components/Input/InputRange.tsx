import React, { forwardRef, useCallback, useState, useEffect } from 'react'
import { cn } from '@/utils/cn'
import { 
  BaseInputProps, 
  InputWrapper 
} from './Input'

export interface InputRangeProps extends Omit<BaseInputProps<number>, 'type' | 'placeholder'> {
  min?: number
  max?: number
  step?: number
  showValue?: boolean
  showTicks?: boolean
  tickStep?: number
  marks?: { value: number; label?: string }[]
  orientation?: 'horizontal' | 'vertical'
  trackColor?: string
  thumbColor?: string
  fillColor?: string
}

export const InputRange = forwardRef<HTMLInputElement, InputRangeProps>(({
  className,
  size = 'md',
  variant = 'default',
  disabled = false,
  required = false,
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  showValue = false,
  showTicks = false,
  tickStep,
  marks = [],
  orientation = 'horizontal',
  trackColor,
  thumbColor,
  fillColor,
  label,
  description,
  error,
  clearable = false,
  onClear,
  radius,
  ...props
}, ref) => {
  const [internalValue, setInternalValue] = useState<number>(
    value !== undefined ? value : (defaultValue !== undefined ? defaultValue : min)
  )
  const [isFocused, setIsFocused] = useState(false)

  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  useEffect(() => {
    if (isControlled && value !== undefined) {
      setInternalValue(value)
    }
  }, [value, isControlled])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value)
    
    if (!isControlled) {
      setInternalValue(newValue)
    }
    
    onChange?.(newValue, e)
  }, [onChange, isControlled])

  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    onFocus?.(e)
  }, [onFocus])

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    onBlur?.(e)
  }, [onBlur])

  const handleClear = useCallback(() => {
    const clearValue = min
    if (!isControlled) {
      setInternalValue(clearValue)
    }
    onClear?.(clearValue)
    onChange?.(clearValue, null as any)
  }, [isControlled, min, onClear, onChange])

  const percentage = ((currentValue - min) / (max - min)) * 100

  const rangeStyles = {
    '--range-progress': `${percentage}%`,
    '--track-color': trackColor,
    '--thumb-color': thumbColor,
    '--fill-color': fillColor,
  } as React.CSSProperties

  const renderTicks = () => {
    if (!showTicks) return null

    const tickStepValue = tickStep || step
    const ticks = []
    
    for (let i = min; i <= max; i += tickStepValue) {
      const tickPercentage = ((i - min) / (max - min)) * 100
      ticks.push(
        <div
          key={i}
          className="absolute w-0.5 h-2 bg-gray-300 transform -translate-x-1/2"
          style={{ 
            [orientation === 'horizontal' ? 'left' : 'bottom']: `${tickPercentage}%` 
          }}
        />
      )
    }
    
    return (
      <div className={cn(
        "absolute",
        orientation === 'horizontal' 
          ? "top-full mt-1 w-full h-2" 
          : "left-full ml-1 h-full w-2"
      )}>
        {ticks}
      </div>
    )
  }

  const renderMarks = () => {
    if (marks.length === 0) return null

    return (
      <div className={cn(
        "absolute",
        orientation === 'horizontal' 
          ? "top-full mt-3 w-full" 
          : "left-full ml-3 h-full"
      )}>
        {marks.map((mark) => {
          const markPercentage = ((mark.value - min) / (max - min)) * 100
          return (
            <div
              key={mark.value}
              className="absolute transform -translate-x-1/2 text-xs text-gray-600"
              style={{ 
                [orientation === 'horizontal' ? 'left' : 'bottom']: `${markPercentage}%` 
              }}
            >
              {mark.label || mark.value}
            </div>
          )
        })}
      </div>
    )
  }

  const inputClasses = cn(
    // Base styles
    'appearance-none bg-transparent cursor-pointer',
    'focus:outline-none focus:ring-2 focus:ring-blue-500/20',
    
    // Range track styles
    '[&::-webkit-slider-track]:appearance-none',
    '[&::-webkit-slider-track]:h-2',
    '[&::-webkit-slider-track]:rounded-full',
    '[&::-webkit-slider-track]:bg-gray-200',
    '[&::-webkit-slider-track]:border-none',
    
    // Range thumb styles
    '[&::-webkit-slider-thumb]:appearance-none',
    '[&::-webkit-slider-thumb]:h-5',
    '[&::-webkit-slider-thumb]:w-5',
    '[&::-webkit-slider-thumb]:rounded-full',
    '[&::-webkit-slider-thumb]:bg-white',
    '[&::-webkit-slider-thumb]:border-2',
    '[&::-webkit-slider-thumb]:border-blue-500',
    '[&::-webkit-slider-thumb]:cursor-pointer',
    '[&::-webkit-slider-thumb]:shadow-sm',
    '[&::-webkit-slider-thumb]:transition-all',
    '[&::-webkit-slider-thumb]:duration-200',
    
    // Firefox styles
    '[&::-moz-range-track]:h-2',
    '[&::-moz-range-track]:rounded-full',
    '[&::-moz-range-track]:bg-gray-200',
    '[&::-moz-range-track]:border-none',
    '[&::-moz-range-thumb]:appearance-none',
    '[&::-moz-range-thumb]:h-5',
    '[&::-moz-range-thumb]:w-5',
    '[&::-moz-range-thumb]:rounded-full',
    '[&::-moz-range-thumb]:bg-white',
    '[&::-moz-range-thumb]:border-2',
    '[&::-moz-range-thumb]:border-blue-500',
    '[&::-moz-range-thumb]:cursor-pointer',
    '[&::-moz-range-thumb]:shadow-sm',
    
    // Size variants
    size === 'sm' && [
      '[&::-webkit-slider-track]:h-1.5',
      '[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4',
      '[&::-moz-range-track]:h-1.5',
      '[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4',
    ],
    size === 'lg' && [
      '[&::-webkit-slider-track]:h-3',
      '[&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6',
      '[&::-moz-range-track]:h-3',
      '[&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6',
    ],
    
    // Orientation
    orientation === 'vertical' && [
      'w-2 h-32 [writing-mode:bt-lr] [-webkit-appearance:slider-vertical]'
    ],
    orientation === 'horizontal' && 'w-full',
    
    // Disabled state
    disabled && [
      'opacity-50 cursor-not-allowed',
      '[&::-webkit-slider-thumb]:cursor-not-allowed',
      '[&::-moz-range-thumb]:cursor-not-allowed'
    ],
    
    // Focus state
    isFocused && [
      '[&::-webkit-slider-thumb]:ring-2',
      '[&::-webkit-slider-thumb]:ring-blue-500/20',
      '[&::-moz-range-thumb]:ring-2',
      '[&::-moz-range-thumb]:ring-blue-500/20'
    ],
    
    className
  )

  return (
    <InputWrapper
      label={label}
      description={description}
      error={error}
      required={required}
      disabled={disabled}
      size={size}
      clearable={clearable && currentValue !== min}
      onClear={handleClear}
      radius={radius}
    >
      <div className="relative flex flex-col space-y-2">
        {/* Value display */}
        {showValue && (
          <div className="flex justify-between text-sm text-gray-600">
            <span>{min}</span>
            <span className="font-medium">{currentValue}</span>
            <span>{max}</span>
          </div>
        )}
        
        {/* Range container */}
        <div className={cn(
          "relative",
          orientation === 'horizontal' ? "w-full" : "flex justify-center"
        )}>
          {/* Progress fill */}
          <div 
            className={cn(
              "absolute rounded-full bg-blue-500 pointer-events-none",
              orientation === 'horizontal' 
                ? "h-2 top-1/2 transform -translate-y-1/2"
                : "w-2 left-1/2 transform -translate-x-1/2 bottom-0"
            )}
            style={orientation === 'horizontal' 
              ? { width: `${percentage}%` }
              : { height: `${percentage}%` }
            }
          />
          
          {/* Range input */}
          <input
            ref={ref}
            type="range"
            min={min}
            max={max}
            step={step}
            value={currentValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            required={required}
            className={inputClasses}
            style={rangeStyles}
            {...props}
          />
          
          {/* Ticks */}
          {renderTicks()}
          
          {/* Marks */}
          {renderMarks()}
        </div>
      </div>
    </InputWrapper>
  )
})

InputRange.displayName = 'InputRange'