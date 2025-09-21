import { useState } from 'react'
import { Icon, IconType, availableIcons } from '@acomponents/core'
import { X, Copy, Check } from 'lucide-react'

interface IconGalleryProps {
  iconsData: {
    id: string
    name: string
    description: string
    category: string
  }
}

interface IconPopoutProps {
  iconType: IconType
  isOpen: boolean
  onClose: () => void
}

const IconPopout = ({ iconType, isOpen, onClose }: IconPopoutProps) => {
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

  const iconName = iconType.replace(/-/g, '_').toUpperCase()
  const importStatement = `import { Icon, IconType } from '@acomponents/core'`
  const usageStatement = `<Icon type={IconType.${iconName}} />`

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            {iconName.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>


        {/* Icon Preview at Different Sizes */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Preview Sizes</h4>
          <div className="grid grid-cols-4 gap-4 place-items-center bg-gray-50 rounded-lg p-4">
            <div className="flex flex-col items-center gap-1">
              <Icon type={iconType} size="sm" />
              <span className="text-xs text-gray-500">sm</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Icon type={iconType} size="default" />
              <span className="text-xs text-gray-500">default</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Icon type={iconType} size="lg" />
              <span className="text-xs text-gray-500">lg</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Icon type={iconType} size="xl" />
              <span className="text-xs text-gray-500">xl</span>
            </div>
          </div>
        </div>

        {/* Copy Sections */}
        <div className="space-y-4">
          {/* Import Statement */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-700">Import Statement</h4>
              <button
                onClick={() => copyToClipboard(importStatement, 'import')}
                className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
              >
                {copiedItem === 'import' ? (
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
            </div>
            <div className="bg-gray-100 rounded p-3 font-mono text-sm text-gray-800">
              {importStatement}
            </div>
          </div>

          {/* Usage Statement */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-700">Usage</h4>
              <button
                onClick={() => copyToClipboard(usageStatement, 'usage')}
                className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
              >
                {copiedItem === 'usage' ? (
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
            </div>
            <div className="bg-gray-100 rounded p-3 font-mono text-sm text-gray-800">
              {usageStatement}
            </div>
          </div>

          {/* Enum Reference */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-700">Enum Reference</h4>
              <button
                onClick={() => copyToClipboard(`IconType.${iconName}`, 'enum')}
                className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
              >
                {copiedItem === 'enum' ? (
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
            </div>
            <div className="bg-gray-100 rounded p-3 font-mono text-sm text-gray-800">
              IconType.{iconName}
            </div>
          </div>
        </div>

        <div className="mt-6 text-xs text-gray-500">
          Click any copy button to add the code to your clipboard
        </div>
      </div>
    </div>
  )
}

export function IconGallery({ iconsData }: IconGalleryProps) {
  const [selectedIcon, setSelectedIcon] = useState<IconType | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')


  // Group icons by category for organization
  const iconsByCategory = availableIcons.reduce((acc, iconType) => {
    // Determine category based on icon name/type
    const iconName = iconType.toLowerCase()
    let category = 'other'
    
    if (iconName.includes('arrow') || iconName.includes('chevron')) {
      category = 'navigation'
    } else if (['download', 'upload', 'copy', 'delete', 'edit', 'save', 'search', 'filter', 'sort', 'refresh'].some(action => iconName.includes(action))) {
      category = 'actions'
    } else if (['close', 'menu', 'more', 'settings', 'info', 'warning', 'error', 'success', 'help', 'question'].some(ui => iconName.includes(ui))) {
      category = 'interface'
    } else if (['file', 'folder', 'image', 'document', 'video', 'audio', 'link'].some(content => iconName.includes(content))) {
      category = 'content'
    } else if (['user', 'profile', 'heart', 'star', 'share'].some(social => iconName.includes(social))) {
      category = 'user & social'
    } else if (['mail', 'phone', 'message', 'notification', 'bell'].some(comm => iconName.includes(comm))) {
      category = 'communication'
    } else if (['check', 'plus', 'minus', 'loading', 'lock', 'unlock'].some(status => iconName.includes(status))) {
      category = 'status'
    } else if (['grid', 'list', 'calendar', 'clock'].some(layout => iconName.includes(layout))) {
      category = 'layout'
    } else if (['code', 'terminal', 'bug', 'database'].some(dev => iconName.includes(dev))) {
      category = 'development'
    }

    if (!acc[category]) acc[category] = []
    acc[category].push(iconType)
    return acc
  }, {} as Record<string, IconType[]>)

  const categories = ['all', ...Object.keys(iconsByCategory).sort()]

  // Filter icons based on search and category
  const filteredIcons = availableIcons.filter(iconType => {
    const matchesSearch = iconType.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || 
      (iconsByCategory[selectedCategory] && iconsByCategory[selectedCategory].includes(iconType))
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <Icon type={IconType.GRID} size="lg" color="primary" />
              {iconsData.name}
            </h1>
            <p className="text-lg text-gray-600">{iconsData.description}</p>
          </div>
          <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {iconsData.category}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>💡 Usage:</strong> Click any icon to see preview sizes and get copy-paste ready code snippets.
            Each icon is accessible via the <code className="bg-blue-100 px-1 rounded">IconType</code> enum.
          </p>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <label htmlFor="icon-search" className="block text-sm font-medium text-gray-700 mb-1">
              Search Icons
            </label>
            <div className="relative">
              <Icon type={IconType.SEARCH} size="sm" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="icon-search"
                type="text"
                placeholder="Search icons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredIcons.length} of {availableIcons.length} icons
        </div>
      </div>

      {/* Icon Grid */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900">Icon Gallery</h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-16 gap-4">
            {filteredIcons.map((iconType) => (
              <button
                key={iconType}
                onClick={() => setSelectedIcon(iconType)}
                className="flex flex-col items-center p-3 rounded-lg border border-transparent hover:border-blue-200 hover:bg-blue-50 transition-colors group"
                title={iconType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              >
                <Icon 
                  type={iconType} 
                  size="md" 
                  className="text-gray-700 group-hover:text-blue-600 transition-colors"
                />
                <span className="text-xs text-gray-500 mt-1 truncate w-full text-center">
                  {iconType.split('-').pop()}
                </span>
              </button>
            ))}
          </div>

          {filteredIcons.length === 0 && (
            <div className="text-center py-12">
              <Icon type={IconType.SEARCH} size="xl" color="muted" />
              <h3 className="text-lg font-medium text-gray-900 mt-4">No icons found</h3>
              <p className="text-gray-500 mt-2">
                Try adjusting your search terms or category filter.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Icon Popout */}
      {selectedIcon && (
        <IconPopout
          iconType={selectedIcon}
          isOpen={!!selectedIcon}
          onClose={() => setSelectedIcon(null)}
        />
      )}
    </div>
  )
}