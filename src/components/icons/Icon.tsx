import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils'
import { IconType } from '../../types/icon'
import { getIconComponent, iconRegistry } from './iconRegistry'

const iconVariants = cva(
  'inline-block shrink-0',
  {
    variants: {
      size: {
        xs: '!h-3 !w-3',
        sm: '!h-4 !w-4',
        default: '!h-5 !w-5',
        md: '!h-6 !w-6',
        lg: '!h-8 !w-8',
        xl: '!h-10 !w-10',
        '2xl': '!h-12 !w-12',
      },
      color: {
        default: 'text-gray-700',
        primary: 'text-primary',
        secondary: 'text-secondary-foreground',
        success: 'text-green-600',
        warning: 'text-amber-500',
        error: 'text-destructive',
        muted: 'text-gray-500',
        white: 'text-white',
        black: 'text-black',
      },
    },
    defaultVariants: {
      size: 'default',
      color: 'default',
    },
  }
)

export interface IconProps
  extends Omit<React.SVGAttributes<SVGElement>, 'color'>,
    VariantProps<typeof iconVariants> {
  /**
   * The type of icon to display
   */
  type: IconType
  /**
   * Custom class name
   */
  className?: string
  /**
   * Whether the icon should spin (useful for loading icons)
   */
  spin?: boolean
}

export const Icon = React.forwardRef<SVGElement, IconProps>(
  ({ type, size, color, className, spin = false, ...props }, _ref) => {
    const IconComponent = getIconComponent(type)
    
    const iconClasses = cn(
      iconVariants({ size, color }),
      spin && 'animate-spin',
      className
    )

    if (!IconComponent) {
      console.warn(`Icon type "${type}" not found in registry. Available types:`, Object.keys(iconRegistry))
      return <span className={iconClasses}>?</span>
    }

    return React.createElement(IconComponent, {
      className: iconClasses,
      'aria-label': `${type} icon`,
      ...props
    })
  }
)

Icon.displayName = 'Icon'

// Export useful utilities
export { iconVariants }
