import { useState } from 'react';
import { Search, Filter, Plus, ArrowLeft, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '../../components/ui/Pagination';

const MOCK_DATA = [
  { id: 1, name: "Electronics", code: "EL-01", status: "Active" },
  { id: 2, name: "Furniture", code: "FR-02", status: "Active" },
];

export const CategoryList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(MOCK_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] w-full animate-fade-in">
      {/* Header */}
      <div className="px-6 py-4 shrink-0 flex items-center gap-3">
        <button 
           onClick={() => navigate(-1)}
           className="p-1.5 rounded-full border border-slate-300 hover:bg-slate-100 text-slate-600 transition-colors"
        >
           <ArrowLeft size={16} />
        </button>
        <h1 className="text-xl font-bold text-slate-800">Categories</h1>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-6 flex flex-col">
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex-1 flex flex-col overflow-hidden">
          
          <div className="px-5 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-100">
             <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                   <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                   <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-slate-300 placeholder:text-slate-400"
                   />
                </div>
                <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-500">
                   <Filter size={18} />
                </button>
             </div>
             
             <button className="flex items-center gap-2 bg-[#212529] hover:bg-black text-white px-4 py-1.5 rounded text-sm font-medium transition-colors w-full sm:w-auto justify-center">
                <Plus size={14} /> Add Category
             </button>
          </div>

          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                 <tr className="border-b border-slate-100">
                   <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 whitespace-nowrap w-20">SL No</th>
                   <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 whitespace-nowrap">Category Name</th>
                   <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 whitespace-nowrap">Code</th>
                   <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 whitespace-nowrap w-28">Status</th>
                   <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 whitespace-nowrap text-right w-24">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                     <td className="py-4 px-4 text-[13px] text-slate-600">{index + 1}</td>
                     <td className="py-4 px-4 text-[13px] text-slate-800">{item.name}</td>
                     <td className="py-4 px-4 text-[13px] text-slate-600">{item.code}</td>
                     <td className="py-4 px-4 text-[13px]">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 font-medium text-xs">
                           {item.status}
                        </span>
                     </td>
                     <td className="py-4 px-4 flex items-center justify-end">
                        <button className="p-1 text-slate-400 hover:text-slate-600 rounded">
                           <MoreVertical size={16} />
                        </button>
                     </td>
                   </tr>
                ))}
              </tbody>
            </table>
          </div>

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
