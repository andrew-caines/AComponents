import { useState } from 'react'
import { Copy, Check, ExternalLink, AlertCircle, CheckCircle } from 'lucide-react'

export function IconConfiguration() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItem(type)
      setTimeout(() => setCopiedItem(null), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const CopyButton = ({ text, type }: { text: string; type: string }) => (
    <button
      onClick={() => copyToClipboard(text, type)}
      className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
    >
      {copiedItem === type ? (
        <>
          <Check className="h-3 w-3" />
          Copied
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" />
          Copy
        </>
      )}
    </button>
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              ⚙️ How to Configure Icons
            </h1>
            <p className="text-lg text-gray-600">
              Step-by-step guide to adding new icons from any react-icons library to your AComponents icon system.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-blue-800 font-medium mb-1">
                Before You Start
              </p>
              <p className="text-sm text-blue-700">
                Make sure you have <code className="bg-blue-100 px-1 rounded">react-icons</code> installed in your project. 
                The AComponents library already includes it as a dependency.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Step 1: Browse react-icons */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <span className="bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">1</span>
            Browse Available Icons
          </h2>
        </div>
        
        <div className="p-6 space-y-4">
          <p className="text-gray-700">
            First, find the icon you want to add from the react-icons library. React-icons includes thousands of icons 
            from popular icon libraries.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-800">🔗 Useful Resources</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">react-icons Official Site</span>
                <a
                  href="https://react-icons.github.io/react-icons/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                >
                  Browse Icons <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Heroicons (hi2)</span>
                <a
                  href="https://heroicons.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                >
                  Browse <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Font Awesome (fa6)</span>
                <a
                  href="https://fontawesome.com/icons"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                >
                  Browse <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Feather Icons (fi)</span>
                <a
                  href="https://feathericons.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                >
                  Browse <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>💡 Tip:</strong> Note the library prefix (e.g., <code>Hi</code> for Heroicons, <code>Fa</code> for FontAwesome) 
              and the exact icon name. You'll need both for the import.
            </p>
          </div>
        </div>
      </div>

      {/* Step 2: Add to IconType Enum */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <span className="bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">2</span>
            Add to IconType Enum
          </h2>
        </div>
        
        <div className="p-6 space-y-4">
          <p className="text-gray-700">
            Add your new icon to the <code className="bg-gray-100 px-1 rounded">IconType</code> enum in the types file.
          </p>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">File: <code>src/types/icon.ts</code></span>
              <CopyButton 
                text={`// Add to the appropriate category\nNEW_ICON = 'new-icon',`}
                type="enum-add"
              />
            </div>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-gray-100">
{`export enum IconType {
  // Navigation
  ARROW_LEFT = 'arrow-left',
  ARROW_RIGHT = 'arrow-right',
  // ... existing icons

  // Add your new icon here (choose appropriate category)
  NEW_ICON = 'new-icon',      // 👈 Add your icon here
  ANOTHER_ICON = 'another',   // 👈 Or here

  // ... rest of enum
}`}
              </pre>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="text-green-800 font-medium mb-1">Naming Convention</p>
                <ul className="text-green-700 space-y-1">
                  <li>• Use UPPER_SNAKE_CASE for enum keys</li>
                  <li>• Use kebab-case for enum values</li>
                  <li>• Choose semantic names (DOWNLOAD vs ICON_1)</li>
                  <li>• Group by category for organization</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step 3: Import Icon Component */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <span className="bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">3</span>
            Import the Icon Component
          </h2>
        </div>
        
        <div className="p-6 space-y-4">
          <p className="text-gray-700">
            Import the actual React component from the appropriate react-icons library.
          </p>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">File: <code>src/components/icons/iconRegistry.tsx</code></span>
              <CopyButton 
                text={`import { HiNewIcon } from 'react-icons/hi2'`}
                type="import-add"
              />
            </div>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-gray-100">
{`// Import icons from various react-icons libraries
import {
  HiArrowLeft,
  HiArrowRight,
  // ... existing Heroicons imports
  HiNewIcon,          // 👈 Add your new icon import here
} from 'react-icons/hi2'

import {
  FaCode,
  FaTerminal,
  // ... existing FontAwesome imports
  FaNewIcon,          // 👈 Or from FontAwesome
} from 'react-icons/fa6'

// You can import from any react-icons library:
import { FiNewIcon } from 'react-icons/fi'    // Feather
import { IoNewIcon } from 'react-icons/io5'   // Ionicons
import { MdNewIcon } from 'react-icons/md'    // Material Design`}
              </pre>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-800 mb-2">📚 Popular react-icons Libraries</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-700">
              <div><code>react-icons/hi2</code> - Heroicons v2</div>
              <div><code>react-icons/fa6</code> - Font Awesome 6</div>
              <div><code>react-icons/fi</code> - Feather Icons</div>
              <div><code>react-icons/io5</code> - Ionicons 5</div>
              <div><code>react-icons/md</code> - Material Design</div>
              <div><code>react-icons/ai</code> - Ant Design</div>
              <div><code>react-icons/bs</code> - Bootstrap Icons</div>
              <div><code>react-icons/ri</code> - Remix Icons</div>
            </div>
          </div>
        </div>
      </div>

      {/* Step 4: Add to Registry */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <span className="bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">4</span>
            Add to Icon Registry
          </h2>
        </div>
        
        <div className="p-6 space-y-4">
          <p className="text-gray-700">
            Map your IconType enum value to the imported React component in the registry.
          </p>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">File: <code>src/components/icons/iconRegistry.tsx</code></span>
              <CopyButton 
                text={`[IconType.NEW_ICON]: HiNewIcon,`}
                type="registry-add"
              />
            </div>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-gray-100">
{`export const iconRegistry: Record<IconType, React.ComponentType<any>> = {
  // Navigation
  [IconType.ARROW_LEFT]: HiArrowLeft,
  [IconType.ARROW_RIGHT]: HiArrowRight,
  // ... existing mappings

  // Add your new icon mapping here
  [IconType.NEW_ICON]: HiNewIcon,          // 👈 Map enum to component
  [IconType.ANOTHER_ICON]: FaAnotherIcon,  // 👈 Can mix different libraries

  // ... rest of registry
}`}
              </pre>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="text-green-800 font-medium mb-1">✅ Registry Rules</p>
                <ul className="text-green-700 space-y-1">
                  <li>• Each IconType enum value must have a corresponding registry entry</li>
                  <li>• You can mix icons from different libraries in the same registry</li>
                  <li>• Use the exact component name from the import</li>
                  <li>• Group related icons together for organization</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step 5: Test Your Icon */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <span className="bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">5</span>
            Test Your New Icon
          </h2>
        </div>
        
        <div className="p-6 space-y-4">
          <p className="text-gray-700">
            Your new icon is now available! Test it in your application.
          </p>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Usage Example</span>
              <CopyButton 
                text={`import { Icon, IconType } from '@acomponents/core'

// Basic usage
<Icon type={IconType.NEW_ICON} />

// With styling
<Icon type={IconType.NEW_ICON} size="lg" color="primary" />

// In a button
<Button>
  <Icon type={IconType.NEW_ICON} size="sm" />
  New Action
</Button>`}
                type="usage-example"
              />
            </div>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-gray-100">
{`import { Icon, IconType } from '@acomponents/core'

// Basic usage
<Icon type={IconType.NEW_ICON} />

// With styling
<Icon type={IconType.NEW_ICON} size="lg" color="primary" />

// In a button
<Button>
  <Icon type={IconType.NEW_ICON} size="sm" />
  New Action
</Button>`}
              </pre>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-medium text-purple-800 mb-2">🚀 Build and Test</h3>
            <div className="space-y-2 text-sm text-purple-700">
              <p>After adding your icon:</p>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Build your component library: <code className="bg-purple-100 px-1 rounded">npm run build</code></li>
                <li>Your new icon will automatically appear in the documentation gallery</li>
                <li>Test it in your app or docs to ensure it renders correctly</li>
                <li>The icon will have full TypeScript support with autocomplete</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Complete Example */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            💡 Complete Example
          </h2>
        </div>
        
        <div className="p-6 space-y-4">
          <p className="text-gray-700">
            Here's a complete example of adding a "Wi-Fi" icon from Heroicons:
          </p>
          
          <div className="grid gap-4">
            {/* Step 1 Example */}
            <div>
              <h4 className="font-medium text-gray-800 mb-2">1. Add to IconType enum:</h4>
              <div className="bg-gray-900 rounded p-3 text-sm">
                <pre className="text-gray-100">
{`// In src/types/icon.ts
export enum IconType {
  // ... existing icons
  WIFI = 'wifi',  // Add this line
  // ... rest of enum
}`}
                </pre>
              </div>
            </div>

            {/* Step 2 Example */}
            <div>
              <h4 className="font-medium text-gray-800 mb-2">2. Import the component:</h4>
              <div className="bg-gray-900 rounded p-3 text-sm">
                <pre className="text-gray-100">
{`// In src/components/icons/iconRegistry.tsx
import {
  // ... existing imports
  HiWifi,  // Add this line
} from 'react-icons/hi2'`}
                </pre>
              </div>
            </div>

            {/* Step 3 Example */}
            <div>
              <h4 className="font-medium text-gray-800 mb-2">3. Add to registry:</h4>
              <div className="bg-gray-900 rounded p-3 text-sm">
                <pre className="text-gray-100">
{`// In the iconRegistry object
export const iconRegistry: Record<IconType, React.ComponentType<any>> = {
  // ... existing mappings
  [IconType.WIFI]: HiWifi,  // Add this line
  // ... rest of mappings
}`}
                </pre>
              </div>
            </div>

            {/* Step 4 Example */}
            <div>
              <h4 className="font-medium text-gray-800 mb-2">4. Use in your app:</h4>
              <div className="bg-gray-900 rounded p-3 text-sm">
                <pre className="text-gray-100">
{`// Now you can use it anywhere!
<Icon type={IconType.WIFI} />
<Icon type={IconType.WIFI} size="lg" color="success" />

// In a button
<Button variant="ghost">
  <Icon type={IconType.WIFI} size="sm" />
  Connect Wi-Fi
</Button>`}
                </pre>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
              <div>
                <p className="text-green-800 font-medium mb-1">That's it! 🎉</p>
                <p className="text-sm text-green-700">
                  Your new icon is now fully integrated with type safety, documentation, 
                  and all the styling options available in the AComponents icon system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            🔧 Troubleshooting
          </h2>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="space-y-4">
            <div className="border-l-4 border-red-400 pl-4">
              <h4 className="font-medium text-red-800 mb-1">Icon not showing up?</h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Check that the icon name exactly matches the react-icons documentation</li>
                <li>• Verify the import path is correct (hi2, fa6, etc.)</li>
                <li>• Make sure the enum value matches the registry key</li>
                <li>• Try building and restarting your development server</li>
              </ul>
            </div>

            <div className="border-l-4 border-yellow-400 pl-4">
              <h4 className="font-medium text-yellow-800 mb-1">TypeScript errors?</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Ensure both the enum and registry are updated</li>
                <li>• Check that the imported component name matches the usage</li>
                <li>• Try restarting your TypeScript language server</li>
              </ul>
            </div>

            <div className="border-l-4 border-blue-400 pl-4">
              <h4 className="font-medium text-blue-800 mb-1">Need help finding icons?</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Use the react-icons search at <a href="https://react-icons.github.io/react-icons/" className="underline">react-icons.github.io</a></li>
                <li>• Check the specific library's website for better browsing</li>
                <li>• Look at existing icons in the registry for naming patterns</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}