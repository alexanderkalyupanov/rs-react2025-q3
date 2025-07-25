import { Link, useLocation } from 'react-router';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchQuery: string;
  isLoading: boolean;
  onPageChange: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  isLoading,
  onPageChange,
}: PaginationProps) {
  const location = useLocation();

  const getPageUrl = (page: number) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', page.toString());
    return `${location.pathname}?${searchParams.toString()}`;
  };

  const handleClick = (page: number) => {
    if (!isLoading) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center my-4">
      <nav className="flex items-center gap-2">
        {currentPage > 1 && (
          <Link
            to={getPageUrl(currentPage - 1)}
            onClick={() => handleClick(currentPage - 1)}
            className="px-3 py-1 bg-violet-500 text-white rounded hover:bg-violet-600"
          >
            &laquo; Prev
          </Link>
        )}

        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }

          return (
            <Link
              key={pageNum}
              to={getPageUrl(pageNum)}
              className={`px-3 py-1 rounded ${
                pageNum === currentPage
                  ? 'bg-violet-700 text-white'
                  : 'bg-violet-500 text-white hover:bg-violet-600'
              }`}
            >
              {pageNum}
            </Link>
          );
        })}

        {currentPage < totalPages && (
          <Link
            to={getPageUrl(currentPage + 1)}
            onClick={() => handleClick(currentPage + 1)}
            className="px-3 py-1 bg-violet-500 text-white rounded hover:bg-violet-600"
          >
            Next &raquo;
          </Link>
        )}
      </nav>
    </div>
  );
}

export default Pagination;
