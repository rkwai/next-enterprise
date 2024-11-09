import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface StoryEditorProps {
  initialContent?: string
  onContentChange?: (content: string) => void
  className?: string
  showUndoRedo?: boolean
}

export const StoryEditor: React.FC<StoryEditorProps> = ({ initialContent = '', onContentChange, className }) => {
  const [content, setContent] = useState(initialContent)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    setContent(newContent)
    onContentChange?.(newContent)
  }

  return (
    <div className={twMerge('w-full', className)} data-testid="story-editor">
      <textarea
        value={content}
        onChange={handleChange}
        className="min-h-[400px] w-full rounded border border-gray-300 p-4"
        data-testid="editor-content"
      />
    </div>
  )
} 