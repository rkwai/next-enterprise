import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/react'
import * as stories from './StoryPreview.stories'

const { Default, NoElements } = composeStories(stories)

describe('StoryPreview', () => {
  it('renders story content', () => {
    render(<Default />)
    expect(screen.getByText(/Once upon a time/)).toBeInTheDocument()
  })

  it('renders all story elements', () => {
    render(<Default />)
    
    const elements = Default.args?.elements || []
    elements.forEach(element => {
      expect(screen.getByText(`${element.name} (${element.type})`)).toBeInTheDocument()
    })
  })

  it('renders without elements', () => {
    render(<NoElements />)
    expect(screen.queryByTestId('element-reference')).not.toBeInTheDocument()
  })

  it('applies prose styling to content', () => {
    render(<Default />)
    const contentContainer = screen.getByText(/Once upon a time/).parentElement
    expect(contentContainer).toHaveClass('prose')
  })
}) 