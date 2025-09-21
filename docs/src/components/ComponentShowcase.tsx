import { useState, useEffect } from 'react'
import { Code, Eye, Settings, Zap } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import type { ComponentDoc, ExampleDoc } from '../types'

interface ComponentShowcaseProps {
  component: ComponentDoc
}

export function ComponentShowcase({ component }: ComponentShowcaseProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview')
  const [selectedExample, setSelectedExample] = useState<ExampleDoc>(component.examples[0])
  
  // Reset selectedExample when component changes
  useEffect(() => {
    setSelectedExample(component.examples[0])
  }, [component.id]) // Reset when component ID changes
  return (
    <div className="space-y-6">
      {/* Component Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{component.name}</h1>
            <p className="text-lg text-gray-600">{component.description}</p>
          </div>
          <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {component.category}
          </div>
        </div>

        {/* Import Statement */}
        <div className="bg-gray-50 rounded-md p-4 mb-4">
          <p className="text-sm text-gray-600 mb-1">Import</p>
          <code className="text-sm font-mono text-gray-900">{component.imports}</code>
        </div>

        {/* Features */}
        {component.features.length > 0 && (
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-3">
              <Zap className="h-5 w-5 text-yellow-500" />
              Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {component.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-700">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Examples */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b px-6 py-4">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900">
            <Eye className="h-5 w-5 text-green-500" />
            Examples
          </h2>
        </div>

        <div className="p-6">
          {/* Example Selection */}
          {component.examples.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {component.examples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedExample(example)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedExample === example
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {example.title}
                </button>
              ))}
            </div>
          )}

          {/* Example Content */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{selectedExample.title}</h3>
              <p className="text-gray-600 mb-4">{selectedExample.description}</p>
            </div>

            {/* Tab Selection */}
            <div className="flex gap-2 border-b">
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'preview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                <Eye className="inline h-4 w-4 mr-1" />
                Preview
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'code'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                <Code className="inline h-4 w-4 mr-1" />
                Code
              </button>
            </div>

            {/* Tab Content */}
            <div className="min-h-[200px]">
              {activeTab === 'preview' && (
                <div className="border rounded-md p-8 bg-gray-50 flex items-center justify-center">
                  <selectedExample.preview />
                </div>
              )}

              {activeTab === 'code' && (
                <SyntaxHighlighter
                  language="tsx"
                  style={oneLight}
                  customStyle={{
                    borderRadius: '6px',
                    fontSize: '14px',
                  }}
                >
                  {selectedExample.code}
                </SyntaxHighlighter>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Props Documentation */}
      {component.props.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="border-b px-6 py-4">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900">
              <Settings className="h-5 w-5 text-purple-500" />
              Props
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Name</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Type</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Default</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Required</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Description</th>
                </tr>
              </thead>
              <tbody>
                {component.props.map((prop, index) => (
                  <tr key={prop.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 text-sm font-mono text-gray-900">{prop.name}</td>
                    <td className="px-6 py-4 text-sm font-mono text-blue-600">{prop.type}</td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-600">
                      {prop.default || '—'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {prop.required ? (
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium">
                          Required
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-medium">
                          Optional
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}