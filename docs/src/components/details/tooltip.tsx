import { Button, Tooltip, TooltipPosition } from '@acomponents/core'
import { Info, HelpCircle } from 'lucide-react'

// Example components
export const BasicTooltipPreview = () => (
  <div className="flex gap-4">
    <Tooltip content="This is a basic tooltip">
      <Button variant="outline">Hover me</Button>
    </Tooltip>
    <Tooltip content="I appear on the bottom" position={TooltipPosition.BOTTOM}>
      <Button variant="secondary">Bottom tooltip</Button>
    </Tooltip>
    <Tooltip content="Left side tooltip" position={TooltipPosition.LEFT}>
      <Button variant="ghost">Left tooltip</Button>
    </Tooltip>
  </div>
)

export const TooltipPositionsPreview = () => (
  <div className="grid grid-cols-3 gap-4 place-items-center">
    <Tooltip content="Top Left" position={TooltipPosition.TOP_LEFT}>
      <Button size="sm" variant="outline">TL</Button>
    </Tooltip>
    <Tooltip content="Top" position={TooltipPosition.TOP}>
      <Button size="sm" variant="outline">T</Button>
    </Tooltip>
    <Tooltip content="Top Right" position={TooltipPosition.TOP_RIGHT}>
      <Button size="sm" variant="outline">TR</Button>
    </Tooltip>
    
    <Tooltip content="Left" position={TooltipPosition.LEFT}>
      <Button size="sm" variant="outline">L</Button>
    </Tooltip>
    <div className="text-sm text-gray-500 font-medium">Center</div>
    <Tooltip content="Right" position={TooltipPosition.RIGHT}>
      <Button size="sm" variant="outline">R</Button>
    </Tooltip>
    
    <Tooltip content="Bottom Left" position={TooltipPosition.BOTTOM_LEFT}>
      <Button size="sm" variant="outline">BL</Button>
    </Tooltip>
    <Tooltip content="Bottom" position={TooltipPosition.BOTTOM}>
      <Button size="sm" variant="outline">B</Button>
    </Tooltip>
    <Tooltip content="Bottom Right" position={TooltipPosition.BOTTOM_RIGHT}>
      <Button size="sm" variant="outline">BR</Button>
    </Tooltip>
  </div>
)

export const TooltipVariantsPreview = () => (
  <div className="flex flex-wrap gap-3">
    <Tooltip content="Default tooltip">
      <Button variant="outline">Default</Button>
    </Tooltip>
    <Tooltip content="Secondary style" variant="secondary">
      <Button variant="outline">Secondary</Button>
    </Tooltip>
    <Tooltip content="Dark theme" variant="dark">
      <Button variant="outline">Dark</Button>
    </Tooltip>
    <Tooltip content="Light theme" variant="light">
      <Button variant="outline">Light</Button>
    </Tooltip>
    <Tooltip content="Accent style" variant="accent">
      <Button variant="outline">Accent</Button>
    </Tooltip>
  </div>
)

export const TooltipDelayPreview = () => (
  <div className="flex gap-4">
    <Tooltip content="No delay (0ms)" delayDuration={0}>
      <Button variant="outline">Instant</Button>
    </Tooltip>
    <Tooltip content="Fast (100ms)" delayDuration={100}>
      <Button variant="outline">Fast</Button>
    </Tooltip>
    <Tooltip content="Normal (200ms)" delayDuration={200}>
      <Button variant="outline">Normal</Button>
    </Tooltip>
    <Tooltip content="Slow (500ms)" delayDuration={500}>
      <Button variant="outline">Slow</Button>
    </Tooltip>
  </div>
)

export const StayOpenTooltipPreview = () => (
  <div className="flex gap-4">
    <Tooltip 
      content="Click me to close!" 
      stayOpenUntilClick={true}
      onTooltipClick={() => alert('Tooltip clicked!')}
    >
      <Button variant="outline">
        <Info className="h-4 w-4 mr-2" />
        Click to open
      </Button>
    </Tooltip>
    
    <Tooltip 
      content={
        <div className="space-y-2">
          <div className="font-semibold">Rich Content</div>
          <div>This tooltip has rich content and stays open until clicked!</div>
          <div className="text-xs opacity-75">Click anywhere to close</div>
        </div>
      }
      stayOpenUntilClick={true}
      size="lg"
    >
      <Button variant="secondary">
        <HelpCircle className="h-4 w-4 mr-2" />
        Rich tooltip
      </Button>
    </Tooltip>
  </div>
)

export const TooltipSizesPreview = () => (
  <div className="flex gap-4 items-center">
    <Tooltip content="Small tooltip" size="sm">
      <Button size="sm" variant="outline">Small</Button>
    </Tooltip>
    <Tooltip content="Default size tooltip">
      <Button variant="outline">Default</Button>
    </Tooltip>
    <Tooltip content="Large tooltip with more content" size="lg">
      <Button size="lg" variant="outline">Large</Button>
    </Tooltip>
  </div>
)

export const TooltipAdvancedPreview = () => (
  <div className="flex gap-4 items-center">
    <Tooltip 
      content="No arrow" 
      showArrow={false}
    >
      <Button variant="outline">No Arrow</Button>
    </Tooltip>
    
    <Tooltip 
      content="Custom offset" 
      sideOffset={20}
    >
      <Button variant="outline">Far offset</Button>
    </Tooltip>
    
    <Tooltip 
      content="I'm disabled" 
      disabled={true}
    >
      <Button variant="outline" disabled>Disabled</Button>
    </Tooltip>
  </div>
)

// Component details
const TooltipDetails = {
  description: 'A flexible tooltip component built on Radix primitives with configurable positioning, timing, and interaction modes.',
  features: [
    'Eight positioning options with enum-based configuration',
    'Configurable delay timing for showing tooltips',
    'Stay-open-until-click mode for persistent tooltips',
    'Click handler support for interactive tooltips',
    'Multiple visual variants (default, secondary, dark, light, accent)',
    'Three size options (sm, default, lg)',
    'Optional arrow pointer to trigger element',
    'Built-in animations with smooth transitions',
    'Accessible keyboard navigation and ARIA support',
    'Customizable offsets and positioning',
    'Disable capability for conditional tooltips',
    'Full React.forwardRef support',
  ],
  props: [
    {
      name: 'content',
      type: 'React.ReactNode',
      required: true,
      description: 'The content to display in the tooltip'
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'The element that triggers the tooltip'
    },
    {
      name: 'position',
      type: 'TooltipPosition',
      required: false,
      default: 'TooltipPosition.TOP',
      description: 'Position of the tooltip relative to the trigger (TOP, BOTTOM, LEFT, RIGHT, TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT)'
    },
    {
      name: 'delayDuration',
      type: 'number',
      required: false,
      default: '200',
      description: 'Delay in milliseconds before showing the tooltip'
    },
    {
      name: 'stayOpenUntilClick',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Whether the tooltip should stay open until clicked to close'
    },
    {
      name: 'onTooltipClick',
      type: '(event: React.MouseEvent) => void',
      required: false,
      description: 'Function to call when the tooltip content is clicked'
    },
    {
      name: 'variant',
      type: "'default' | 'secondary' | 'dark' | 'light' | 'accent'",
      required: false,
      default: "'default'",
      description: 'The visual style variant of the tooltip'
    },
    {
      name: 'size',
      type: "'sm' | 'default' | 'lg'",
      required: false,
      default: "'default'",
      description: 'The size of the tooltip'
    },
    {
      name: 'showArrow',
      type: 'boolean',
      required: false,
      default: 'true',
      description: 'Whether the tooltip should show an arrow pointing to the trigger'
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Whether to disable the tooltip completely'
    },
    {
      name: 'sideOffset',
      type: 'number',
      required: false,
      default: '4',
      description: 'Custom offset from the trigger element in pixels'
    },
    {
      name: 'alignOffset',
      type: 'number',
      required: false,
      default: '0',
      description: 'Custom align offset for positioning in pixels'
    },
    {
      name: 'className',
      type: 'string',
      required: false,
      description: 'Additional CSS classes to apply to the tooltip content'
    }
  ],
  examples: [
    {
      title: 'Basic Usage',
      description: 'Simple tooltips with different positions.',
      code: `<div className="flex gap-4">
  <Tooltip content="This is a basic tooltip">
    <Button variant="outline">Hover me</Button>
  </Tooltip>
  <Tooltip content="I appear on the bottom" position={TooltipPosition.BOTTOM}>
    <Button variant="secondary">Bottom tooltip</Button>
  </Tooltip>
  <Tooltip content="Left side tooltip" position={TooltipPosition.LEFT}>
    <Button variant="ghost">Left tooltip</Button>
  </Tooltip>
</div>`,
      preview: BasicTooltipPreview
    },
    {
      title: 'Positioning Options',
      description: 'All eight available positioning options for precise tooltip placement.',
      code: `<div className="grid grid-cols-3 gap-4 place-items-center">
  <Tooltip content="Top Left" position={TooltipPosition.TOP_LEFT}>
    <Button size="sm" variant="outline">TL</Button>
  </Tooltip>
  <Tooltip content="Top" position={TooltipPosition.TOP}>
    <Button size="sm" variant="outline">T</Button>
  </Tooltip>
  // ... more positions
</div>`,
      preview: TooltipPositionsPreview
    },
    {
      title: 'Visual Variants',
      description: 'Different visual styles to match your design system.',
      code: `<div className="flex flex-wrap gap-3">
  <Tooltip content="Default tooltip">
    <Button variant="outline">Default</Button>
  </Tooltip>
  <Tooltip content="Secondary style" variant="secondary">
    <Button variant="outline">Secondary</Button>
  </Tooltip>
  // ... more variants
</div>`,
      preview: TooltipVariantsPreview
    },
    {
      title: 'Delay Configuration',
      description: 'Control how quickly tooltips appear with custom delay timing.',
      code: `<div className="flex gap-4">
  <Tooltip content="No delay (0ms)" delayDuration={0}>
    <Button variant="outline">Instant</Button>
  </Tooltip>
  <Tooltip content="Fast (100ms)" delayDuration={100}>
    <Button variant="outline">Fast</Button>
  </Tooltip>
  // ... more delays
</div>`,
      preview: TooltipDelayPreview
    },
    {
      title: 'Persistent Tooltips',
      description: 'Tooltips that stay open until clicked, perfect for interactive content.',
      code: `<div className="flex gap-4">
  <Tooltip 
    content="Click me to close!" 
    stayOpenUntilClick={true}
    onTooltipClick={() => alert('Tooltip clicked!')}
  >
    <Button variant="outline">
      <Info className="h-4 w-4 mr-2" />
      Click to open
    </Button>
  </Tooltip>
</div>`,
      preview: StayOpenTooltipPreview
    },
    {
      title: 'Size Options',
      description: 'Three different sizes to accommodate various content lengths.',
      code: `<div className="flex gap-4 items-center">
  <Tooltip content="Small tooltip" size="sm">
    <Button size="sm" variant="outline">Small</Button>
  </Tooltip>
  <Tooltip content="Default size tooltip">
    <Button variant="outline">Default</Button>
  </Tooltip>
  <Tooltip content="Large tooltip with more content" size="lg">
    <Button size="lg" variant="outline">Large</Button>
  </Tooltip>
</div>`,
      preview: TooltipSizesPreview
    },
    {
      title: 'Advanced Options',
      description: 'Advanced customization options including arrow control and positioning.',
      code: `<div className="flex gap-4 items-center">
  <Tooltip content="No arrow" showArrow={false}>
    <Button variant="outline">No Arrow</Button>
  </Tooltip>
  <Tooltip content="Custom offset" sideOffset={20}>
    <Button variant="outline">Far offset</Button>
  </Tooltip>
  <Tooltip content="I'm disabled" disabled={true}>
    <Button variant="outline" disabled>Disabled</Button>
  </Tooltip>
</div>`,
      preview: TooltipAdvancedPreview
    }
  ]
}

export default TooltipDetails