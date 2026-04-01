import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

export const Pagination = ({ 
  currentPage = 1, 
  totalPages = 17, 
  totalEntries = 256,
  onPageChange, 
  rowsPerPage = 10, 
  onRowsChange 
}) => {
  return (
    <div className="flex items-center justify-between py-4 px-6 w-full text-[13px] text-slate-500 border-t border-slate-100 bg-white min-h-[70px]">
      {/* Left side text */}
      <div className="hidden sm:block">
        Showing 1 to {rowsPerPage} of {totalEntries} entries
      </div>
      
      {/* Center pagination */}
      <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2 hidden md:flex">
        <button 
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 transition-colors bg-white shadow-sm"
        >
          <ChevronLeft size={16} className="text-slate-600" />
        </button>
        
        <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#212529] text-white font-medium text-sm shadow-sm">1</button>
        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-50 text-slate-600 font-medium text-sm transition-colors">2</button>
        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-50 text-slate-600 font-medium text-sm transition-colors">3</button>
        <span className="w-8 flex items-center justify-center text-slate-400">...</span>
        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-50 text-slate-600 font-medium text-sm transition-colors">{totalPages}</button>

        <button 
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 transition-colors bg-white shadow-sm"
        >
          <ChevronRight size={16} className="text-slate-600" />
        </button>
      </div>
      
      {/* Right side dropdown */}
      <div className="flex items-center gap-2.5 ml-auto md:ml-0">
        <span className="hidden sm:inline">Show</span>
        <div className="relative">
           <select 
             value={rowsPerPage}
             onChange={(e) => onRowsChange?.(Number(e.target.value))}
             className="appearance-none border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 bg-white font-medium text-slate-700 text-[13px] outline-none focus:border-slate-400 cursor-pointer shadow-sm"
           >
             <option value={10}>10</option>
             <option value={20}>20</option>
             <option value={50}>50</option>
           </select>
           <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
        </div>
        <span className="hidden sm:inline">entries</span>
      </div>
    </div>
  );
};
