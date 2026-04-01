import { useState } from 'react';
import { Search, Plus, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '../../components/ui/Pagination';

const MOCK_DATA = [
  { id: 1, name: "Technology", desc: "Software and IT Services", status: true },
  { id: 2, name: "Healthcare", desc: "Medical and Health", status: true },
];

export const BusinessDomainList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(MOCK_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showForm, setShowForm] = useState(false);
  const [newDomain, setNewDomain] = useState('');

  const filtered = data.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    if (newDomain.trim()) {
      setData(prev => [...prev, { id: Date.now(), name: newDomain.trim(), desc: '', status: true }]);
      setNewDomain('');
      setShowForm(false);
    }
  };

  const toggleStatus = (id) => {
    setData(prev => prev.map(d => d.id === id ? { ...d, status: !d.status } : d));
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] w-full">
      {/* Page Header */}
      <div className="px-6 py-4 shrink-0 flex items-center gap-3">
        <button 
           onClick={() => navigate(-1)}
           className="p-1.5 rounded-full border border-slate-300 hover:bg-slate-100 text-slate-600 transition-colors"
        >
           <ArrowLeft size={16} />
        </button>
        <h1 className="text-xl font-bold text-slate-800">Business Domain</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 overflow-hidden flex flex-col">
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex-1 flex flex-col overflow-hidden">
          
          {/* Add Form Area */}
          <div className="px-5 pt-5 pb-4 border-b border-slate-100">
            <h2 className="text-base font-semibold text-slate-700 mb-3">Add Business Domain</h2>
            <div className="mb-3">
              <label className="block text-sm text-slate-600 mb-1">Business Domain</label>
              <input
                type="text"
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
                placeholder="Enter Business Domain"
                className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-slate-300 placeholder:text-slate-350 bg-white"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => setNewDomain('')}
                className="px-5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAdd}
                className="px-5 py-1.5 bg-[#212529] hover:bg-black text-white rounded text-sm font-medium transition-colors"
              >
                Add
              </button>
            </div>
          </div>

          {/* List Area */}
          <div className="px-5 pt-4 pb-2 flex flex-col flex-1 overflow-hidden">
            <h2 className="text-base font-semibold text-slate-700 mb-3">Business Domain List</h2>
            
            {/* Search */}
            <div className="relative mb-3">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-slate-300 placeholder:text-slate-400 bg-white"
              />
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 whitespace-nowrap w-20">Sl No</th>
                    <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 whitespace-nowrap">Business Domain</th>
                    <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 whitespace-nowrap text-right w-24">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item, index) => (
                    <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-4 text-[13px] text-slate-600">{index + 1}</td>
                      <td className="py-4 px-4 text-[13px] text-slate-800">{item.name}</td>
                      <td className="py-4 px-4 flex items-center justify-end">
                        {/* Toggle switch */}
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
    </div>
  );
};
