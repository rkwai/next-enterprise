import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface Element {
  id: string
  name: string
  type: 'character' | 'location' | 'item'
}

interface ElementSelectorProps {
  onElementSelect: (element: Element) => void
  elements?: Element[]
  className?: string
  initialSelected?: Element[]
  initialTab?: 'character' | 'location' | 'item'
}

export function ElementSelector({ onElementSelect, elements, className, initialSelected, initialTab }: ElementSelectorProps) {
  const [activeTab, setActiveTab] = useState<'character' | 'location' | 'item'>('character')
  const [selectedElements, setSelectedElements] = useState<Element[]>(initialSelected || [])

  const handleElementClick = (element: Element) => {
    setSelectedElements((prev) => [...prev, element])
    onElementSelect(element)
  }

  return (
    <div className={twMerge('w-full', className)} data-testid="element-selector">
      <div className="mb-4 flex border-b">
        <button
          onClick={() => setActiveTab('character')}
          className={`px-4 py-2 ${activeTab === 'character' ? 'border-b-2 border-blue-500' : ''}`}
        >
          Characters
        </button>
        <button
          onClick={() => setActiveTab('location')}
          className={`px-4 py-2 ${activeTab === 'location' ? 'border-b-2 border-blue-500' : ''}`}
        >
          Locations
        </button>
        <button
          onClick={() => setActiveTab('item')}
          className={`px-4 py-2 ${activeTab === 'item' ? 'border-b-2 border-blue-500' : ''}`}
        >
          Items
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {elements?.filter(element => element.type === activeTab).map((element) => (
          <button
            key={element.id}
            onClick={() => handleElementClick(element)}
            className="rounded border p-2 text-left hover:bg-gray-50"
          >
            {element.name}
          </button>
        ))}
      </div>
      <div className="mt-4 border-t pt-4">
        <h3 className="mb-2 font-semibold">Selected Elements</h3>
        <div className="flex flex-wrap gap-2">
          {selectedElements.map((element) => (
            <span key={element.id} className="rounded-full bg-blue-100 px-3 py-1 text-sm">
              {element.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
} 