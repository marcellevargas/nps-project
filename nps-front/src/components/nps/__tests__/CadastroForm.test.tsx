import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { CadastroForm } from '../CadastroForm'
import { useNPSSurvey } from '@/hooks/useNPSSurvey'


jest.mock('@/hooks/useNPSSurvey')

describe('CadastroForm', () => {
  const mockCreateSurvey = jest.fn()
  
  beforeEach(() => {
    ;(useNPSSurvey as jest.Mock).mockReturnValue({
      createSurvey: mockCreateSurvey,
      isLoading: false,
      error: null,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renderiza o formulário corretamente', () => {
    render(<CadastroForm />)
    
    expect(screen.getByLabelText(/nome do produto/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/comentário/i)).toBeInTheDocument()
    
    const ratingLabel = screen.getByText('Avaliação *')
    expect(ratingLabel).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: '★' })).toHaveLength(5)
    
    expect(screen.getByRole('button', { name: /cadastrar resposta/i })).toBeInTheDocument()
  })

  it('submete o formulário com dados válidos', async () => {
    render(<CadastroForm />)
    
    fireEvent.change(screen.getByLabelText(/nome do produto/i), {
      target: { value: 'Produto Teste' },
    })
    
    const stars = screen.getAllByRole('button', { name: '★' })
    fireEvent.click(stars[3])
    
    fireEvent.change(screen.getByLabelText(/comentário/i), {
      target: { value: 'Ótimo produto!' },
    })
    
    fireEvent.click(screen.getByRole('button', { name: /cadastrar resposta/i }))
    
    await waitFor(() => {
      expect(mockCreateSurvey).toHaveBeenCalledWith({
        productName: 'Produto Teste',
        rating: 4,
        comment: 'Ótimo produto!',
      })
    })
  })

  it('mostra erro quando tenta submeter sem produto ou avaliação', async () => {
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation()
    render(<CadastroForm />)
    
    fireEvent.submit(screen.getByRole('form'))
    
    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith('Por favor, preencha o nome do produto e selecione uma avaliação.')
      expect(mockCreateSurvey).not.toHaveBeenCalled()
    })
    
    mockAlert.mockRestore()
  })

  it('desabilita o formulário durante o carregamento', () => {
    ;(useNPSSurvey as jest.Mock).mockReturnValue({
      createSurvey: mockCreateSurvey,
      isLoading: true,
      error: null,
    })
    
    render(<CadastroForm />)
    
    expect(screen.getByLabelText(/nome do produto/i)).toBeDisabled()
    expect(screen.getByLabelText(/comentário/i)).toBeDisabled()
    expect(screen.getByRole('button', { name: /cadastrando/i })).toBeDisabled()
  })

  it('mostra mensagem de erro quando falha ao cadastrar', () => {
    const errorMessage = 'Erro ao cadastrar'
    ;(useNPSSurvey as jest.Mock).mockReturnValue({
      createSurvey: mockCreateSurvey,
      isLoading: false,
      error: errorMessage,
    })
    
    render(<CadastroForm />)
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

  it('limpa o formulário após submissão bem-sucedida', async () => {
    render(<CadastroForm />)
    
    fireEvent.change(screen.getByLabelText(/nome do produto/i), {
      target: { value: 'Produto Teste' },
    })
    const stars = screen.getAllByRole('button', { name: '★' })
    fireEvent.click(stars[3])
    fireEvent.change(screen.getByLabelText(/comentário/i), {
      target: { value: 'Comentário teste' },
    })
    
    fireEvent.click(screen.getByRole('button', { name: /cadastrar resposta/i }))
    
    await waitFor(() => {
      expect(screen.getByLabelText(/nome do produto/i)).toHaveValue('')
      expect(screen.getByLabelText(/comentário/i)).toHaveValue('')
      expect(screen.getByText('Selecione uma avaliação')).toBeInTheDocument()
    })
  })
}) 