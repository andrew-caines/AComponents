import { useState } from 'react'
import { Icon, IconType, Button } from '@acomponents/core'
import { Copy, Check, Play, Code } from 'lucide-react'

export function IconUsage() {
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

  const CodeExample = ({ title, code, children }: { title: string; code: string; children: React.ReactNode }) => (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="border-b px-4 py-3 bg-gray-50">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-800 flex items-center gap-2">
            <Code className="h-4 w-4" />
            {title}
          </h4>
          <CopyButton text={code} type={`example-${title.toLowerCase().replace(/\s+/g, '-')}`} />
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <h5 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
              <Play className="h-4 w-4" />
              Preview
            </h5>
            <div className="bg-gray-50 rounded-lg p-6 border">
              {children}
            </div>
          </div>
          <div className="flex-1">
            <h5 className="font-medium text-gray-700 mb-3">Code</h5>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-gray-100">
                <code>{code}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              🎨 How to Use Icons
            </h1>
            <p className="text-lg text-gray-600">
              Complete guide to using icons effectively with sizing, colors, styling, and real-world examples.
            </p>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Icon type={IconType.SUCCESS} size="sm" color="success" />
            <div>
              <p className="text-sm text-green-800 font-medium mb-1">
                Ready to Use
              </p>
              <p className="text-sm text-green-700">
                All examples below are interactive and ready to copy-paste into your application.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Basic Usage */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900">🚀 Basic Usage</h2>
        </div>
        
        <div className="p-6 space-y-6">
          <CodeExample
            title="Simple Icon"
            code={`import { Icon, IconType } from '@acomponents/core'

<Icon type={IconType.DOWNLOAD} />`}
          >
            <div className="flex items-center gap-4">
              <Icon type={IconType.DOWNLOAD} />
              <span className="text-gray-700">Default download icon</span>
            </div>
          </CodeExample>

          <CodeExample
            title="Multiple Icons"
            code={`<div className="flex items-center gap-4">
  <Icon type={IconType.STAR} />
  <Icon type={IconType.HEART} />
  <Icon type={IconType.SHARE} />
  <Icon type={IconType.DOWNLOAD} />
</div>`}
          >
            <div className="flex items-center gap-4">
              <Icon type={IconType.STAR} />
              <Icon type={IconType.HEART} />
              <Icon type={IconType.SHARE} />
              <Icon type={IconType.DOWNLOAD} />
            </div>
          </CodeExample>
        </div>
      </div>

      {/* Size Options */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900">📏 Size Options</h2>
        </div>
        
        <div className="p-6 space-y-6">
          <p className="text-gray-700">
            Icons come in 7 different sizes, from extra small to extra large. Choose the size that fits your design context.
          </p>

          <CodeExample
            title="All Size Options"
            code={`<div className="flex items-center gap-6">
  <Icon type={IconType.STAR} size="xs" />     {/* 12px */}
  <Icon type={IconType.STAR} size="sm" />     {/* 16px */}
  <Icon type={IconType.STAR} size="default" />{/* 20px */}
  <Icon type={IconType.STAR} size="md" />     {/* 24px */}
  <Icon type={IconType.STAR} size="lg" />     {/* 32px */}
  <Icon type={IconType.STAR} size="xl" />     {/* 40px */}
  <Icon type={IconType.STAR} size="2xl" />    {/* 48px */}
</div>`}
          >
            <div className="flex items-end justify-center gap-8 py-4">
              <div className="flex flex-col items-center gap-2">
                <Icon type={IconType.STAR} size="xs" color="primary" />
                <span className="text-xs text-gray-700 font-medium">xs</span>
                <span className="text-xs text-gray-500">12px</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Icon type={IconType.STAR} size="sm" color="primary" />
                <span className="text-xs text-gray-700 font-medium">sm</span>
                <span className="text-xs text-gray-500">16px</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Icon type={IconType.STAR} size="default" color="primary" />
                <span className="text-xs text-gray-700 font-medium">default</span>
                <span className="text-xs text-gray-500">20px</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Icon type={IconType.STAR} size="md" color="primary" />
                <span className="text-xs text-gray-700 font-medium">md</span>
                <span className="text-xs text-gray-500">24px</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Icon type={IconType.STAR} size="lg" color="primary" />
                <span className="text-xs text-gray-700 font-medium">lg</span>
                <span className="text-xs text-gray-500">32px</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Icon type={IconType.STAR} size="xl" color="primary" />
                <span className="text-xs text-gray-700 font-medium">xl</span>
                <span className="text-xs text-gray-500">40px</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Icon type={IconType.STAR} size="2xl" color="primary" />
                <span className="text-xs text-gray-700 font-medium">2xl</span>
                <span className="text-xs text-gray-500">48px</span>
              </div>
            </div>
          </CodeExample>

          <CodeExample
            title="Size Best Practices"
            code={`{/* In buttons */}
<Button size="sm">
  <Icon type={IconType.DOWNLOAD} size="sm" />
  Small Action
</Button>

{/* In headers */}
<h2 className="flex items-center gap-2">
  <Icon type={IconType.SETTINGS} size="md" />
  Settings
</h2>

{/* As decorative elements */}
<div className="text-center">
  <Icon type={IconType.SUCCESS} size="2xl" color="success" />
  <p>Success!</p>
</div>`}
          >
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">In buttons:</p>
                <Button size="sm">
                  <Icon type={IconType.DOWNLOAD} size="sm" />
                  Small Action
                </Button>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">In headers:</p>
                <h3 className="flex items-center gap-2 text-lg font-medium">
                  <Icon type={IconType.SETTINGS} size="md" />
                  Settings
                </h3>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">As decorative elements:</p>
                <div className="text-center">
                  <Icon type={IconType.SUCCESS} size="2xl" color="success" />
                  <p className="text-sm text-gray-600 mt-2">Success!</p>
                </div>
              </div>
            </div>
          </CodeExample>
        </div>
      </div>

      {/* Color Options */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900">🎨 Color Options</h2>
        </div>
        
        <div className="p-6 space-y-6">
          <p className="text-gray-700">
            Icons support 9 color variants including theme colors and semantic colors for consistent branding.
          </p>

          <CodeExample
            title="All Color Options"
            code={`<div className="grid grid-cols-3 gap-4">
  <Icon type={IconType.HEART} color="default" />   {/* Current text color */}
  <Icon type={IconType.HEART} color="primary" />   {/* Theme primary */}
  <Icon type={IconType.HEART} color="secondary" /> {/* Theme secondary */}
  <Icon type={IconType.HEART} color="success" />   {/* Green */}
  <Icon type={IconType.HEART} color="warning" />   {/* Amber */}
  <Icon type={IconType.HEART} color="error" />     {/* Theme destructive */}
  <Icon type={IconType.HEART} color="muted" />     {/* Gray */}
  <Icon type={IconType.HEART} color="white" />     {/* White */}
  <Icon type={IconType.HEART} color="black" />     {/* Black */}
</div>`}
          >
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center gap-2">
                <Icon type={IconType.HEART} color="default" size="lg" />
                <span className="text-xs text-gray-500">default</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Icon type={IconType.HEART} color="primary" size="lg" />
                <span className="text-xs text-gray-500">primary</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Icon type={IconType.HEART} color="secondary" size="lg" />
                <span className="text-xs text-gray-500">secondary</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Icon type={IconType.HEART} color="success" size="lg" />
                <span className="text-xs text-gray-500">success</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Icon type={IconType.HEART} color="warning" size="lg" />
                <span className="text-xs text-gray-500">warning</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Icon type={IconType.HEART} color="error" size="lg" />
                <span className="text-xs text-gray-500">error</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Icon type={IconType.HEART} color="muted" size="lg" />
                <span className="text-xs text-gray-500">muted</span>
              </div>
              <div className="flex flex-col items-center gap-2 bg-gray-800 rounded p-2">
                <Icon type={IconType.HEART} color="white" size="lg" />
                <span className="text-xs text-white">white</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Icon type={IconType.HEART} color="black" size="lg" />
                <span className="text-xs text-gray-500">black</span>
              </div>
            </div>
          </CodeExample>

          <CodeExample
            title="Semantic Color Usage"
            code={`{/* Status indicators */}
<div className="space-y-2">
  <div className="flex items-center gap-2">
    <Icon type={IconType.SUCCESS} color="success" />
    <span>Operation completed successfully</span>
  </div>
  <div className="flex items-center gap-2">
    <Icon type={IconType.WARNING} color="warning" />
    <span>Please review your settings</span>
  </div>
  <div className="flex items-center gap-2">
    <Icon type={IconType.ERROR} color="error" />
    <span>Something went wrong</span>
  </div>
</div>`}
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Icon type={IconType.SUCCESS} color="success" />
                <span className="text-gray-700">Operation completed successfully</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon type={IconType.WARNING} color="warning" />
                <span className="text-gray-700">Please review your settings</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon type={IconType.ERROR} color="error" />
                <span className="text-gray-700">Something went wrong</span>
              </div>
            </div>
          </CodeExample>
        </div>
      </div>

      {/* Special Features */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900">✨ Special Features</h2>
        </div>
        
        <div className="p-6 space-y-6">
          <CodeExample
            title="Spinning Animation"
            code={`{/* Perfect for loading states */}
<div className="flex items-center gap-4">
  <Icon type={IconType.LOADING} spin />
  <span>Loading...</span>
</div>

{/* Refresh buttons */}
<Button variant="ghost">
  <Icon type={IconType.REFRESH} spin size="sm" />
  Refreshing
</Button>`}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Icon type={IconType.LOADING} spin />
                <span className="text-gray-700">Loading...</span>
              </div>
              <Button variant="ghost">
                <Icon type={IconType.REFRESH} spin size="sm" />
                Refreshing
              </Button>
            </div>
          </CodeExample>

          <CodeExample
            title="Custom CSS Classes"
            code={`{/* Add custom styling */}
<Icon 
  type={IconType.STAR} 
  className="hover:scale-110 transition-transform cursor-pointer" 
/>

{/* Drop shadow effect */}
<Icon 
  type={IconType.SHIELD} 
  className="drop-shadow-lg" 
  color="primary" 
  size="lg" 
/>`}
          >
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center gap-2">
                <Icon 
                  type={IconType.STAR} 
                  className="hover:scale-110 transition-transform cursor-pointer" 
                  size="lg"
                />
                <span className="text-xs text-gray-500">Hover me</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Icon 
                  type={IconType.USER} 
                  className="drop-shadow-lg" 
                  color="primary" 
                  size="lg" 
                />
                <span className="text-xs text-gray-500">Drop shadow</span>
              </div>
            </div>
          </CodeExample>
        </div>
      </div>

      {/* New Icons - Financial & Measurement */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900">💰 Financial & Measurement Icons</h2>
        </div>
        
        <div className="p-6 space-y-6">
          <p className="text-gray-700">
            Recently added icons for financial and measurement use cases, perfect for forms and data display.
          </p>

          <CodeExample
            title="Financial & Measurement Icons"
            code={`{/* Financial icons */}
<div className="flex items-center gap-4">
  <Icon type={IconType.DOLLAR} color="success" size="lg" />
  <span>Price: $99.99</span>
</div>

{/* Measurement icons */}
<div className="flex items-center gap-4">
  <Icon type={IconType.SCALE} color="primary" size="lg" />
  <span>Weight: 2.5 kg</span>
</div>

{/* In input components */}
<Input.Decimal 
  label="Price ($)"
  leftIcon={IconType.DOLLAR}
  placeholder="0.00"
/>

<Input.Decimal 
  label="Weight (kg)"
  leftIcon={IconType.SCALE}
  placeholder="0.0"
/>`}
          >
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Icon type={IconType.DOLLAR} color="success" size="lg" />
                  <span className="text-gray-700 font-medium">Price: $99.99</span>
                </div>
                <div className="flex items-center gap-4">
                  <Icon type={IconType.SCALE} color="primary" size="lg" />
                  <span className="text-gray-700 font-medium">Weight: 2.5 kg</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="text-sm text-gray-600 mb-3">Icon showcase:</div>
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <Icon type={IconType.DOLLAR} size="xl" color="success" />
                    <span className="text-xs font-mono text-gray-600">DOLLAR</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon type={IconType.SCALE} size="xl" color="primary" />
                    <span className="text-xs font-mono text-gray-600">SCALE</span>
                  </div>
                </div>
              </div>
            </div>
          </CodeExample>
        </div>
      </div>

      {/* Icon Weight and Styling */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900">💪 Icon Weight & Styling</h2>
        </div>
        
        <div className="p-6 space-y-6">
          <p className="text-gray-700">
            While icons themselves don't have "font-weight", you can achieve bold or heavy effects through color, size, and stroke styles.
          </p>

          <CodeExample
            title="Creating Bold/Heavy Effects"
            code={`{/* Use darker colors for weight */}
<div className="flex items-center gap-4">
  <Icon type={IconType.USER} color="muted" />
  <Icon type={IconType.USER} color="default" />
  <Icon type={IconType.USER} color="black" />
</div>

{/* Use larger sizes for prominence */}
<div className="flex items-center gap-4">
  <Icon type={IconType.HEART} size="sm" />
  <Icon type={IconType.HEART} size="default" />
  <Icon type={IconType.HEART} size="lg" />
  <Icon type={IconType.HEART} size="xl" />
</div>`}
          >
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-600 mb-3">Darker colors for weight:</p>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center gap-1">
                    <Icon type={IconType.USER} color="muted" size="lg" />
                    <span className="text-xs text-gray-500">light</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Icon type={IconType.USER} color="default" size="lg" />
                    <span className="text-xs text-gray-500">normal</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Icon type={IconType.USER} color="black" size="lg" />
                    <span className="text-xs text-gray-500">bold</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-3">Larger sizes for prominence:</p>
                <div className="flex items-center gap-4">
                  <Icon type={IconType.HEART} size="sm" color="error" />
                  <Icon type={IconType.HEART} size="default" color="error" />
                  <Icon type={IconType.HEART} size="lg" color="error" />
                  <Icon type={IconType.HEART} size="xl" color="error" />
                </div>
              </div>
            </div>
          </CodeExample>

          <CodeExample
            title="Custom Stroke Effects"
            code={`{/* Custom CSS for stroke effects */}
<style>
  .icon-thick { filter: contrast(2) brightness(0.8); }
  .icon-outline { filter: contrast(3) brightness(1.2); }
</style>

<div className="flex items-center gap-4">
  <Icon type={IconType.STAR} />
  <Icon type={IconType.STAR} className="icon-thick" />
  <Icon type={IconType.STAR} className="icon-outline" />
</div>`}
          >
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center gap-2">
                <Icon type={IconType.STAR} size="lg" />
                <span className="text-xs text-gray-500">normal</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Icon type={IconType.STAR} size="lg" style={{filter: 'contrast(2) brightness(0.8)'}} />
                <span className="text-xs text-gray-500">thick</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Icon type={IconType.STAR} size="lg" style={{filter: 'contrast(3) brightness(1.2)'}} />
                <span className="text-xs text-gray-500">outline</span>
              </div>
            </div>
          </CodeExample>
        </div>
      </div>

      {/* Real-world Examples */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900">🌍 Real-world Examples</h2>
        </div>
        
        <div className="p-6 space-y-6">
          <CodeExample
            title="Navigation Menu"
            code={`<nav className="space-y-2">
  <a className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100">
    <Icon type={IconType.USER} size="sm" />
    <span>Profile</span>
  </a>
  <a className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100">
    <Icon type={IconType.SETTINGS} size="sm" />
    <span>Settings</span>
  </a>
  <a className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100">
    <Icon type={IconType.BELL} size="sm" />
    <span>Notifications</span>
  </a>
</nav>`}
          >
            <nav className="space-y-2 max-w-xs">
              <a className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 cursor-pointer transition-colors">
                <Icon type={IconType.USER} size="sm" color="default" />
                <span className="text-gray-900 font-medium">Profile</span>
              </a>
              <a className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 cursor-pointer transition-colors">
                <Icon type={IconType.SETTINGS} size="sm" color="default" />
                <span className="text-gray-900 font-medium">Settings</span>
              </a>
              <a className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 cursor-pointer transition-colors">
                <Icon type={IconType.BELL} size="sm" color="default" />
                <span className="text-gray-900 font-medium">Notifications</span>
              </a>
            </nav>
          </CodeExample>

          <CodeExample
            title="Action Buttons"
            code={`<div className="flex gap-2">
  <Button variant="default">
    <Icon type={IconType.DOWNLOAD} size="sm" />
    Download
  </Button>
  <Button variant="outline">
    <Icon type={IconType.SHARE} size="sm" />
    Share
  </Button>
  <Button variant="ghost" size="icon">
    <Icon type={IconType.MORE} size="sm" />
  </Button>
</div>`}
          >
            <div className="flex gap-2">
              <Button variant="default">
                <Icon type={IconType.DOWNLOAD} size="sm" />
                Download
              </Button>
              <Button variant="outline">
                <Icon type={IconType.SHARE} size="sm" />
                Share
              </Button>
              <Button variant="ghost" size="icon">
                <Icon type={IconType.MORE} size="sm" />
              </Button>
            </div>
          </CodeExample>

          <CodeExample
            title="Status Cards"
            code={`<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
    <Icon type={IconType.SUCCESS} color="success" size="lg" />
    <h3 className="font-medium text-green-800 mt-2">Success</h3>
    <p className="text-sm text-green-600">All systems operational</p>
  </div>
  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
    <Icon type={IconType.WARNING} color="warning" size="lg" />
    <h3 className="font-medium text-yellow-800 mt-2">Warning</h3>
    <p className="text-sm text-yellow-600">Minor issues detected</p>
  </div>
  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
    <Icon type={IconType.ERROR} color="error" size="lg" />
    <h3 className="font-medium text-red-800 mt-2">Error</h3>
    <p className="text-sm text-red-600">Action required</p>
  </div>
</div>`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <Icon type={IconType.SUCCESS} color="success" size="lg" />
                <h4 className="font-medium text-green-800 mt-2">Success</h4>
                <p className="text-sm text-green-600">All systems operational</p>
              </div>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <Icon type={IconType.WARNING} color="warning" size="lg" />
                <h4 className="font-medium text-yellow-800 mt-2">Warning</h4>
                <p className="text-sm text-yellow-600">Minor issues detected</p>
              </div>
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <Icon type={IconType.ERROR} color="error" size="lg" />
                <h4 className="font-medium text-red-800 mt-2">Error</h4>
                <p className="text-sm text-red-600">Action required</p>
              </div>
            </div>
          </CodeExample>

          <CodeExample
            title="Loading States"
            code={`<div className="space-y-4">
  <Button disabled>
    <Icon type={IconType.LOADING} spin size="sm" />
    Processing...
  </Button>
  
  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
    <Icon type={IconType.REFRESH} spin color="primary" />
    <div>
      <p className="font-medium text-blue-900">Syncing data</p>
      <p className="text-sm text-blue-700">Please wait while we update...</p>
    </div>
  </div>
</div>`}
          >
            <div className="space-y-4">
              <Button disabled>
                <Icon type={IconType.LOADING} spin size="sm" />
                Processing...
              </Button>
              
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <Icon type={IconType.REFRESH} spin color="primary" />
                <div>
                  <p className="font-medium text-blue-900">Syncing data</p>
                  <p className="text-sm text-blue-700">Please wait while we update...</p>
                </div>
              </div>
            </div>
          </CodeExample>
        </div>
      </div>

      {/* Best Practices */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900">💡 Best Practices</h2>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-green-800 flex items-center gap-2">
                <Icon type={IconType.SUCCESS} color="success" size="sm" />
                Do This
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Use semantic colors (success, error, warning) for status</li>
                <li>• Match icon sizes to text sizes in buttons</li>
                <li>• Use consistent icon families throughout your app</li>
                <li>• Choose descriptive IconType names</li>
                <li>• Use spin animation only for loading states</li>
                <li>• Provide proper aria-labels for accessibility</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-red-800 flex items-center gap-2">
                <Icon type={IconType.ERROR} color="error" size="sm" />
                Avoid This
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Don't mix too many icon styles in one interface</li>
                <li>• Don't use spinning animations for static content</li>
                <li>• Don't make icons too small to be recognizable</li>
                <li>• Don't rely solely on color to convey meaning</li>
                <li>• Don't use decorative icons without proper spacing</li>
                <li>• Don't forget to consider mobile touch targets</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Tips */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900">⚡ Performance Tips</h2>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
              <Icon type={IconType.INFO} color="primary" size="sm" />
              Tree Shaking
            </h3>
            <p className="text-sm text-blue-700">
              AComponents automatically imports only the icons you use, keeping your bundle size small.
              Each icon component is imported individually from react-icons.
            </p>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-medium text-purple-800 mb-2 flex items-center gap-2">
              <Icon type={IconType.CODE} color="secondary" size="sm" />
              Bundle Analysis
            </h3>
            <p className="text-sm text-purple-700 mb-2">
              Monitor your icon usage impact on bundle size:
            </p>
            <div className="bg-purple-900 rounded p-2 text-sm text-purple-100 font-mono">
              npm run build -- --analyze
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}