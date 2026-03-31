import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Pagination } from '../../components/ui/Pagination';

const MOCK_ARCHIVED = [
  { 
    id: 1, 
    docId: "DOC-0004", 
    title: "Black_colour.jpg", 
    customer: "Aabasoft customer", 
    category: "-", 
    created: "23-01-2026, 9:41 AM", 
    completed: "-" 
  },
];

export const ArchivedDocs = () => {
  const [docs, setDocs] = useState(MOCK_ARCHIVED);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] w-full animate-fade-in p-6">
      <div className="bg-white rounded-xl border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex-1 flex flex-col overflow-hidden">
        
        {/* Top Actions */}
        <div className="p-5 flex items-center justify-between gap-4 border-b border-slate-100">
           <div className="flex items-center gap-3 w-full md:max-w-md">
              {/* Search */}
              <div className="relative flex-1">
                 <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                 <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-slate-300 placeholder:text-slate-400"
                 />
              </div>
              {/* Filter */}
              <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-500 shrink-0">
                 <Filter size={18} />
              </button>
           </div>
        </div>

        {/* Table Container */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="py-4 px-6 text-[13px] font-semibold text-slate-600 whitespace-nowrap">SL No</th>
                <th className="py-4 px-6 text-[13px] font-semibold text-slate-600 whitespace-nowrap">Doc ID</th>
                <th className="py-4 px-6 text-[13px] font-semibold text-slate-600 whitespace-nowrap">Title</th>
                <th className="py-4 px-6 text-[13px] font-semibold text-slate-600 whitespace-nowrap">Customer Name</th>
                <th className="py-4 px-6 text-[13px] font-semibold text-slate-600 whitespace-nowrap">Category</th>
                <th className="py-4 px-6 text-[13px] font-semibold text-slate-600 whitespace-nowrap">Created Date and Time</th>
                <th className="py-4 px-6 text-[13px] font-semibold text-slate-600 whitespace-nowrap">Completed Date and Time</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((doc, index) => (
                <tr key={doc.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 text-[13px] text-slate-500">{index + 1}</td>
                  <td className="py-4 px-6 text-[13px] text-slate-600 font-medium">{doc.docId}</td>
                  <td className="py-4 px-6 text-[13px] text-slate-500">{doc.title}</td>
                  <td className="py-4 px-6 text-[13px] text-slate-500">{doc.customer}</td>
                  <td className="py-4 px-6 text-[13px] text-slate-500">{doc.category}</td>
                  <td className="py-4 px-6 text-[13px] text-slate-500">{doc.created}</td>
                  <td className="py-4 px-6 text-[13px] text-slate-500">{doc.completed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="shrink-0 border-t border-slate-50">
           <Pagination 
              currentPage={currentPage}
              totalPages={1}
              rowsPerPage={rowsPerPage}
              onPageChange={setCurrentPage}
              onRowsChange={setRowsPerPage}
           />
        </div>
      </div>
    </div>
  );
};
