import { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '../../components/ui/Pagination';
import { RightDrawer } from '../../components/ui/RightDrawer';

const MOCK_DATA = [
  { id: 1, name: "Serbia", code: "+994", status: false },
  { id: 2, name: "Viet Nam", code: "+973", status: true },
  { id: 3, name: "Saint Barthélemy", code: "+975", status: true },
  { id: 4, name: "Algeria", code: "+49", status: false },
  { id: 5, name: "Åland Islands", code: "+43", status: true },
  { id: 6, name: "Tajikistan", code: "+590", status: false },
];

export const CountryList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(MOCK_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [newCountry, setNewCountry] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const handleClose = () => {
    setIsDrawerOpen(false);
    setTimeout(() => {
       navigate('/settings/master');
    }, 300);
  };

  const filtered = data.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    // simplified implementation
  };

  const toggleStatus = (id) => {
    setData(prev => prev.map(d => d.id === id ? { ...d, status: !d.status } : d));
  };

  return (
    <RightDrawer isOpen={isDrawerOpen} onClose={handleClose} title="Add Country code">
      <div className="flex flex-col h-full bg-white">
         
        {/* Form Area */}
        <div className="px-6 pt-6 pb-6">
           <div className="flex gap-4 mb-6">
              <div className="w-1/3">
                 <label className="block text-[13px] font-medium text-slate-400 mb-2">Code</label>
                 <div className="relative">
                    <select className="w-full appearance-none px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-slate-300">
                       <option>+91</option>
                       <option>+1</option>
                       <option>+44</option>
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                       <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                 </div>
              </div>
              <div className="flex-1">
                 <label className="block text-[13px] font-medium text-slate-400 mb-2">Choose country</label>
                 <div className="relative">
                    <select className="w-full appearance-none px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-slate-300">
                       <option>India</option>
                       <option>USA</option>
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                       <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                 </div>
              </div>
           </div>
           <div className="flex justify-end gap-3">
             <button 
               className="px-6 py-2 bg-slate-200/80 hover:bg-slate-300 text-slate-600 rounded-lg text-[13px] font-medium transition-colors"
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
            <h3 className="text-[15px] font-bold text-slate-800 tracking-tight mb-4">Country List</h3>
            
            <div className="flex flex-col flex-1 border border-slate-200 rounded-lg overflow-hidden bg-white">
               {/* Search Box outside table */}
               <div className="relative p-2 border-b border-slate-100">
                 <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                 <input
                   type="text"
                   placeholder="Search"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="w-full pl-9 pr-4 py-2 text-[13px] focus:outline-none placeholder:text-slate-400"
                 />
               </div>

               {/* Table */}
               <div className="flex-1 overflow-auto">
                 <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/50">
                        <th className="py-3 px-4 text-[13px] font-semibold text-slate-700 w-16">Sl.No</th>
                        <th className="py-3 px-4 text-[13px] font-semibold text-slate-700">Country</th>
                        <th className="py-3 px-4 text-[13px] font-semibold text-slate-700 w-32">Country code</th>
                        <th className="py-3 px-4 text-[13px] font-semibold text-slate-700 text-right w-24">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((item, index) => (
                        <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 px-4 text-[13px] text-slate-600">
                             {String(index + 1).padStart(2, '0')}
                          </td>
                          <td className="py-4 px-4 text-[13px] text-slate-800">{item.name}</td>
                          <td className="py-4 px-4 text-[13px] text-slate-600">{item.code}</td>
                          <td className="py-4 px-4 flex items-center justify-end gap-3">
                            <button
                              onClick={() => toggleStatus(item.id)}
                              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                                item.status ? 'bg-emerald-500' : 'bg-slate-300'
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
