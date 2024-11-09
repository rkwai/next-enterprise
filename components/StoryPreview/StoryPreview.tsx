import React from 'react'
import { twMerge } from 'tailwind-merge'

interface StoryPreviewProps {
  content: string
  elements: Array<{
    id: string
    name: string
    type: string
  }>
  className?: string
  layout?: 'default' | 'publication'
}

export function StoryPreview({ content, elements, className, layout }: StoryPreviewProps) {
  return (
    <div className={twMerge('w-full', className)} data-testid="story-preview">
      <div className="rounded border p-6">
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
      <div className="mt-4">
        <h3 className="mb-2 font-semibold">Story Elements</h3>
        <div className="flex flex-wrap gap-2">
          {elements.map((element) => (
            <span
              key={element.id}
              className="rounded-full bg-gray-100 px-3 py-1 text-sm"
              data-testid="element-reference"
            >
              {element.name} ({element.type})
            </span>
          ))}
        </div>
      </div>
    </div>
  )
} 