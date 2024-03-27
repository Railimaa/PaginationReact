import { useCallback, useEffect, useState } from 'react';

export function usePagination(initialPage: number = 1) {
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const searchParams = new URLSearchParams(window.location.search);

    const page = searchParams.get('page');

    if (!page) {
      return initialPage;
    }

    return Number(page);
  });

  useEffect(() => {
    const url = new URL(window.location.href);

    url.searchParams.set('page', String(currentPage));
    const newUrl = url.origin + url.pathname + '?' + url.searchParams.toString();

    window.history.replaceState({}, '', newUrl);
  }, [currentPage]);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prevState) => prevState + 1);
  }, []);

  const handlePreviousPage = useCallback(() => {
    setCurrentPage((prevState) => prevState - 1);
  }, []);

  const handleSetPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return {
    currentPage,
    handleNextPage,
    handlePreviousPage,
    handleSetPage
  };
}
