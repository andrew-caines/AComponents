import { Book } from 'lucide-react'

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <Book className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AComponents</h1>
            <p className="text-sm text-gray-600">
              React component library built on Radix primitives
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}