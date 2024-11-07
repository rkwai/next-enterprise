import { render, screen } from '@testing-library/react'
import { StoryPreview } from './StoryPreview'

describe('StoryPreview', () => {
  const mockElements = [
    { id: '1', name: 'Character 1', type: 'character' },
    { id: '2', name: 'Location 1', type: 'location' },
    { id: '3', name: 'Item 1', type: 'item' },
  ]

  const mockContent = '<p>Test story content</p>'

  it('renders story content', () => {
    render(<StoryPreview content={mockContent} elements={[]} />)
    expect(screen.getByText('Test story content')).toBeInTheDocument()
  })

  it('renders all story elements', () => {
    render(<StoryPreview content={mockContent} elements={mockElements} />)
    
    mockElements.forEach(element => {
      expect(screen.getByText(`${element.name} (${element.type})`)).toBeInTheDocument()
    })
  })

  it('applies prose styling to content', () => {
    render(<StoryPreview content={mockContent} elements={[]} />)
    const contentContainer = screen.getByText('Test story content').parentElement
    expect(contentContainer).toHaveClass('prose')
  })

  it('renders element references with correct styling', () => {
    render(<StoryPreview content={mockContent} elements={mockElements} />)
    
    const elementRefs = screen.getAllByTestId('element-reference')
    expect(elementRefs).toHaveLength(mockElements.length)
    
    elementRefs.forEach(ref => {
      expect(ref).toHaveClass('rounded-full', 'bg-gray-100')
    })
  })
}) 