import { ChevronRight, ChevronDown, Palette, Box, LayoutGrid } from 'lucide-react'
import type { ComponentDoc, ColorDoc, IconDoc, IconSubPage } from '../types'

type ListItem = ComponentDoc | ColorDoc | IconDoc

interface ComponentListProps {
  components: ListItem[]
  selectedComponent: ListItem | null
  onSelectComponent: (component: ListItem) => void
  selectedSubPage?: IconSubPage | null
  onSelectSubPage?: (subPage: IconSubPage | null) => void
}

export function ComponentList({ 
  components, 
  selectedComponent, 
  onSelectComponent, 
  selectedSubPage, 
  onSelectSubPage 
}: ComponentListProps) {
  // Group components by category
  const groupedComponents = components.reduce((acc, component) => {
    if (!acc[component.category]) {
      acc[component.category] = []
    }
    acc[component.category].push(component)
    return acc
  }, {} as Record<string, ListItem[]>)

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Components</h2>
      
      <div className="space-y-4">
        {Object.entries(groupedComponents).map(([category, categoryComponents]) => (
          <div key={category}>
            <h3 className="text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
              {category}
            </h3>
            <div className="space-y-1">
              {categoryComponents.map((component) => {
                const isColors = component.category === 'Colors'
                const isIcons = component.category === 'Icons'
                const Icon = isColors ? Palette : isIcons ? LayoutGrid : Box
                const iconDoc = isIcons ? (component as IconDoc) : null
                const hasSubPages = iconDoc?.subPages && iconDoc.subPages.length > 0
                const isSelected = selectedComponent?.id === component.id
                
                return (
                  <div key={component.id}>
                    <button
                      onClick={() => onSelectComponent(component)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-md transition-colors ${
                        isSelected && !selectedSubPage
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <span>{component.name}</span>
                      </div>
                      {isSelected && !selectedSubPage && (
                        <ChevronRight className="h-4 w-4" />
                      )}
                      {hasSubPages && isSelected && (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                    
                    {/* Sub-pages */}
                    {hasSubPages && isSelected && iconDoc && (
                      <div className="ml-6 mt-1 space-y-1">
                        {iconDoc.subPages?.map((subPage) => (
                          <button
                            key={subPage.id}
                            onClick={() => onSelectSubPage?.(subPage)}
                            className={`w-full flex items-center justify-between px-3 py-1.5 text-left rounded-md text-sm transition-colors ${
                              selectedSubPage?.id === subPage.id
                                ? 'bg-blue-50 text-blue-700 font-medium'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            <span>• {subPage.name}</span>
                            {selectedSubPage?.id === subPage.id && (
                              <ChevronRight className="h-3 w-3" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}