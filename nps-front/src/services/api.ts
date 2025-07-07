import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  timeout: 10000,
  withCredentials: true,
});

export interface NPSSurvey {
  id: string;
  productName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateNPSSurveyDTO {
  productName: string;
  rating: number;
  comment: string;
}

export const npsSurveyKeys = {
  all: ['nps-surveys'] as const,
  lists: () => [...npsSurveyKeys.all, 'list'] as const,
  list: (filters: string) => [...npsSurveyKeys.lists(), { filters }] as const,
  details: () => [...npsSurveyKeys.all, 'detail'] as const,
  detail: (id: string) => [...npsSurveyKeys.details(), id] as const,
};

const handleApiError = (error: unknown) => {
  if (error instanceof AxiosError) {
    if (error.response) {
      throw new Error(error.response.data?.message || `Erro ${error.response.status}: ${error.response.statusText}`);
    } else if (error.request) {
      throw new Error('Não foi possível conectar ao servidor. Verifique sua conexão.');
    }
  }

  throw new Error('Ocorreu um erro inesperado. Tente novamente.');
};

export const npsSurveyService = {
  async create(data: CreateNPSSurveyDTO) {
    try {
      const response = await api.post<NPSSurvey>('/api/nps-surveys', data);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  async getAll(page = 1, limit = 10) {
    try {
      const response = await api.get<PaginatedResult<NPSSurvey>>('/api/nps-surveys', {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
      return {
        data: [],
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 1
      } as PaginatedResult<NPSSurvey>;
    }
  },
};

export default api; 