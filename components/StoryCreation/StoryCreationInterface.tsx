'use client'

import React, { useState } from 'react'
import { AIGeneration } from '../AIGeneration/AIGeneration'
import { ElementSelector } from '../ElementSelector/ElementSelector'
import { StoryEditor } from '../StoryEditor/StoryEditor'
import { StoryPreview } from '../StoryPreview/StoryPreview'

interface Element {
  id: string
  name: string
  type: 'character' | 'location' | 'item'
}

export function StoryCreationInterface() {
  const [currentStep, setCurrentStep] = useState<'input' | 'edit' | 'preview'>('input')
  const [storyContent, setStoryContent] = useState('')
  const [selectedElements, setSelectedElements] = useState<Element[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleGenerate = async (parameters: {
    title: string
    direction: string
    genre: string
    elements: string[]
  }) => {
    setIsGenerating(true)
    try {
      const response = await fetch('/api/story/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...parameters, elements: selectedElements }),
      })
      const data = await response.json() as { content: string }
      setStoryContent(data.content)
      setCurrentStep('edit')
      return data.content
    } catch (error) {
      console.error('Failed to generate story:', error)
      return ''
    } finally {
      setIsGenerating(false)
    }
  }

  const handleElementSelect = (element: Element) => {
    setSelectedElements((prev) => [...prev, element])
  }

  const handlePublish = async () => {
    setIsSaving(true)
    try {
      await fetch('/api/story/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: storyContent, elements: selectedElements }),
      })
    } catch (error) {
      console.error('Failed to publish story:', error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-8" data-testid="story-creation-interface">
      <div className="flex justify-center space-x-4 border-b pb-4">
        <StepButton
          active={currentStep === 'input'}
          onClick={() => setCurrentStep('input')}
          disabled={isGenerating}
        >
          1. Story Input
        </StepButton>
        <StepButton
          active={currentStep === 'edit'}
          onClick={() => setCurrentStep('edit')}
          disabled={!storyContent || isGenerating}
        >
          2. Edit Story
        </StepButton>
        <StepButton
          active={currentStep === 'preview'}
          onClick={() => setCurrentStep('preview')}
          disabled={!storyContent || isGenerating}
        >
          3. Preview
        </StepButton>
      </div>

      <div className="min-h-[600px]">
        {currentStep === 'input' && (
          <div className="grid gap-8 md:grid-cols-2">
            <AIGeneration onGenerate={handleGenerate} />
            <ElementSelector onElementSelect={handleElementSelect} elements={[]} />
          </div>
        )}

        {currentStep === 'edit' && (
          <StoryEditor
            initialContent={storyContent}
            onContentChange={setStoryContent}
            className="min-h-[600px]"
          />
        )}

        {currentStep === 'preview' && (
          <StoryPreview content={storyContent} elements={selectedElements} />
        )}
      </div>

      <div className="flex justify-end space-x-4">
        {currentStep !== 'input' && (
          <button
            onClick={() => setCurrentStep((prev) => (prev === 'preview' ? 'edit' : 'input'))}
            className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
            disabled={isGenerating || isSaving}
          >
            Back
          </button>
        )}
        {currentStep !== 'preview' && (
          <button
            onClick={() => setCurrentStep((prev) => (prev === 'input' ? 'edit' : 'preview'))}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            disabled={!storyContent || isGenerating || isSaving}
          >
            Next
          </button>
        )}
        {currentStep === 'preview' && (
          <button
            onClick={handlePublish}
            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
            disabled={isSaving}
          >
            {isSaving ? 'Publishing...' : 'Publish Story'}
          </button>
        )}
      </div>
    </div>
  )
}

interface StepButtonProps {
  active: boolean
  onClick: () => void
  disabled: boolean
  children: React.ReactNode
}

function StepButton({ active, onClick, disabled, children }: StepButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded px-4 py-2 ${
        active
          ? 'bg-blue-500 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400'
      }`}
    >
      {children}
    </button>
  )
} 