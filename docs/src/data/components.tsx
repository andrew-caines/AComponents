import { Button, Tooltip, TooltipPosition } from '@acomponents/core'
import { Link, Info, HelpCircle } from 'lucide-react'
import type { ComponentDoc, ColorDoc, IconDoc } from '../types'
import { IconConfiguration } from '../components/IconConfiguration'
import { IconUsage } from '../components/IconUsage'

// Example components for the Button documentation
const BasicButtonExample = () => (
  <div className="flex gap-3">
    <Button variant="default">Default</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="outline">Outline</Button>
  </div>
)

const ButtonSizesExample = () => (
  <div className="flex items-center gap-3">
    <Button size="sm">Small</Button>
    <Button size="default">Default</Button>
    <Button size="lg">Large</Button>
    <Button size="icon">
      <Link className="h-4 w-4" />
    </Button>
  </div>
)

const ButtonVariantsExample = () => (
  <div className="flex flex-wrap gap-3">
    <Button variant="default">Default</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="destructive">Destructive</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="link">Link</Button>
  </div>
)

const AsChildExample = () => (
  <div className="flex gap-3">
    <Button asChild variant="outline">
      <a href="#" className="no-underline">
        Link Button
      </a>
    </Button>
    <Button asChild variant="default">
      <button type="submit">Submit Form</button>
    </Button>
  </div>
)

const DisabledExample = () => (
  <div className="flex gap-3">
    <Button disabled>Disabled Default</Button>
    <Button disabled variant="secondary">Disabled Secondary</Button>
    <Button disabled variant="outline">Disabled Outline</Button>
  </div>
)

// Example components for the Tooltip documentation
const BasicTooltipExample = () => (
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

const TooltipPositionsExample = () => (
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

const TooltipVariantsExample = () => (
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

const TooltipDelayExample = () => (
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

const StayOpenTooltipExample = () => (
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

const TooltipSizesExample = () => (
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

const TooltipAdvancedExample = () => (
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

export const componentsData: ComponentDoc[] = [
  {
    id: 'button',
    name: 'Button',
    description: 'A versatile button component built on Radix Slot with multiple variants and sizes.',
    category: 'Forms',
    imports: "import { Button } from '@acomponents/core'",
    features: [
      'Multiple visual variants (default, secondary, destructive, outline, ghost, link)',
      'Three size options (sm, default, lg, icon)',
      'asChild prop for composition flexibility',
      'Built-in focus and disabled states',
      'Accessible keyboard navigation',
      'TypeScript support with proper prop types',
      'Consistent styling with class-variance-authority',
      'Full React.forwardRef support',
    ],
    props: [
      {
        name: 'variant',
        type: "'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'",
        required: false,
        default: "'default'",
        description: 'The visual style variant of the button'
      },
      {
        name: 'size',
        type: "'sm' | 'default' | 'lg' | 'icon'",
        required: false,
        default: "'default'",
        description: 'The size of the button'
      },
      {
        name: 'asChild',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'When true, the button will render as a child within Slot, allowing composition with other elements'
      },
      {
        name: 'disabled',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'Whether the button is disabled'
      },
      {
        name: 'onClick',
        type: '(event: MouseEvent) => void',
        required: false,
        description: 'Function to call when the button is clicked'
      },
      {
        name: 'children',
        type: 'React.ReactNode',
        required: true,
        description: 'The content to display inside the button'
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes to apply to the button'
      }
    ],
    examples: [
      {
        title: 'Basic Usage',
        description: 'The most common button variants for different use cases.',
        code: `<div className="flex gap-3">
  <Button variant="default">Default</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="outline">Outline</Button>
</div>`,
        preview: BasicButtonExample
      },
      {
        title: 'Button Sizes',
        description: 'Different size options including an icon-only variant.',
        code: `<div className="flex items-center gap-3">
  <Button size="sm">Small</Button>
  <Button size="default">Default</Button>
  <Button size="lg">Large</Button>
  <Button size="icon">
    <Link className="h-4 w-4" />
  </Button>
</div>`,
        preview: ButtonSizesExample
      },
      {
        title: 'All Variants',
        description: 'Complete showcase of all available button variants.',
        code: `<div className="flex flex-wrap gap-3">
  <Button variant="default">Default</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="destructive">Destructive</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="link">Link</Button>
</div>`,
        preview: ButtonVariantsExample
      },
      {
        title: 'Composition with asChild',
        description: 'Using the asChild prop to compose buttons with other elements like links.',
        code: `<div className="flex gap-3">
  <Button asChild variant="outline">
    <a href="#" className="no-underline">
      Link Button
    </a>
  </Button>
  <Button asChild variant="default">
    <button type="submit">Submit Form</button>
  </Button>
</div>`,
        preview: AsChildExample
      },
      {
        title: 'Disabled States',
        description: 'Buttons in their disabled state across different variants.',
        code: `<div className="flex gap-3">
  <Button disabled>Disabled Default</Button>
  <Button disabled variant="secondary">Disabled Secondary</Button>
  <Button disabled variant="outline">Disabled Outline</Button>
</div>`,
        preview: DisabledExample
      }
    ]
  },
  {
    id: 'tooltip',
    name: 'Tooltip',
    description: 'A flexible tooltip component built on Radix primitives with configurable positioning, timing, and interaction modes.',
    category: 'Overlay',
    imports: "import { Tooltip, TooltipPosition } from '@acomponents/core'",
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
        preview: BasicTooltipExample
      },
      {
        title: 'All Positions',
        description: 'Complete showcase of all eight positioning options including corner positions.',
        code: `<div className="grid grid-cols-3 gap-4 place-items-center">
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
</div>`,
        preview: TooltipPositionsExample
      },
      {
        title: 'Visual Variants',
        description: 'Different visual styles for various use cases.',
        code: `<div className="flex flex-wrap gap-3">
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
</div>`,
        preview: TooltipVariantsExample
      },
      {
        title: 'Delay Configuration',
        description: 'Control how quickly tooltips appear with configurable delay.',
        code: `<div className="flex gap-4">
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
</div>`,
        preview: TooltipDelayExample
      },
      {
        title: 'Stay Open Until Click',
        description: 'Persistent tooltips that stay open until clicked, perfect for interactive content.',
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
</div>`,
        preview: StayOpenTooltipExample
      },
      {
        title: 'Sizes',
        description: 'Three different sizes to match your content needs.',
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
        preview: TooltipSizesExample
      },
      {
        title: 'Advanced Options',
        description: 'Advanced configuration options including arrow visibility, offsets, and disabled state.',
        code: `<div className="flex gap-4 items-center">
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
</div>`,
        preview: TooltipAdvancedExample
      }
    ]
  }
]

export const colorsData: ColorDoc[] = [
  {
    id: 'design-tokens',
    name: 'Design Tokens',
    description: 'Complete color palette and design tokens used throughout the component library. These colors are automatically synchronized from your CSS custom properties.',
    category: 'Colors'
  }
]

export const iconsData: IconDoc[] = [
  {
    id: 'icon-library',
    name: 'Icon Library',
    description: 'Comprehensive icon system with 70+ curated icons from multiple libraries. Each icon is accessible via TypeScript enums with consistent sizing and styling options.',
    category: 'Icons',
    subPages: [
      {
        id: 'how-to-use',
        name: 'How to Use',
        description: 'Complete guide to using icons with sizing, colors, styling, and real-world examples',
        content: IconUsage
      },
      {
        id: 'how-to-configure',
        name: 'How to Configure',
        description: 'Step-by-step guide to adding new icons from any react-icons library',
        content: IconConfiguration
      }
    ]
  }
]
