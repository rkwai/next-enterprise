import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { AIGeneration } from './AIGeneration'

describe('AIGeneration', () => {
  const mockOnGenerate = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders all input fields', () => {
    render(<AIGeneration onGenerate={mockOnGenerate} />)
    
    expect(screen.getByPlaceholderText('Story Title')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Story Direction')).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('updates input values on change', () => {
    render(<AIGeneration onGenerate={mockOnGenerate} />)
    
    const titleInput = screen.getByPlaceholderText('Story Title')
    fireEvent.change(titleInput, { target: { value: 'Test Title' } })
    expect(titleInput).toHaveValue('Test Title')

    const directionInput = screen.getByPlaceholderText('Story Direction')
    fireEvent.change(directionInput, { target: { value: 'Test Direction' } })
    expect(directionInput).toHaveValue('Test Direction')

    const genreSelect = screen.getByRole('combobox')
    fireEvent.change(genreSelect, { target: { value: 'Fantasy' } })
    expect(genreSelect).toHaveValue('Fantasy')
  })

  it('calls onGenerate with correct parameters when generate button is clicked', async () => {
    render(<AIGeneration onGenerate={mockOnGenerate} />)
    
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('Story Title'), { target: { value: 'Test Title' } })
      fireEvent.change(screen.getByPlaceholderText('Story Direction'), { target: { value: 'Test Direction' } })
      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Fantasy' } })
      
      fireEvent.click(screen.getByText('Generate Story'))
    })
    
    expect(mockOnGenerate).toHaveBeenCalledWith({
      title: 'Test Title',
      direction: 'Test Direction',
      genre: 'Fantasy',
      elements: [],
    })
  })

  it('shows loading state while generating', async () => {
    mockOnGenerate.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)))
    render(<AIGeneration onGenerate={mockOnGenerate} />)
    
    await act(async () => {
      fireEvent.click(screen.getByText('Generate Story'))
    })
    
    expect(screen.getByText('Generating...')).toBeInTheDocument()
    
    await waitFor(() => {
      expect(screen.getByText('Generate Story')).toBeInTheDocument()
    })
  })
}) 