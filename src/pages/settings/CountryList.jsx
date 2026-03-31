import { useState } from 'react';
import { Search, Filter, Plus, ArrowLeft, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '../../components/ui/Pagination';

const MOCK_DATA = [
  { id: 1, name: "United States", code: "US", currency: "USD", status: "Active" },
  { id: 2, name: "United Kingdom", code: "UK", currency: "GBP", status: "Active" },
  { id: 3, name: "India", code: "IN", currency: "INR", status: "Active" },
];

export const CountryList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(MOCK_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] w-full animate-fade-in pb-12">
      {/* Header */}
      <div className="px-6 py-5 shrink-0 flex items-center gap-4">
        <button 
           onClick={() => navigate(-1)}
           className="p-1.5 rounded-full border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors"
        >
           <ArrowLeft size={18} />
        </button>
        <h1 className="text-xl font-bold text-slate-800">Countries</h1>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-6 flex flex-col">
        <div className="bg-white rounded-[20px] border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex-1 flex flex-col overflow-hidden">
          
          <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100">
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
             
             <button className="flex items-center gap-2 bg-[#1a1c21] hover:bg-black text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto justify-center">
                <Plus size={16} /> Add Country
             </button>
          </div>

          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="py-4 px-6 text-[13px] font-semibold text-slate-600 whitespace-nowrap w-24">SL No</th>
                  <th className="py-4 px-6 text-[13px] font-semibold text-slate-600 whitespace-nowrap">Country Name</th>
                  <th className="py-4 px-6 text-[13px] font-semibold text-slate-600 whitespace-nowrap">Code</th>
                  <th className="py-4 px-6 text-[13px] font-semibold text-slate-600 whitespace-nowrap">Currency</th>
                  <th className="py-4 px-6 text-[13px] font-semibold text-slate-600 whitespace-nowrap w-32">Status</th>
                  <th className="py-4 px-6 text-[13px] font-semibold text-slate-600 whitespace-nowrap text-right w-24">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                    <td className="py-3 px-6 text-[13px] text-slate-500">{index + 1}</td>
                    <td className="py-3 px-6 text-[13px] text-slate-800 font-medium">{item.name}</td>
                    <td className="py-3 px-6 text-[13px] text-slate-500">{item.code}</td>
                    <td className="py-3 px-6 text-[13px] text-slate-500">{item.currency}</td>
                    <td className="py-3 px-6 text-[13px]">
                       <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 font-medium text-xs">
                          {item.status}
                       </span>
                    </td>
                    <td className="py-3 px-6 flex items-center justify-end">
                       <button className="p-1 text-slate-400 hover:text-slate-600 rounded">
                          <MoreVertical size={18} />
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
