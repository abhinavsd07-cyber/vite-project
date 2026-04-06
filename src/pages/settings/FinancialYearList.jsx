import { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '../../components/ui/Pagination';
import { RightDrawer } from '../../components/ui/RightDrawer';

const MOCK_DATA = [
  { id: 1, title: "2024(Apr) - 2025(Mar)", period: "01/04/2024 - 31/03/2025", status: false },
  { id: 2, title: "2024(Oct) - 2025(Sep)", period: "01/10/2024 - 30/09/2025", status: true },
  { id: 3, title: "2024(Aug) - 2025(Jul)", period: "01/08/2024 - 31/07/2025", status: true },
  { id: 4, title: "2024(Mar) - 2025(Feb)", period: "01/03/2024 - 28/02/2025", status: false },
  { id: 5, title: "2024(Sep) - 2025(Aug)", period: "01/09/2024 - 31/08/2025", status: true },
  { id: 6, title: "2024(Jun) - 2025(May)", period: "01/06/2024 - 31/05/2025", status: false },
];

export const FinancialYearList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(MOCK_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const [newTitle, setNewTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const handleClose = () => {
    setIsDrawerOpen(false);
    setTimeout(() => {
       navigate('/settings/master');
    }, 300);
  };

  const filtered = data.filter(d =>
    d.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.period.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    if (newTitle.trim() && startDate.trim() && endDate.trim()) {
      setData(prev => [...prev, { 
        id: Date.now(), 
        title: newTitle.trim(), 
        period: `${startDate.trim()} - ${endDate.trim()}`,
        status: true 
      }]);
      setNewTitle('');
      setStartDate('');
      setEndDate('');
    }
  };

  const toggleStatus = (id) => {
    setData(prev => prev.map(d => d.id === id ? { ...d, status: !d.status } : d));
  };

  return (
    <RightDrawer isOpen={isDrawerOpen} onClose={handleClose} title="Add financial year">
      <div className="flex flex-col h-full bg-white">
         
        {/* Form Area */}
        <div className="px-6 pt-6 pb-6">
           <div className="mb-4">
              <label className="block text-[13px] font-medium text-gray-400 mb-2">Title</label>
              <input
                 type="text"
                 value={newTitle}
                 onChange={(e) => setNewTitle(e.target.value)}
                 placeholder="Enter title"
                 className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder:text-gray-400 bg-white"
              />
           </div>
           
           <div className="flex items-center gap-4 mb-6">
              <div className="flex-1">
                 <label className="block text-[13px] font-medium text-gray-400 mb-2">Start Date</label>
                 <input
                   type="text"
                   value={startDate}
                   onChange={(e) => setStartDate(e.target.value)}
                   placeholder="DD-MM-YY"
                   className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder:text-gray-400 bg-white"
                 />
              </div>
              <div className="mt-7 font-semibold text-gray-800">
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </div>
              <div className="flex-1">
                 <label className="block text-[13px] font-medium text-gray-400 mb-2">End Date</label>
                 <input
                   type="text"
                   value={endDate}
                   onChange={(e) => setEndDate(e.target.value)}
                   placeholder="DD-MM-YY"
                   className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder:text-gray-400 bg-white"
                 />
              </div>
           </div>

           <div className="flex justify-end gap-3">
             <button 
               onClick={() => {
                 setNewTitle('');
                 setStartDate('');
                 setEndDate('');
               }}
               className="px-6 py-2 bg-gray-200/80 hover:bg-gray-300 text-gray-600 rounded-lg text-[13px] font-medium transition-colors"
             >
               Cancel
             </button>
             <button 
               onClick={handleAdd}
               className="px-8 py-2 bg-[#212529] hover:bg-black text-white rounded-lg text-[13px] font-medium transition-colors"
             >
               Add
             </button>
           </div>
        </div>

        {/* List Area */}
        <div className="flex-1 flex flex-col px-6 pb-6">
            <h3 className="text-[15px] font-bold text-gray-800 tracking-tight mb-4">Financial year</h3>
            
            <div className="flex flex-col flex-1 border border-gray-200 rounded-lg overflow-hidden bg-white">
               {/* Search Box outside table */}
               <div className="relative p-2 border-b border-gray-100">
                 <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                 <input
                   type="text"
                   placeholder="Search"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="w-full pl-9 pr-4 py-2 text-[13px] focus:outline-none placeholder:text-gray-400"
                 />
               </div>

               {/* Table */}
               <div className="flex-1 overflow-auto">
                 <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50/50">
                        <th className="py-3.5 px-5 text-[12px] font-semibold text-gray-500 uppercase tracking-wide w-16">Sl.No</th>
                        <th className="py-3.5 px-5 text-[12px] font-semibold text-gray-500 uppercase tracking-wide">Title</th>
                        <th className="py-3.5 px-5 text-[12px] font-semibold text-gray-500 uppercase tracking-wide">Financial year</th>
                        <th className="py-3.5 px-5 text-[12px] font-semibold text-gray-500 uppercase tracking-wide text-right w-24">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((item, index) => (
                        <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                          <td className="py-4 px-4 text-[13px] text-gray-600">
                             {String(index + 1).padStart(2, '0')}
                          </td>
                          <td className="py-4 px-4 text-[13px] text-gray-800">{item.title}</td>
                          <td className="py-4 px-4 text-[13px] text-gray-800">{item.period}</td>
                          <td className="py-4 px-4 flex items-center justify-end gap-3">
                            <button
                              onClick={() => toggleStatus(item.id)}
                              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                                item.status ? 'bg-emerald-500' : 'bg-gray-300'
                              }`}
                            >
                              <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                                item.status ? 'translate-x-[18px]' : 'translate-x-[3px]'
                              }`} />
                            </button>
                            <button className="text-gray-400 hover:text-gray-600">
                               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                 </table>
               </div>
            </div>

            <div className="mt-4 shrink-0 flex justify-center">
               <Pagination 
                  currentPage={currentPage}
                  totalPages={17}
                  rowsPerPage={rowsPerPage}
                  onPageChange={setCurrentPage}
                  onRowsChange={setRowsPerPage}
               />
            </div>
        </div>
      </div>
    </RightDrawer>
  );
};
