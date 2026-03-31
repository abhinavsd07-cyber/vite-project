import { useState } from 'react';
import { Search, Filter, MoreVertical } from 'lucide-react';
import { Pagination } from '../../components/ui/Pagination';

const MOCK_COMPANIES = [
  { id: 1, company: "Aabasoft", customer: "Aabasoft customer", country: "Afghanistan", domain: "ss", date: "29/04/2025" },
  { id: 2, company: "Aabasoft soft", customer: "Aabasoft customer", country: "Afghanistan", domain: "ss", date: "29/04/2025" },
  { id: 3, company: "Aabasoft soft tech", customer: "Aabasoft customer", country: "Afghanistan", domain: "ss", date: "29/04/2025" },
  { id: 4, company: "Abc ltd", customer: "Allen Jose", country: "India", domain: "ss", date: "05/05/2025" },
  { id: 5, company: "abs company1", customer: "Finbook User", country: "Afghanistan", domain: "ss", date: "05/05/2025" },
  { id: 6, company: "AURORA TRADING LTD", customer: "Gokul", country: "United Kingdom", domain: "ss", date: "25/10/2025" },
  { id: 7, company: "bla", customer: "Reuben Jose", country: "Afghanistan", domain: "ss", date: "31/12/2025" },
  { id: 8, company: "Chai Kadai Croydon Ltd", customer: "Ujaya Lakshmi", country: "United Kingdom", domain: "ss", date: "21/05/2025" },
  { id: 9, company: "Chai Kadai Ilford Lanes Ltd", customer: "Ujaya Lakshmi", country: "United Kingdom", domain: "ss", date: "21/05/2025" },
  { id: 10, company: "Chai Kadai Ltd", customer: "Ujaya Lakshmi", country: "United Kingdom", domain: "ss", date: "21/05/2025" },
];

export const CompanyList = () => {
  const [companies, setCompanies] = useState(MOCK_COMPANIES);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] w-full animate-fade-in">
      {/* Header */}
      <div className="px-6 py-5 shrink-0">
        <h1 className="text-xl font-bold text-slate-800">Company List</h1>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-6 pb-6 overflow-hidden flex flex-col">
        <div className="bg-white rounded-xl border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex-1 flex flex-col overflow-hidden">
          
          {/* Top Actions */}
          <div className="p-4 flex items-center justify-between gap-4 border-b border-slate-100">
             <div className="flex items-center gap-2">
                {/* Search */}
                <div className="relative w-64 md:w-80">
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
                <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-500">
                   <Filter size={18} />
                </button>
             </div>
          </div>

          {/* Table Container */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="py-4 px-6 text-[13px] font-semibold text-slate-600 whitespace-nowrap">SL No</th>
                  <th className="py-4 px-6 text-[13px] font-semibold text-slate-600 whitespace-nowrap">Company name</th>
                  <th className="py-4 px-6 text-[13px] font-semibold text-slate-600 whitespace-nowrap">Customer name</th>
                  <th className="py-4 px-6 text-[13px] font-semibold text-slate-600 whitespace-nowrap">Country</th>
                  <th className="py-4 px-6 text-[13px] font-semibold text-slate-600 whitespace-nowrap">Business domain</th>
                  <th className="py-4 px-6 text-[13px] font-semibold text-slate-600 whitespace-nowrap">registered date</th>
                  <th className="py-4 px-6 text-[13px] font-semibold text-slate-600 whitespace-nowrap text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((co, index) => (
                  <tr key={co.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                    <td className="py-3 px-6 text-[13px] text-slate-500">{index + 1}</td>
                    <td className="py-3 px-6 text-[13px] text-slate-800 font-medium">{co.company}</td>
                    <td className="py-3 px-6 text-[13px] text-slate-500">{co.customer}</td>
                    <td className="py-3 px-6 text-[13px] text-slate-500">{co.country}</td>
                    <td className="py-3 px-6 text-[13px] text-slate-500">{co.domain}</td>
                    <td className="py-3 px-6 text-[13px] text-slate-500">{co.date}</td>
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

          {/* Pagination */}
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
