import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange, rowsPerPage = 10, onRowsChange }) => {
  return (
    <div className="flex items-center justify-center py-4 w-full gap-4 text-sm text-slate-600 border-t border-slate-100">
      <button 
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="p-1 hover:text-black disabled:opacity-30 transition-colors"
      >
        <ChevronsLeft size={16} />
      </button>
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-1 hover:text-black disabled:opacity-30 transition-colors"
      >
        <ChevronLeft size={16} />
      </button>
      
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white font-medium">
        {currentPage}
      </div>

      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-1 hover:text-black disabled:opacity-30 transition-colors"
      >
        <ChevronRight size={16} />
      </button>
      <button 
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="p-1 hover:text-black disabled:opacity-30 transition-colors"
      >
        <ChevronsRight size={16} />
      </button>
      
      <div className="ml-4 flex items-center gap-2">
        <select 
          value={rowsPerPage}
          onChange={(e) => onRowsChange(Number(e.target.value))}
          className="border border-slate-200 rounded-lg px-2 py-1 bg-white text-slate-700 outline-none focus:border-slate-400"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
};
