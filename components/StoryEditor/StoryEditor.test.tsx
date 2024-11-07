import { render, screen, fireEvent } from '@testing-library/react'
import { StoryEditor } from './StoryEditor'

describe('StoryEditor', () => {
  it('renders textarea', () => {
    render(<StoryEditor />)
    expect(screen.getByTestId('editor-content')).toBeInTheDocument()
  })

  it('handles content changes', () => {
    const onContentChange = jest.fn()
    render(<StoryEditor onContentChange={onContentChange} />)
    
    const textarea = screen.getByTestId('editor-content')
    fireEvent.change(textarea, { target: { value: 'New content' } })
    
    expect(onContentChange).toHaveBeenCalledWith('New content')
  })

  it('displays initial content', () => {
    render(<StoryEditor initialContent="Initial text" />)
    
    const textarea = screen.getByTestId('editor-content')
    expect(textarea).toHaveValue('Initial text')
  })
}) 