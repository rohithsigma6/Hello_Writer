import React, { useState } from 'react';

interface PaginationProps {
  type: 'archive' | 'trash';
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, setCurrentPage }) => {

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const generatePaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push({ id: `page${i}`, label: i.toString(), page: i });
      }
    } else {
      items.push({ id: 'page1', label: '1', page: 1 });

      if (currentPage > 3) {
        items.push({ id: 'ellipsis1', label: '...', isSpan: true });
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        items.push({ id: `page${i}`, label: i.toString(), page: i });
      }

      if (currentPage < totalPages - 2) {
        items.push({ id: 'ellipsis2', label: '...', isSpan: true });
      }

      items.push({
        id: `page${totalPages}`,
        label: totalPages.toString(),
        page: totalPages,
      });
    }

    return items;
  };

  const paginationItems = generatePaginationItems();

  // Return null if totalPages is 0
  if (totalPages === 0) {
    return;
  }

  return (
    <div className="flex justify-end items-center mt-0 space-x-2">
      <button
        className="py-1"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        {'<'}
      </button>
      {paginationItems.map((item) =>
        item.isSpan ? (
          <span key={item.id} className="py-1">
            {item.label}
          </span>
        ) : (
          <button
            key={item.id}
            className={`py-1 ${item.page === currentPage ? 'font-bold' : ''}`}
            onClick={() =>
              item.page !== undefined && handlePageChange(item.page)
            }
          >
            {item.label}
          </button>
        ),
      )}
      <button
        className="py-1"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        {'>'}
      </button>
    </div>
  );
};
