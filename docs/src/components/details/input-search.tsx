import { useState } from 'react'
import { Input, IconType } from '@acomponents/core'

// Example component
export const InputSearchPreview = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [productSearch, setProductSearch] = useState('')
  const [searchResults, setSearchResults] = useState<string[]>([])
  
  const handleSearch = (query: string) => {
    console.log('Searching for:', query)
    // Simulate search results
    const mockResults = [
      `Result 1 for "${query}"`,
      `Result 2 for "${query}"`,
      `Result 3 for "${query}"`
    ].slice(0, query.length > 0 ? 3 : 0)
    setSearchResults(mockResults)
  }
  
  return (
    <div className="space-y-4 max-w-md">
      <Input.Search 
        label="Search Products"
        placeholder="Type to search..."
        value={searchTerm}
        onChange={(val) => setSearchTerm(val)}
        onSearch={handleSearch}
        clearable
        size="lg"
      />
      <Input.Search 
        label="Quick Search"
        placeholder="Search with Enter key"
        value={productSearch}
        onChange={(val) => setProductSearch(val)}
        onSearch={(query) => console.log('Quick search:', query)}
        leftIcon={IconType.SEARCH}
        variant="filled"
      />
      {searchResults.length > 0 && (
        <div className="bg-gray-50 p-3 rounded-md">
          <div className="text-sm font-medium text-gray-700 mb-2">Search Results:</div>
          {searchResults.map((result, index) => (
            <div key={index} className="text-sm text-gray-600">{result}</div>
          ))}
        </div>
      )}
    </div>
  )
}

// Component details
const InputSearchDetails = {
  description: 'Search input component with onSearch callbacks, debouncing, and keyboard shortcuts.',
  features: [
    'onSearch callback triggered by Enter key or search icon',
    'Built-in debouncing to prevent excessive search calls',
    'Search icon with click-to-search functionality',
    'All standard input features (sizing, variants, icons)',
    'Customizable debounce timing',
    'Clear button integration with search reset',
    'Keyboard shortcuts (Enter, Escape) support'
  ],
  props: [
    {
      name: 'label',
      type: 'string',
      required: false,
      description: 'Label text displayed above the input'
    },
    {
      name: 'placeholder',
      type: 'string',
      required: false,
      description: 'Placeholder text when input is empty'
    },
    {
      name: 'value',
      type: 'string',
      required: false,
      description: 'The controlled search value'
    },
    {
      name: 'onChange',
      type: '(value: string) => void',
      required: false,
      description: 'Callback fired when search value changes'
    },
    {
      name: 'onSearch',
      type: '(query: string) => void',
      required: true,
      description: 'Callback fired when search is triggered (Enter key or search icon)'
    },
    {
      name: 'debounceMs',
      type: 'number',
      required: false,
      default: '0',
      description: 'Debounce delay in milliseconds for search calls'
    },
    {
      name: 'clearable',
      type: 'boolean',
      required: false,
      default: 'true',
      description: 'Show clear button when input has value'
    },
    {
      name: 'onClear',
      type: '() => void',
      required: false,
      description: 'Callback fired when search is cleared'
    },
    {
      name: 'leftIcon',
      type: 'IconType',
      required: false,
      description: 'Icon to display on the left side (defaults to search icon)'
    }
  ],
  examples: [
    {
      title: 'Search Input with Callbacks',
      description: 'Search inputs with onSearch callbacks, debouncing, and result display.',
      code: `<div className="space-y-4 max-w-md">
  <Input.Search 
    label="Search Products"
    placeholder="Type to search..."
    onSearch={(query) => handleSearch(query)}
    clearable
    size="lg"
  />
  <Input.Search 
    label="Quick Search"
    placeholder="Search with Enter key"
    onSearch={(query) => console.log('Quick search:', query)}
    leftIcon={IconType.SEARCH}
    variant="filled"
  />
</div>`,
      preview: InputSearchPreview
    }
  ]
}

export default InputSearchDetails