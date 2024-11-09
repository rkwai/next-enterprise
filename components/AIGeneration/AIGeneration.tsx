import React, { useState, useCallback } from 'react'
import { twMerge } from 'tailwind-merge'

interface AIGenerationProps {
  onGenerate: (parameters: {
    title: string
    direction: string
    genre: string
    elements: string[]
  }) => Promise<string>
  className?: string
  initialData?: {
    title: string;
    direction: string;
    genre: string;
    elements: string[];
  };
  onError?: (error: Error) => void;
}

export function AIGeneration({ onGenerate, className, initialData, onError }: AIGenerationProps) {
  const [title, setTitle] = useState(initialData?.title || '')
  const [direction, setDirection] = useState(initialData?.direction || '')
  const [genre, setGenre] = useState(initialData?.genre || '')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true)
    try {
      await onGenerate({ title, direction, genre, elements: [] })
    } catch (error) {
      console.error('Generation failed:', error)
      onError?.(error instanceof Error ? error : new Error('Generation failed'))
    } finally {
      setIsGenerating(false)
    }
  }, [title, direction, genre, onGenerate, onError])

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