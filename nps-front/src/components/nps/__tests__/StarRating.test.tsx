import { render, screen, fireEvent } from '@testing-library/react'
import { StarRating } from '../StarRating'

describe('StarRating', () => {
  it('renders the correct number of stars', () => {
    render(<StarRating rating={0} onRatingChange={() => {}} />)
    const stars = screen.getAllByRole('button')
    expect(stars).toHaveLength(5)
  })

  it('calls onRatingChange with the correct value when clicking a star', () => {
    const handleChange = jest.fn()
    render(<StarRating rating={0} onRatingChange={handleChange} />)
    
    const stars = screen.getAllByRole('button')
    fireEvent.click(stars[3])
    
    expect(handleChange).toHaveBeenCalledWith(4)
  })

  it('highlights the correct number of stars based on rating prop', () => {
    render(<StarRating rating={3} onRatingChange={() => {}} />)
    
    const stars = screen.getAllByRole('button')
    
    for (let i = 0; i < 3; i++) {
      expect(stars[i]).toHaveClass('text-yellow-400')
    }
    
    for (let i = 3; i < 5; i++) {
      expect(stars[i]).toHaveClass('text-gray-300')
    }
  })

  it('disables star interaction when disabled prop is true', () => {
    const handleChange = jest.fn()
    render(<StarRating rating={0} onRatingChange={handleChange} disabled />)
    
    const stars = screen.getAllByRole('button')
    fireEvent.click(stars[2])
    
    expect(handleChange).not.toHaveBeenCalled()
    expect(stars[2]).toHaveClass('cursor-not-allowed')
  })
}) 