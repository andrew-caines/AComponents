import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils'
import { TooltipPosition } from '../types/tooltip'

const tooltipContentVariants = cva(
  'z-50 overflow-hidden rounded-md px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
  {
    variants: {
      variant: {
        default: 'bg-primary shadow-md',
        secondary: 'bg-secondary text-secondary-foreground border shadow-sm',
        dark: 'bg-gray-900 text-white shadow-lg',
        light: 'bg-white text-gray-900 border shadow-md',
        accent: 'bg-accent text-accent-foreground border shadow-sm',
      },
      size: {
        sm: 'px-2 py-1 text-xs',
        default: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface TooltipProps
  extends Omit<TooltipPrimitive.TooltipContentProps, 'side' | 'align' | 'content'>,
    VariantProps<typeof tooltipContentVariants> {
  /**
   * The content to display in the tooltip
   */
  content: React.ReactNode
  /**
   * The element that triggers the tooltip
   */
  children: React.ReactNode
  /**
   * Position of the tooltip relative to the trigger
   */
  position?: TooltipPosition
  /**
   * Delay in milliseconds before showing the tooltip
   */
  delayDuration?: number
  /**
   * Whether the tooltip should stay open until clicked to close
   */
  stayOpenUntilClick?: boolean
  /**
   * Function to call when the tooltip content is clicked
   */
  onTooltipClick?: (event: React.MouseEvent) => void
  /**
   * Whether the tooltip should show an arrow pointing to the trigger
   */
  showArrow?: boolean
  /**
   * Custom class name for the tooltip content
   */
  className?: string
  /**
   * Whether to disable the tooltip completely
   */
  disabled?: boolean
  /**
   * Custom offset from the trigger element
   */
  sideOffset?: number
  /**
   * Custom align offset for positioning
   */
  alignOffset?: number
}

const TooltipProvider = TooltipPrimitive.Provider
const TooltipRoot = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger
const TooltipContent = TooltipPrimitive.Content
const TooltipArrow = TooltipPrimitive.Arrow

// Helper function to parse position enum into Radix side and align props
const parsePosition = (position: TooltipPosition) => {
  switch (position) {
    case TooltipPosition.TOP:
      return { side: 'top' as const, align: 'center' as const }
    case TooltipPosition.BOTTOM:
      return { side: 'bottom' as const, align: 'center' as const }
    case TooltipPosition.LEFT:
      return { side: 'left' as const, align: 'center' as const }
    case TooltipPosition.RIGHT:
      return { side: 'right' as const, align: 'center' as const }
    case TooltipPosition.TOP_LEFT:
      return { side: 'top' as const, align: 'start' as const }
    case TooltipPosition.TOP_RIGHT:
      return { side: 'top' as const, align: 'end' as const }
    case TooltipPosition.BOTTOM_LEFT:
      return { side: 'bottom' as const, align: 'start' as const }
    case TooltipPosition.BOTTOM_RIGHT:
      return { side: 'bottom' as const, align: 'end' as const }
    default:
      return { side: 'top' as const, align: 'center' as const }
  }
}

export const Tooltip = React.forwardRef<
  React.ElementRef<typeof TooltipContent>,
  TooltipProps
>(
  (
    {
      content,
      children,
      position = TooltipPosition.TOP,
      delayDuration = 200,
      stayOpenUntilClick = false,
      onTooltipClick,
      showArrow = true,
      className,
      variant,
      size,
      disabled = false,
      sideOffset = 4,
      alignOffset = 0,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [manuallyOpened, setManuallyOpened] = React.useState(false)
    const { side, align } = parsePosition(position)

    const handleOpenChange = (open: boolean) => {
      if (stayOpenUntilClick && manuallyOpened) {
        // Don't close if it was manually opened and stayOpenUntilClick is true
        return
      }
      setIsOpen(open)
    }

    const handleTriggerClick = () => {
      if (stayOpenUntilClick) {
        if (isOpen && manuallyOpened) {
          // Close if already manually opened
          setIsOpen(false)
          setManuallyOpened(false)
        } else if (!isOpen) {
          // Open manually
          setIsOpen(true)
          setManuallyOpened(true)
        }
      }
    }

    const handleTooltipClick = (event: React.MouseEvent) => {
      event.stopPropagation()
      
      if (stayOpenUntilClick) {
        setIsOpen(false)
        setManuallyOpened(false)
      }
      
      onTooltipClick?.(event)
    }

    // Handle click outside to close when stayOpenUntilClick is true
    React.useEffect(() => {
      if (!stayOpenUntilClick || !manuallyOpened) return

      const handleClickOutside = (event: MouseEvent) => {
        // This will be handled by the tooltip's built-in behavior
        // We just need to reset our manual state
        if (!event.defaultPrevented) {
          setManuallyOpened(false)
        }
      }

      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }, [stayOpenUntilClick, manuallyOpened])

    if (disabled) {
      return <>{children}</>
    }

    return (
      <TooltipProvider>
        <TooltipRoot
          open={isOpen}
          onOpenChange={handleOpenChange}
          delayDuration={delayDuration}
          disableHoverableContent={stayOpenUntilClick}
        >
          <TooltipTrigger
            asChild
            onClick={handleTriggerClick}
          >
            {children}
          </TooltipTrigger>
          <TooltipContent
            ref={ref}
            side={side}
            align={align}
            sideOffset={sideOffset}
            alignOffset={alignOffset}
            className={cn(tooltipContentVariants({ variant, size, className }))}
            onClick={handleTooltipClick}
            {...props}
          >
            {content}
            {showArrow && (
              <TooltipArrow 
                className="fill-current" 
                width={8} 
                height={4}
              />
            )}
          </TooltipContent>
        </TooltipRoot>
      </TooltipProvider>
    )
  }
)

Tooltip.displayName = 'Tooltip'

// Export components and types for advanced usage
export {
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow,
  tooltipContentVariants,
}
