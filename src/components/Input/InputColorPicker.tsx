import React, { forwardRef, useCallback, useState, useEffect, useRef } from 'react'
import { cn } from '@/utils/cn'
import { Icon } from '../icons'
import { IconType } from '../../types/icon'
import { 
  BaseInputProps, 
  InputWrapper 
} from './Input'

// Color format types
export type ColorFormat = 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hsv'

export interface ColorValue {
  hex: string
  rgb: { r: number; g: number; b: number }
  rgba: { r: number; g: number; b: number; a: number }
  hsl: { h: number; s: number; l: number }
  hsla: { h: number; s: number; l: number; a: number }
  hsv: { h: number; s: number; v: number }
}

export interface InputColorPickerProps extends Omit<BaseInputProps<string>, 'type' | 'placeholder'> {
  format?: ColorFormat
  showAlpha?: boolean
  showPresets?: boolean
  presetColors?: string[]
  swatchSize?: 'sm' | 'md' | 'lg'
  showInput?: boolean
  showEyeDropper?: boolean
  pickerStyle?: 'wheel' | 'gradient' | 'swatches'
}

// Color utility functions
class ColorUtils {
  static hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 }
  }

  static rgbToHex(r: number, g: number, b: number): string {
    return "#" + [r, g, b].map(x => {
      const hex = Math.round(x).toString(16)
      return hex.length === 1 ? "0" + hex : hex
    }).join("")
  }

  static rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
    r /= 255
    g /= 255
    b /= 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0
    let s = 0
    const l = (max + min) / 2

    if (max === min) {
      h = s = 0 // achromatic
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }
      h /= 6
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
  }

  static hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
    h /= 360
    s /= 100
    l /= 100

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1/6) return p + (q - p) * 6 * t
      if (t < 1/2) return q
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
      return p
    }

    if (s === 0) {
      return { r: Math.round(l * 255), g: Math.round(l * 255), b: Math.round(l * 255) }
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q
      const r = hue2rgb(p, q, h + 1/3)
      const g = hue2rgb(p, q, h)
      const b = hue2rgb(p, q, h - 1/3)
      
      return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) }
    }
  }

  static rgbToHsv(r: number, g: number, b: number): { h: number; s: number; v: number } {
    r /= 255
    g /= 255
    b /= 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const v = max
    const d = max - min
    const s = max === 0 ? 0 : d / max

    let h = 0
    if (max !== min) {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }
      h /= 6
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), v: Math.round(v * 100) }
  }

  static parseColor(color: string): ColorValue | null {
    if (!color) return null

    // Handle hex colors
    if (color.startsWith('#')) {
      const hex = color
      const rgb = this.hexToRgb(hex)
      const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b)
      const hsv = this.rgbToHsv(rgb.r, rgb.g, rgb.b)
      
      return {
        hex,
        rgb,
        rgba: { ...rgb, a: 1 },
        hsl,
        hsla: { ...hsl, a: 1 },
        hsv
      }
    }

    // Handle rgb/rgba colors
    const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
    if (rgbMatch) {
      const r = parseInt(rgbMatch[1])
      const g = parseInt(rgbMatch[2])
      const b = parseInt(rgbMatch[3])
      const a = rgbMatch[4] ? parseFloat(rgbMatch[4]) : 1
      
      const hex = this.rgbToHex(r, g, b)
      const hsl = this.rgbToHsl(r, g, b)
      const hsv = this.rgbToHsv(r, g, b)
      
      return {
        hex,
        rgb: { r, g, b },
        rgba: { r, g, b, a },
        hsl,
        hsla: { ...hsl, a },
        hsv
      }
    }

    // Handle hsl/hsla colors
    const hslMatch = color.match(/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*([\d.]+))?\)/)
    if (hslMatch) {
      const h = parseInt(hslMatch[1])
      const s = parseInt(hslMatch[2])
      const l = parseInt(hslMatch[3])
      const a = hslMatch[4] ? parseFloat(hslMatch[4]) : 1
      
      const rgb = this.hslToRgb(h, s, l)
      const hex = this.rgbToHex(rgb.r, rgb.g, rgb.b)
      const hsv = this.rgbToHsv(rgb.r, rgb.g, rgb.b)
      
      return {
        hex,
        rgb,
        rgba: { ...rgb, a },
        hsl: { h, s, l },
        hsla: { h, s, l, a },
        hsv
      }
    }

    return null
  }

  static formatColor(colorValue: ColorValue, format: ColorFormat, showAlpha = false): string {
    switch (format) {
      case 'hex':
        return colorValue.hex
      case 'rgb':
        const { r, g, b } = colorValue.rgb
        return `rgb(${r}, ${g}, ${b})`
      case 'rgba':
        const rgba = colorValue.rgba
        return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${showAlpha ? rgba.a : 1})`
      case 'hsl':
        const { h, s, l } = colorValue.hsl
        return `hsl(${h}, ${s}%, ${l}%)`
      case 'hsla':
        const hsla = colorValue.hsla
        return `hsla(${hsla.h}, ${hsla.s}%, ${hsla.l}%, ${showAlpha ? hsla.a : 1})`
      case 'hsv':
        const { h: hv, s: sv, v } = colorValue.hsv
        return `hsv(${hv}, ${sv}%, ${v}%)`
      default:
        return colorValue.hex
    }
  }
}

const DEFAULT_PRESETS = [
  '#FF0000', '#FF4500', '#FFA500', '#FFD700', '#FFFF00', '#ADFF2F',
  '#00FF00', '#00FFFF', '#0000FF', '#4169E1', '#8A2BE2', '#FF00FF',
  '#FF1493', '#FF69B4', '#FFC0CB', '#000000', '#404040', '#808080',
  '#C0C0C0', '#FFFFFF'
]

export const InputColorPicker = forwardRef<HTMLInputElement, InputColorPickerProps>(({
  className,
  size = 'md',
  variant = 'default',
  disabled = false,
  required = false,
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  format = 'hex',
  showAlpha = false,
  showPresets = true,
  presetColors = DEFAULT_PRESETS,
  swatchSize = 'md',
  showInput = true,
  showEyeDropper = false,
  pickerStyle = 'gradient',
  label,
  description,
  error,
  clearable = true,
  onClear,
  radius,
  ...props
}, ref) => {
  const [internalValue, setInternalValue] = useState<string>(
    value !== undefined ? value : (defaultValue || '#000000')
  )
  const [isPickerOpen, setIsPickerOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const pickerRef = useRef<HTMLDivElement>(null)

  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue
  const colorValue = ColorUtils.parseColor(currentValue)

  useEffect(() => {
    if (colorValue) {
      const formatted = ColorUtils.formatColor(colorValue, format, showAlpha)
      setInputValue(formatted)
    }
  }, [currentValue, format, showAlpha, colorValue])

  useEffect(() => {
    if (isControlled && value !== undefined) {
      setInternalValue(value)
    }
  }, [value, isControlled])

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsPickerOpen(false)
      }
    }

    if (isPickerOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isPickerOpen])

  const handleColorChange = useCallback((newColor: string) => {
    const parsedColor = ColorUtils.parseColor(newColor)
    if (!parsedColor) return

    const formattedColor = ColorUtils.formatColor(parsedColor, format, showAlpha)
    
    if (!isControlled) {
      setInternalValue(formattedColor)
    }
    
    onChange?.(formattedColor, null as any)
  }, [onChange, isControlled, format, showAlpha])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    
    const parsedColor = ColorUtils.parseColor(newValue)
    if (parsedColor) {
      handleColorChange(newValue)
    }
  }, [handleColorChange])

  const handlePresetClick = useCallback((color: string) => {
    handleColorChange(color)
    setIsPickerOpen(false)
  }, [handleColorChange])

  const handleClear = useCallback(() => {
    const clearValue = '#000000'
    if (!isControlled) {
      setInternalValue(clearValue)
    }
    onClear?.(clearValue)
    onChange?.(clearValue, null as any)
  }, [isControlled, onClear, onChange])

  const handleEyeDropper = useCallback(async () => {
    if (!('EyeDropper' in window)) {
      console.warn('EyeDropper API is not supported in this browser')
      return
    }

    try {
      // @ts-ignore - EyeDropper is not in TypeScript types yet
      const eyeDropper = new EyeDropper()
      const result = await eyeDropper.open()
      handleColorChange(result.sRGBHex)
    } catch (error) {
      console.error('Error using EyeDropper:', error)
    }
  }, [handleColorChange])

  const swatchSizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  }

  const ColorSwatch = ({ color, size: swatchSizeOverride, onClick, className: swatchClassName }: {
    color: string
    size?: 'sm' | 'md' | 'lg'
    onClick?: () => void
    className?: string
  }) => (
    <div
      className={cn(
        'relative rounded-md border-2 border-gray-300 cursor-pointer transition-all duration-200',
        'hover:scale-110 hover:border-blue-500',
        currentValue === color && 'ring-2 ring-blue-500 ring-offset-2',
        swatchSizeClasses[swatchSizeOverride || swatchSize],
        onClick && 'cursor-pointer',
        !onClick && 'cursor-default',
        swatchClassName
      )}
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {/* Checkered background for transparency */}
      <div 
        className="absolute inset-0 rounded-sm opacity-20"
        style={{
          backgroundImage: `linear-gradient(45deg, #ccc 25%, transparent 25%), 
                           linear-gradient(-45deg, #ccc 25%, transparent 25%), 
                           linear-gradient(45deg, transparent 75%, #ccc 75%), 
                           linear-gradient(-45deg, transparent 75%, #ccc 75%)`,
          backgroundSize: '8px 8px',
          backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px'
        }}
      />
    </div>
  )

  return (
    <InputWrapper
      label={label}
      description={description}
      error={error}
      required={required}
      disabled={disabled}
      size={size}
      clearable={clearable && currentValue !== '#000000'}
      onClear={handleClear}
      radius={radius}
    >
      <div className="relative">
        {/* Color input and swatch */}
        <div className="flex items-center space-x-2">
          {/* Color swatch trigger */}
          <ColorSwatch
            color={currentValue || '#000000'}
            onClick={() => !disabled && setIsPickerOpen(!isPickerOpen)}
            className={cn(
              'flex-shrink-0',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          />

          {/* Text input */}
          {showInput && (
            <input
              ref={ref}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onFocus={onFocus}
              onBlur={onBlur}
              disabled={disabled}
              required={required}
              className={cn(
                'flex-1 px-3 py-2 text-sm bg-background border border-input rounded-md',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
                'disabled:cursor-not-allowed disabled:opacity-50',
                size === 'sm' && 'px-2 py-1 text-xs',
                size === 'lg' && 'px-4 py-3 text-base',
                className
              )}
              {...props}
            />
          )}

          {/* Eye dropper button */}
          {showEyeDropper && 'EyeDropper' in window && (
            <button
              type="button"
              onClick={handleEyeDropper}
              disabled={disabled}
              className={cn(
                'p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
              title="Pick color from screen"
            >
              <Icon type={IconType.SEARCH} size="sm" />
            </button>
          )}
        </div>

        {/* Color picker dropdown */}
        {isPickerOpen && !disabled && (
          <div
            ref={pickerRef}
            className={cn(
              'absolute top-full mt-2 left-0 z-50 p-4 bg-white rounded-lg shadow-xl border border-gray-200',
              'min-w-[280px] max-w-[320px]'
            )}
          >
            {/* Gradient picker */}
            {pickerStyle === 'gradient' && (
              <div className="space-y-4">
                {/* Hue bar */}
                <div className="relative h-4 rounded-lg overflow-hidden">
                  <div
                    className="w-full h-full"
                    style={{
                      background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)'
                    }}
                  />
                </div>

                {/* Saturation/Lightness square */}
                <div 
                  className="relative w-full h-32 rounded-lg overflow-hidden cursor-crosshair"
                  style={{
                    background: `linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1)), 
                                linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0))`
                  }}
                />
              </div>
            )}

            {/* Alpha slider */}
            {showAlpha && (
              <div className="mt-4">
                <div className="text-xs font-medium text-gray-700 mb-2">Opacity</div>
                <div className="relative h-4 rounded-lg overflow-hidden">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `linear-gradient(45deg, #ccc 25%, transparent 25%), 
                                       linear-gradient(-45deg, #ccc 25%, transparent 25%), 
                                       linear-gradient(45deg, transparent 75%, #ccc 75%), 
                                       linear-gradient(-45deg, transparent 75%, #ccc 75%)`,
                      backgroundSize: '8px 8px'
                    }}
                  />
                  <div
                    className="w-full h-full"
                    style={{
                      background: `linear-gradient(to right, transparent, ${currentValue})`
                    }}
                  />
                </div>
              </div>
            )}

            {/* Color presets */}
            {showPresets && presetColors && presetColors.length > 0 && (
              <div className="mt-4">
                <div className="text-xs font-medium text-gray-700 mb-2">Presets</div>
                <div className="grid grid-cols-10 gap-1">
                  {presetColors.map((color, index) => (
                    <ColorSwatch
                      key={index}
                      color={color}
                      size="sm"
                      onClick={() => handlePresetClick(color)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Format selector */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="text-xs font-medium text-gray-700 mb-2">Format</div>
              <div className="flex flex-wrap gap-1">
                {(['hex', 'rgb', 'hsl'] as ColorFormat[]).map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => {
                      if (colorValue) {
                        const newValue = ColorUtils.formatColor(colorValue, fmt, showAlpha)
                        handleColorChange(newValue)
                      }
                    }}
                    className={cn(
                      'px-2 py-1 text-xs rounded transition-colors',
                      format === fmt
                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    )}
                  >
                    {fmt.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </InputWrapper>
  )
})

InputColorPicker.displayName = 'InputColorPicker'