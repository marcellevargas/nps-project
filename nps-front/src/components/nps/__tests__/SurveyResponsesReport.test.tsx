import { render, screen, fireEvent, within } from '@testing-library/react'
import { SurveyResponsesReport } from '../SurveyResponsesReport'
import { NPSSurvey } from '@/services/api'

const mockRespostas: NPSSurvey[] = [
  { id: '1', productName: 'Produto 1', rating: 5, createdAt: '2024-03-20T10:00:00Z', comment: 'Excelente!' },
  { id: '2', productName: 'Produto 2', rating: 4, createdAt: '2024-03-20T11:00:00Z', comment: '' },
  { id: '3', productName: 'Produto 3', rating: 3, createdAt: '2024-03-20T12:00:00Z', comment: 'Regular' },
  { id: '4', productName: 'Produto 4', rating: 2, createdAt: '2024-03-20T13:00:00Z', comment: '' },
  { id: '5', productName: 'Produto 5', rating: 1, createdAt: '2024-03-20T14:00:00Z', comment: 'Ruim' }
]

describe('RelatorioRespostas', () => {
  it('calcula e exibe o NPS corretamente', () => {
    render(<SurveyResponsesReport responses={mockRespostas} paginatedResponses={mockRespostas} />)
    
    expect(screen.getByText('0')).toBeInTheDocument()

    const promotoresCard = screen.getAllByRole('heading', { name: 'Promotores' })[0].closest('[data-slot="card"]') as HTMLElement
    const neutrosCard = screen.getAllByRole('heading', { name: 'Neutros' })[0].closest('[data-slot="card"]') as HTMLElement
    const detratoresCard = screen.getAllByRole('heading', { name: 'Detratores' })[0].closest('[data-slot="card"]') as HTMLElement

    expect(within(promotoresCard).getByText('40%')).toBeInTheDocument()
    expect(within(neutrosCard).getByText('20%')).toBeInTheDocument()
    expect(within(detratoresCard).getByText('40%')).toBeInTheDocument()
  })

  it('exibe a classificação correta do NPS', () => {
    const respostasPromotores: NPSSurvey[] = Array(8).fill({
      id: '1',
      productName: 'Produto',
      rating: 5,
      createdAt: '2024-03-20T10:00:00Z',
      comment: ''
    })
    
    render(<SurveyResponsesReport 
      responses={respostasPromotores} 
      paginatedResponses={respostasPromotores} 
    />)
    
    expect(screen.getByText('Excelente')).toBeInTheDocument()
  })

  it('renderiza o gráfico quando há respostas', () => {
    render(<SurveyResponsesReport responses={mockRespostas} paginatedResponses={mockRespostas} />)
    
    expect(screen.getByText('Distribuição das Avaliações')).toBeInTheDocument()
  })

  it('não renderiza o gráfico quando não há respostas', () => {
    render(<SurveyResponsesReport responses={[]} paginatedResponses={[]} />)
    
    expect(screen.queryByText('Distribuição das Avaliações')).not.toBeInTheDocument()
  })

  it('exibe as respostas com comentários corretamente', () => {
    render(<SurveyResponsesReport responses={mockRespostas} paginatedResponses={mockRespostas} />)
    
    expect(screen.getByText('Excelente!')).toBeInTheDocument()
    expect(screen.getByText('Regular')).toBeInTheDocument()
    expect(screen.getByText('Ruim')).toBeInTheDocument()
  })

  it('formata a data corretamente nas respostas', () => {
    render(<SurveyResponsesReport responses={mockRespostas} paginatedResponses={mockRespostas} />)
    
    const dataFormatada = screen.getAllByText(/20\/03\/2024/)[0]
    expect(dataFormatada).toBeInTheDocument()
  })

  it('funciona corretamente com a paginação', () => {
    const mockPagination = {
      page: 1,
      limit: 2,
      totalPages: 3,
      total: 5,
      setPage: jest.fn(),
      setLimit: jest.fn()
    }

    render(
      <SurveyResponsesReport 
        responses={mockRespostas}
        paginatedResponses={mockRespostas.slice(0, 2)}
        pagination={mockPagination}
      />
    )

    expect(screen.getByText('Últimas Respostas (5)')).toBeInTheDocument()

    const nextLinks = screen.getAllByLabelText('Go to next page')
    fireEvent.click(nextLinks[0])
    expect(mockPagination.setPage).toHaveBeenCalledWith(2)
  })

  it('desabilita botões de navegação apropriadamente', () => {
    const mockPagination = {
      page: 1,
      limit: 2,
      totalPages: 3,
      total: 5,
      setPage: jest.fn(),
      setLimit: jest.fn()
    }

    const { rerender } = render(
      <SurveyResponsesReport 
        responses={mockRespostas}
        paginatedResponses={mockRespostas.slice(0, 2)}
        pagination={mockPagination}
      />
    )

    const prevLinks = screen.getAllByLabelText('Go to previous page')
    expect(prevLinks[0]).toHaveClass('pointer-events-none')

    mockPagination.page = 3
    rerender(
      <SurveyResponsesReport 
        responses={mockRespostas}
        paginatedResponses={mockRespostas.slice(4, 5)}
        pagination={mockPagination}
      />
    )

    const nextLinks = screen.getAllByLabelText('Go to next page')
    expect(nextLinks[0]).toHaveClass('pointer-events-none')
  })

  it('renderiza corretamente sem paginação', () => {
    render(<SurveyResponsesReport responses={mockRespostas} paginatedResponses={mockRespostas} />)
    
    expect(screen.queryByLabelText('Go to next page')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Go to previous page')).not.toBeInTheDocument()
  })
}) 