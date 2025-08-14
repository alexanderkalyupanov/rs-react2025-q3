import { Link, useLocation } from 'react-router';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchQuery: string;
}

function Pagination({ currentPage, totalPages }: PaginationProps) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const getPageUrl = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page.toString());
    return `${location.pathname}?${newParams.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center my-4">
      <nav className="flex items-center gap-2">
        {currentPage > 1 && (
          <Link
            to={getPageUrl(currentPage - 1)}
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
