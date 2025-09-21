import type { ComponentDoc, ColorDoc, IconDoc } from '../types'
import { IconConfiguration } from '../components/IconConfiguration'
import { IconUsage } from '../components/IconUsage'

// Import component details
import ButtonDetails from '../components/details/button'
import TooltipDetails from '../components/details/tooltip'
import InputTextDetails from '../components/details/input-text'
import InputPasswordDetails from '../components/details/input-password'
import InputEmailDetails from '../components/details/input-email'
import InputUrlDetails from '../components/details/input-url'
import InputSearchDetails from '../components/details/input-search'
import InputNumberDetails from '../components/details/input-number'
import InputDecimalDetails from '../components/details/input-decimal'
import InputColorPickerDetails from '../components/details/input-colorpicker'
import InputRangeDetails from '../components/details/input-range'
import ColorsDetails from '../components/details/colors'

export const componentsData: ComponentDoc[] = [
  {
    id: 'input-text',
    name: 'Text Input',
    description: InputTextDetails.description,
    category: 'Input System',
    imports: "import { Input, IconType } from '@acomponents/core'",
    features: InputTextDetails.features,
    props: InputTextDetails.props,
    examples: InputTextDetails.examples
  },
  {
    id: 'input-password',
    name: 'Password Input',
    description: InputPasswordDetails.description,
    category: 'Input System',
    imports: "import { Input } from '@acomponents/core'",
    features: InputPasswordDetails.features,
    props: InputPasswordDetails.props,
    examples: InputPasswordDetails.examples
  },
  {
    id: 'input-email',
    name: 'Email Input',
    description: InputEmailDetails.description,
    category: 'Input System',
    imports: "import { Input, IconType } from '@acomponents/core'",
    features: InputEmailDetails.features,
    props: InputEmailDetails.props,
    examples: InputEmailDetails.examples
  },
  {
    id: 'input-url',
    name: 'URL Input',
    description: InputUrlDetails.description,
    category: 'Input System',
    imports: "import { Input, IconType } from '@acomponents/core'",
    features: InputUrlDetails.features,
    props: InputUrlDetails.props,
    examples: InputUrlDetails.examples
  },
  {
    id: 'input-search',
    name: 'Search Input',
    description: InputSearchDetails.description,
    category: 'Input System',
    imports: "import { Input, IconType } from '@acomponents/core'",
    features: InputSearchDetails.features,
    props: InputSearchDetails.props,
    examples: InputSearchDetails.examples
  },
  {
    id: 'input-number',
    name: 'Number Input',
    description: InputNumberDetails.description,
    category: 'Input System',
    imports: "import { Input, IconType } from '@acomponents/core'",
    features: InputNumberDetails.features,
    props: InputNumberDetails.props,
    examples: InputNumberDetails.examples
  },
  {
    id: 'input-decimal',
    name: 'Decimal Input',
    description: InputDecimalDetails.description,
    category: 'Input System',
    imports: "import { Input, IconType } from '@acomponents/core'",
    features: InputDecimalDetails.features,
    props: InputDecimalDetails.props,
    examples: InputDecimalDetails.examples
  },
  {
    id: 'input-colorpicker',
    name: 'Color Picker',
    description: InputColorPickerDetails.description,
    category: 'Input System',
    imports: "import { Input } from '@acomponents/core'",
    features: InputColorPickerDetails.features,
    props: InputColorPickerDetails.props,
    examples: InputColorPickerDetails.examples
  },
  {
    id: 'input-range',
    name: 'Range Input',
    description: InputRangeDetails.description,
    category: 'Input System',
    imports: "import { Input } from '@acomponents/core'",
    features: InputRangeDetails.features,
    props: InputRangeDetails.props,
    examples: InputRangeDetails.examples
  },
  {
    id: 'colors',
    name: 'Color System',
    description: ColorsDetails.description,
    category: 'Design System',
    imports: "// CSS Variables are automatically available",
    features: ColorsDetails.features,
    props: ColorsDetails.props,
    examples: ColorsDetails.examples
  },
  {
    id: 'button',
    name: 'Button',
    description: ButtonDetails.description,
    category: 'Forms',
    imports: "import { Button } from '@acomponents/core'",
    features: ButtonDetails.features,
    props: ButtonDetails.props,
    examples: ButtonDetails.examples
  },
  {
    id: 'tooltip',
    name: 'Tooltip',
    description: TooltipDetails.description,
    category: 'Overlay',
    imports: "import { Tooltip, TooltipPosition } from '@acomponents/core'",
    features: TooltipDetails.features,
    props: TooltipDetails.props,
    examples: TooltipDetails.examples
  }
]

// Colors data 
export const colorsData: ColorDoc[] = [
  {
    id: 'color-system',
    name: 'Color Palette',
    description: 'Complete color system with swatches, CSS variables, and theming support.',
    category: 'Design System'
  }
]

// Icons data (unchanged)
export const iconsData: IconDoc[] = [
  {
    id: 'icon-library',
    name: 'Icon Library',
    description: 'A comprehensive collection of icons for your interface.',
    category: 'Icons',
    subPages: [
      {
        id: 'icon-usage',
        name: 'Usage Guide',
        description: 'How to use icons in your components',
        content: IconUsage
      },
      {
        id: 'icon-config',
        name: 'Configuration',
        description: 'Icon system configuration and customization',
        content: IconConfiguration
      }
    ]
  }
]