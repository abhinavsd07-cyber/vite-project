import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

export const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  totalEntries = 0,
  onPageChange,
  rowsPerPage = 10,
  onRowsChange,
}) => {
  const getPages = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, '...', totalPages];
    if (currentPage >= totalPages - 2) return [1, '...', totalPages - 2, totalPages - 1, totalPages];
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  return (
    <div className="flex items-center justify-between py-3 px-5 border-t border-gray-100 bg-white text-[13px] text-gray-500">
      {/* Left: entries info */}
      <div className="hidden sm:block text-gray-400">
        Showing {Math.min((currentPage - 1) * rowsPerPage + 1, totalEntries)}–{Math.min(currentPage * rowsPerPage, totalEntries)} of {totalEntries} entries
      </div>

      {/* Center pagination */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50 disabled:opacity-40 transition-colors"
        >
          <ChevronLeft size={15} className="text-gray-600" />
        </button>

        {getPages().map((page, i) =>
          page === '...' ? (
            <span key={`ellipsis-${i}`} className="w-8 flex items-center justify-center text-gray-400">…</span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 flex items-center justify-center rounded-md text-[13px] font-medium transition-colors ${
                currentPage === page
                  ? 'bg-[#212529] text-white'
                  : 'text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50 disabled:opacity-40 transition-colors"
        >
          <ChevronRight size={15} className="text-gray-600" />
        </button>
      </div>

      {/* Right: rows per page */}
      <div className="flex items-center gap-2">
        <span className="hidden sm:inline text-gray-400">Show</span>
        <div className="relative">
          <select
            value={rowsPerPage}
            onChange={(e) => onRowsChange?.(Number(e.target.value))}
            className="appearance-none border border-gray-200 rounded-lg pl-3 pr-7 py-1.5 bg-white text-gray-700 text-[13px] focus:outline-none cursor-pointer"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <ChevronDown size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
        <span className="hidden sm:inline text-gray-400">entries</span>
      </div>
    </div>
  );
};
