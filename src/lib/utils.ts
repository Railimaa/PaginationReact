import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return Intl.DateTimeFormat('pt-br').format(date);
}

export function generateEllipsisPagination(
  currentPage: number,
  totalPages: number,
  surroundingPage: number = 2
): (number | string)[] {
  const pages: (number | string)[] = [];

  for (let i = 1; i <= totalPages; i++) {
    const isFirstPage = i === 1;
    const isLastPage = i === totalPages;
    const isWithinLowerBound = i >= (currentPage - surroundingPage);
    const isWithinUpperBound = i <= (currentPage + surroundingPage);
    const isEllipsisPagePosition = (
      i === currentPage - surroundingPage - 1 ||
      i === currentPage + surroundingPage + 1
    );


    if (isEllipsisPagePosition && !isFirstPage && !isLastPage) {
      pages.push('...');
      continue;
    }

    if ((isFirstPage || isLastPage) || (isWithinLowerBound && isWithinUpperBound)) {
      pages.push(i);
    }

  }

  return pages;
}
