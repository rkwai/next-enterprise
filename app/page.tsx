import React from 'react'
import { StoryCreationInterface } from '@components/StoryCreation/StoryCreationInterface'

export default function CreateStoryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Create New Story</h1>
      <StoryCreationInterface />
    </div>
  )
} 