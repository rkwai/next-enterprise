import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { StoryCreationInterface } from './StoryCreationInterface'
import userEvent from '@testing-library/user-event'

describe('StoryCreationInterface', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
  })

  it('renders initial input step', () => {
    render(<StoryCreationInterface />)
    
    expect(screen.getByText('1. Story Input')).toHaveClass('bg-blue-500')
    expect(screen.getByTestId('ai-generation')).toBeInTheDocument()
    expect(screen.getByTestId('element-selector')).toBeInTheDocument()
  })

  it('navigates through steps when content is available', async () => {
    render(<StoryCreationInterface />)
    
    // Mock successful story generation
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ content: 'Generated story content' }),
    })

    // Generate story
    fireEvent.click(screen.getByText('Generate Story'))

    // Wait for the editor to appear after generation
    await waitFor(() => {
      expect(screen.getByTestId('story-editor')).toBeInTheDocument()
    })

    // Navigate to preview
    fireEvent.click(screen.getByText('Next'))
    expect(screen.getByTestId('story-preview')).toBeInTheDocument()
  })

  it('handles publish action', async () => {
    render(<StoryCreationInterface />)
    
    // Mock successful story generation and publishing
    ;(global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ content: 'Generated story content' }),
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ success: true }),
      })

    // Generate story
    fireEvent.click(screen.getByText('Generate Story'))

    // Wait for story generation to complete
    await waitFor(() => {
      expect(screen.getByTestId('story-editor')).toBeInTheDocument()
    })

    // Navigate through steps
    fireEvent.click(screen.getByText('Next'))
    await waitFor(() => {
      expect(screen.getByTestId('story-preview')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('Publish Story'))
    
    // Wait for publish button to appear
    await waitFor(() => {
      expect(screen.getByText('Publish Story')).toBeInTheDocument()
    })

    // Attempt to publish
    fireEvent.click(screen.getByText('Publish Story'))
    expect(screen.getByText('Publishing...')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('Publish Story')).toBeInTheDocument()
    })
  })

  it('disables navigation when generating or saving', async () => {
    render(<StoryCreationInterface />)
    
    // Start generation
    ;(global.fetch as jest.Mock).mockImplementationOnce(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    )
    
    fireEvent.click(screen.getByText('Generate Story'))
    
    // Check navigation is disabled
    const nextButton = screen.getByText('Next')
    expect(nextButton).toBeDisabled()
  })
}) 