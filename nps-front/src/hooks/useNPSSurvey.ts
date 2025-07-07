import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { npsSurveyService, npsSurveyKeys, CreateNPSSurveyDTO, NPSSurvey, PaginatedResult } from '@/services/api';
import { useState } from 'react';

export interface NPSSurveyPaginationParams {
  page?: number;
  limit?: number;
}

export function useNPSSurvey(paginationParams?: NPSSurveyPaginationParams) {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(paginationParams?.page || 1);
  const [limit, setLimit] = useState(paginationParams?.limit || 10);

  const { data: allData } = useQuery({
    queryKey: npsSurveyKeys.list('all'),
    queryFn: () => npsSurveyService.getAll(1, 1000),
    placeholderData: (previousData) => previousData,
  });

  const { data: paginatedData, isLoading, error, refetch } = useQuery({
    queryKey: npsSurveyKeys.list(`page=${page}&limit=${limit}`),
    queryFn: () => npsSurveyService.getAll(page, limit),
    placeholderData: (previousData) => previousData,
  });

  const { mutateAsync: createSurvey, isPending: isCreating } = useMutation({
    mutationFn: (data: CreateNPSSurveyDTO) => npsSurveyService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: npsSurveyKeys.lists() });
    },
  });

  let errorMessage: string | null = null;
  if (error) {
    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = 'Erro ao carregar as pesquisas';
    }
  }

  return {
    surveys: allData?.data || [],
    paginatedSurveys: paginatedData?.data || [],
    isLoading: isLoading || isCreating,
    error: errorMessage,
    createSurvey,
    refetch,
    pagination: {
      page,
      limit,
      setPage,
      setLimit,
      totalPages: paginatedData?.totalPages || 1,
      total: paginatedData?.total || 0
    },
  };
} 