import { Button } from '@acomponents/core'
import { Link } from 'lucide-react'

// Example components
export const BasicButtonPreview = () => (
  <div className="flex gap-3">
    <Button variant="default">Default</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="outline">Outline</Button>
  </div>
)

export const ButtonSizesPreview = () => (
  <div className="flex items-center gap-3">
    <Button size="sm">Small</Button>
    <Button size="default">Default</Button>
    <Button size="lg">Large</Button>
    <Button size="icon">
      <Link className="h-4 w-4" />
    </Button>
  </div>
)

export const ButtonVariantsPreview = () => (
  <div className="flex flex-wrap gap-3">
    <Button variant="default">Default</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="destructive">Destructive</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="link">Link</Button>
  </div>
)

export const AsChildPreview = () => (
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

export const DisabledPreview = () => (
  <div className="flex gap-3">
    <Button disabled>Disabled Default</Button>
    <Button disabled variant="secondary">Disabled Secondary</Button>
    <Button disabled variant="outline">Disabled Outline</Button>
  </div>
)

// Component details
const ButtonDetails = {
  description: 'A versatile button component built on Radix Slot with multiple variants and sizes.',
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
      preview: BasicButtonPreview
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
      preview: ButtonSizesPreview
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
      preview: ButtonVariantsPreview
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
      preview: AsChildPreview
    },
    {
      title: 'Disabled States',
      description: 'Buttons in their disabled state across different variants.',
      code: `<div className="flex gap-3">
  <Button disabled>Disabled Default</Button>
  <Button disabled variant="secondary">Disabled Secondary</Button>
  <Button disabled variant="outline">Disabled Outline</Button>
</div>`,
      preview: DisabledPreview
    }
  ]
}

export default ButtonDetails