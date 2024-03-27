import { ClientsService } from '@/services/ClientsService';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { usePagination } from './usePagination';

export function useClients(perPage: number = 20) {
  const { currentPage, handleNextPage, handlePreviousPage,handleSetPage} = usePagination();


  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['clients', { page: currentPage, perPage }],
    queryFn: () => ClientsService.getAll(currentPage, perPage),
    staleTime: Infinity
  });

  const totalItems = data?.items ?? 0;
  const totalPages = Math.ceil(totalItems / perPage);
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;


  useEffect(() => {
    if (hasNextPage) {
      const nextPage = currentPage + 1;

      queryClient.prefetchQuery({
        queryKey: ['clients', { page: nextPage, perPage }],
        queryFn: () => ClientsService.getAll(nextPage, perPage),
        staleTime: Infinity
      });
    }
  }, [currentPage, hasNextPage]);


  return {
    clients: data?.data ?? [],
    isLoading,
    currentPage,
    totalPages,
    hasPreviousPage,
    hasNextPage,
    handleNextPage,
    handlePreviousPage,
    handleSetPage,
  };
}
