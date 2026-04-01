import { useState } from 'react';
import { Search, Plus, ArrowLeft, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '../../components/ui/Pagination';

const MOCK_DATA = [
  { id: 1, name: "FY 2023-2024", start: "01/04/2023", end: "31/03/2024", status: true },
  { id: 2, name: "FY 2022-2023", start: "01/04/2022", end: "31/03/2023", status: false },
];

export const FinancialYearList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(MOCK_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filtered = data.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleStatus = (id) => {
    setData(prev => prev.map(d => d.id === id ? { ...d, status: !d.status } : d));
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] w-full animate-fade-in">
      {/* Page Header */}
      <div className="px-6 py-4 shrink-0 flex items-center gap-3">
        <button 
           onClick={() => navigate(-1)}
           className="p-1.5 rounded-full border border-slate-300 hover:bg-slate-100 text-slate-600 transition-colors"
        >
           <ArrowLeft size={16} />
        </button>
        <h1 className="text-xl font-bold text-slate-800">Financial Year</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 overflow-hidden flex flex-col">
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex-1 flex flex-col overflow-hidden">
          
          {/* Search + Add */}
          <div className="px-5 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-100">
             <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                   <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                   <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-slate-300 placeholder:text-slate-400"
                   />
                </div>
             </div>
             
             <button className="flex items-center gap-1.5 bg-[#212529] hover:bg-black text-white px-4 py-1.5 rounded text-sm font-medium transition-colors w-full sm:w-auto justify-center">
                <Plus size={14} /> Add Financial Year
             </button>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 whitespace-nowrap w-20">Sl No</th>
                  <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 whitespace-nowrap">Year Name</th>
                  <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 whitespace-nowrap">Start Date</th>
                  <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 whitespace-nowrap">End Date</th>
                  <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 whitespace-nowrap text-right w-24">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, index) => (
                  <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-4 text-[13px] text-slate-600">{index + 1}</td>
                    <td className="py-4 px-4 text-[13px] text-slate-800">{item.name}</td>
                    <td className="py-4 px-4 text-[13px] text-slate-600">{item.start}</td>
                    <td className="py-4 px-4 text-[13px] text-slate-600">{item.end}</td>
                    <td className="py-4 px-4 flex items-center justify-end">
                      <button
                        onClick={() => toggleStatus(item.id)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                          item.status ? 'bg-green-500' : 'bg-slate-300'
                        }`}
                      >
                        <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                          item.status ? 'translate-x-[18px]' : 'translate-x-[3px]'
                        }`} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination 
             currentPage={currentPage}
             totalPages={Math.ceil(filtered.length / rowsPerPage) || 1}
             rowsPerPage={rowsPerPage}
             onPageChange={setCurrentPage}
             onRowsChange={setRowsPerPage}
          />
        </div>
      </div>
    </div>
  );
};
