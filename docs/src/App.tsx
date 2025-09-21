import { useState } from 'react'
import { ComponentShowcase } from './components/ComponentShowcase'
import { ColorShowcase } from './components/ColorShowcase'
import { IconGallery } from './components/IconGallery'
import { ComponentList } from './components/ComponentList'
import { Header } from './components/Header'
import { componentsData, colorsData, iconsData } from './data/components'
import type { ComponentDoc, ColorDoc, IconDoc, IconSubPage } from './types'

type SelectedItem = ComponentDoc | ColorDoc | IconDoc | null

function App() {
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(
    componentsData[0] || null
  )
  const [selectedSubPage, setSelectedSubPage] = useState<IconSubPage | null>(null)

  const allItems = [...componentsData, ...colorsData, ...iconsData]

  const handleSelectComponent = (component: SelectedItem) => {
    setSelectedItem(component)
    setSelectedSubPage(null) // Reset sub-page when selecting new component
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Component Selection Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <ComponentList
                components={allItems}
                selectedComponent={selectedItem}
                onSelectComponent={handleSelectComponent}
                selectedSubPage={selectedSubPage}
                onSelectSubPage={setSelectedSubPage}
              />
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {selectedSubPage ? (
              <selectedSubPage.content />
            ) : selectedItem ? (
              selectedItem.category === 'Colors' ? (
                <ColorShowcase colorData={selectedItem as ColorDoc} />
              ) : selectedItem.category === 'Icons' ? (
                <IconGallery iconsData={selectedItem as IconDoc} />
              ) : (
                <ComponentShowcase component={selectedItem as ComponentDoc} />
              )
            ) : (
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Welcome to AComponents Documentation
                </h2>
                <p className="text-gray-600">
                  Select a component, color palette, or icon gallery from the sidebar to view documentation and examples.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App