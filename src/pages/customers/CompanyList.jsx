import { useState, useEffect } from 'react';
import { Search, Filter, MoreVertical, Edit, Trash2, Calendar, FileText } from 'lucide-react';
import { Pagination } from '../../components/ui/Pagination';

const MOCK_COMPANIES = [
  { id: 1, company: "Jaco - Jaguar Corporation", customer: "Carlos García", country: "Canada", phone: "+91 (115) 649-2635", email: "willard_perez@gmail.com", domain: "Travel and Hospitality", date: "26/6/2007" },
  { id: 2, company: "Mu - Mu Group", customer: "Tawanna Keita", country: "Brazil", phone: "+91 (115) 649-2635", email: "crapulous_unicorn_94@gmail.com", domain: "Consumer Goods and Services", date: "25/12/2010" },
  { id: 3, company: "VG - Van Group", customer: "Carlota Borg", country: "Germany", phone: "+91 (794) 611-8747", email: "paulos.adimbola@gmail.com", domain: "Telecommunications", date: "17/1/2014" },
  { id: 4, company: "Delta - Delta Corporation", customer: "Artsiom Hoxha", country: "Japan", phone: "+91 (478) 739-4324", email: "ali.rashid@gmail.com", domain: "Energy and Utilities", date: "7/1/2021" },
  { id: 5, company: "Yates - Yates Enterprise", customer: "Lukas Dimitrov", country: "Australia", phone: "+91 (583) 108-4311", email: "risible_inker_71@gmail.com", domain: "Real Estate and Construction", date: "26/6/2007" },
  { id: 6, company: "Acme - Acme Corporation", customer: "Léa Bērziņš", country: "South Africa", phone: "+91 (992) 609-2790", email: "judicious_gnomes_43@gmail.com", domain: "Manufacturing and Industrial", date: "25/12/2010" },
  { id: 7, company: "Base - Base Corporation", customer: "Salma Rashid", country: "India", phone: "+91 (340) 976-2718", email: "rebarbative_senor_74@gmail.com", domain: "Retail and E-commerce", date: "17/1/2014" },
  { id: 8, company: "Hero - Hero Corporation", customer: "Amira Khoury", country: "Mexico", phone: "+91 (480) 199-7240", email: "sara.chizimu@gmail.com", domain: "Technology and IT Services", date: "7/1/2021" },
  { id: 9, company: "Ome - Omega Co", customer: "Amira Khoury", country: "Mexico", phone: "+91 (480) 199-7240", email: "sara.chizimu@gmail.com", domain: "Technology and IT Services", date: "7/1/2021" },
  { id: 10, company: "Echo - Echo Corporation", customer: "Margaret Anderson", country: "Egypt", phone: "+91 (048) 960-9392", email: "quiescent_cookies_92@gmail.com", domain: "Healthcare and Pharmaceuticals", date: "27/2/2016" },
];

const SortIcon = () => (
  <svg width="12" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 shrink-0">
    <path d="M9 18V6l-3 4" />
    <path d="M15 6v12l3-4" />
  </svg>
);

export const CompanyList = () => {
  const [companies, setCompanies] = useState(MOCK_COMPANIES);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.action-dropdown-container')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <div className="px-6 py-4 shrink-0 flex justify-between items-center">
        <h1 className="text-[20px] font-semibold text-gray-800">Company List</h1>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-6 pb-6 overflow-hidden flex flex-col">
        <div className="bg-white rounded-lg border border-gray-200/60 shadow-sm flex-1 flex flex-col overflow-hidden">
          
          {/* Toolbar */}
          <div className="px-4 py-4 flex flex-col sm:flex-row items-center gap-4">
             {/* Left Controls (Joined Search and Filter) */}
             <div className="flex items-center w-full sm:w-[320px]">
                <div className="relative flex-1">
                   <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                   <input
                      type="text"
                      placeholder="Search here..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 border-r-0 rounded-l-lg text-[13px] text-gray-700 focus:outline-none placeholder:text-gray-400 shadow-sm"
                   />
                </div>
                <button className="flex items-center justify-center w-11 h-[38px] border border-gray-200 rounded-r-lg hover:bg-gray-50 transition-colors text-gray-500 shadow-sm bg-white">
                   <Filter size={16} />
                </button>
             </div>
          </div>

          {/* Table Container */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                 <tr className="border-y border-gray-200 bg-white">
                   <th className="py-4 px-4 text-[12.5px] font-bold text-[#5c6873] whitespace-nowrap w-16">SL No</th>
                   <th className="py-4 px-4 text-[12.5px] font-bold text-[#5c6873] whitespace-nowrap">
                      <div className="flex items-center justify-between">Company name <SortIcon /></div>
                   </th>
                   <th className="py-4 px-4 text-[12.5px] font-bold text-[#5c6873] whitespace-nowrap">
                      <div className="flex items-center justify-between">Customer name <SortIcon /></div>
                   </th>
                   <th className="py-4 px-4 text-[12.5px] font-bold text-[#5c6873] whitespace-nowrap">
                      <div className="flex items-center justify-between">Country <SortIcon /></div>
                   </th>
                   <th className="py-4 px-4 text-[12.5px] font-bold text-[#5c6873] whitespace-nowrap">
                      <div className="flex items-center justify-between">Phone <SortIcon /></div>
                   </th>
                   <th className="py-4 px-4 text-[12.5px] font-bold text-[#5c6873] whitespace-nowrap">
                      <div className="flex items-center justify-between">Email <SortIcon /></div>
                   </th>
                   <th className="py-4 px-4 text-[12.5px] font-bold text-[#5c6873] whitespace-nowrap">
                      <div className="flex items-center justify-between">Business domain <SortIcon /></div>
                   </th>
                   <th className="py-4 px-4 text-[12.5px] font-bold text-[#5c6873] whitespace-nowrap">
                      <div className="flex items-center justify-between">Registered date <SortIcon /></div>
                   </th>
                   <th className="py-4 px-4 text-[12.5px] font-bold text-[#5c6873] whitespace-nowrap text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((co, index) => (
                  <tr key={co.id} className="border-b border-gray-100 transition-colors bg-white hover:bg-gray-50/50">
                     <td className="py-5 px-4 text-[13px] text-gray-600 whitespace-nowrap">{index + 1}</td>
                     <td className="py-5 px-4 text-[13px] text-gray-700 font-medium tracking-tight pr-6 whitespace-nowrap">{co.company}</td>
                     <td className="py-5 px-4 text-[13px] text-gray-600 pr-6 whitespace-nowrap">{co.customer}</td>
                     <td className="py-5 px-4 text-[13px] text-gray-600 pr-6 whitespace-nowrap">{co.country}</td>
                     <td className="py-5 px-4 text-[13px] text-gray-600 tracking-tight pr-6 whitespace-nowrap">{co.phone}</td>
                     <td className="py-5 px-4 text-[13px] text-gray-600 pr-6 whitespace-nowrap">{co.email}</td>
                     <td className="py-5 px-4 text-[13px] text-gray-600 pr-6 whitespace-nowrap">{co.domain}</td>
                     <td className="py-5 px-4 text-[13px] text-gray-600 pr-6 whitespace-nowrap">{co.date}</td>
                     <td className="py-5 px-4 text-right whitespace-nowrap">
                        <div className="relative inline-block text-left action-dropdown-container">
                           <button 
                             onClick={() => setActiveDropdown(activeDropdown === co.id ? null : co.id)}
                             className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                           >
                              <MoreVertical size={18} strokeWidth={2.5} />
                           </button>
                           
                           {activeDropdown === co.id && (
                             <div className="absolute right-full top-0 mt-0 mr-1 w-48 bg-white border border-gray-100/60 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] py-2 z-[60] animate-fade-in origin-top-right">
                               <button className="w-full text-left px-5 py-2.5 text-[13px] text-gray-600 hover:bg-gray-50/80 flex items-center gap-3 transition-colors">
                                 <Edit size={15} className="text-gray-400" />
                                 Edit
                               </button>
                               <button className="w-full text-left px-5 py-2.5 text-[13px] text-[#ef4444] hover:bg-red-50/50 flex items-center gap-3 transition-colors">
                                 <Trash2 size={15} className="text-[#ef4444]" />
                                 Delete
                               </button>
                               <button className="w-full text-left px-5 py-2.5 text-[13px] text-gray-600 hover:bg-gray-50/80 flex items-center gap-3 transition-colors">
                                 <Calendar size={15} className="text-gray-400" />
                                 FY Settings
                               </button>
                               <button className="w-full text-left px-5 py-2.5 text-[13px] text-gray-600 hover:bg-gray-50/80 flex items-center gap-3 transition-colors">
                                 <FileText size={15} className="text-gray-400" />
                                 Reports settings
                               </button>
                             </div>
                           )}
                        </div>
                     </td>
                   </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="mt-auto shrink-0 w-full bg-white border-t border-gray-100">
             <Pagination 
                currentPage={currentPage}
                totalPages={17}
                totalEntries={256}
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
