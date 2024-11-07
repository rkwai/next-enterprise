import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface AIGenerationProps {
  onGenerate: (parameters: {
    title: string
    direction: string
    genre: string
    elements: string[]
  }) => Promise<string>
  className?: string
}

export function AIGeneration({ onGenerate, className }: AIGenerationProps) {
  const [title, setTitle] = useState('')
  const [direction, setDirection] = useState('')
  const [genre, setGenre] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      await onGenerate({ title, direction, genre, elements: [] })
    } catch (error) {
      console.error('Generation failed:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className={twMerge('w-full', className)} data-testid="ai-generation">
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Story Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded border p-2"
        />
        <textarea
          placeholder="Story Direction"
          value={direction}
          onChange={(e) => setDirection(e.target.value)}
          className="h-32 w-full rounded border p-2"
        />
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-full rounded border p-2"
        >
          <option value="">Select Genre</option>
          <option value="Fantasy">Fantasy</option>
          <option value="SciFi">Science Fiction</option>
          <option value="Mystery">Mystery</option>
        </select>
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isGenerating ? 'Generating...' : 'Generate Story'}
        </button>
      </div>
    </div>
  )
} 