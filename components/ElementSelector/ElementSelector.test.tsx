import { render, screen, fireEvent } from '@testing-library/react'
import { ElementSelector } from './ElementSelector'
import { act } from 'react'

describe('ElementSelector', () => {
  const mockElement = {
    id: '1',
    name: 'Test Character',
    type: 'character' as const,
  }

  const mockOnElementSelect = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders all tab buttons', () => {
    render(<ElementSelector onElementSelect={mockOnElementSelect} />)
    
    expect(screen.getByText('Characters')).toBeInTheDocument()
    expect(screen.getByText('Locations')).toBeInTheDocument()
    expect(screen.getByText('Items')).toBeInTheDocument()
  })

  it('changes active tab when clicked', () => {
    render(<ElementSelector onElementSelect={mockOnElementSelect} />)
    
    const locationsTab = screen.getByText('Locations')
    fireEvent.click(locationsTab)
    
    expect(locationsTab).toHaveClass('border-b-2 border-blue-500')
  })

  it('displays selected elements', () => {
    const element = { id: '1', name: 'Test Character', type: 'character' as const }
    render(<ElementSelector elements={[element]} onElementSelect={mockOnElementSelect} />)
    
    const elementButton = screen.getByRole('button', { name: 'Test Character' })
    fireEvent.click(elementButton)
    
    const selectedTag = screen.getByText('Test Character', { selector: '.bg-blue-100' })
    expect(selectedTag).toBeInTheDocument()
  })

  it('calls onElementSelect when element is clicked', async () => {
    const mockOnElementSelect = jest.fn()
    const element = { id: '1', name: 'Test Character', type: 'character' as const }
    
    render(<ElementSelector elements={[element]} onElementSelect={mockOnElementSelect} />)
    
    await act(async () => {
      fireEvent.click(screen.getByText('Test Character'))
    })
    
    expect(mockOnElementSelect).toHaveBeenCalledWith(element)
  })
}) 