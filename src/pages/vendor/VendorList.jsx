import { useState } from 'react';
import { Search, Filter, MoreVertical, Plus, CheckSquare } from 'lucide-react';
import { Pagination } from '../../components/ui/Pagination';

const MOCK_VENDORS = [
  { id: 1, code: "VEND-000003", name: "Test vendor", type: "test vendor type", phone: "+91 123432434343", email: "test.test@gmail.com", country: "India", verified: true },
];

export const VendorList = () => {
  const [vendors, setVendors] = useState(MOCK_VENDORS);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] w-full animate-fade-in">
      {/* Header */}
      <div className="px-6 py-5 shrink-0">
        <h1 className="text-xl font-bold text-slate-800">Vendor List</h1>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-6 pb-6 overflow-hidden flex flex-col">
        <div className="bg-white rounded-xl border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex-1 flex flex-col overflow-hidden">
          
          {/* Top Actions */}
          <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100">
             <div className="flex items-center gap-2 w-full sm:w-auto">
                {/* Search */}
                <div className="relative w-full sm:w-80">
                   <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                   <input
                      type="text"
                      placeholder="Search vendor name..."
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

             <button className="flex items-center gap-2 bg-[#1a1c21] hover:bg-black text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors md:ml-auto w-full sm:w-auto justify-center">
                <Plus size={16} />
                Add Vendor
             </button>
          </div>

          {/* Table Container */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="py-4 px-6 text-[13px] font-semibold text-slate-600 whitespace-nowrap">SL No</th>
                  <th className="py-4 px-6 text-[13px] font-semibold text-slate-600 whitespace-nowrap">Vendor code</th>
                  <th className="py-4 px-6 text-[13px] font-semibold text-slate-600 whitespace-nowrap">Vendor name</th>
                  <th className="py-4 px-6 text-[13px] font-semibold text-slate-600 whitespace-nowrap">Vendor Type</th>
                  <th className="py-4 px-6 text-[13px] font-semibold text-slate-600 whitespace-nowrap">Phone</th>
                  <th className="py-4 px-6 text-[13px] font-semibold text-slate-600 whitespace-nowrap">Email</th>
                  <th className="py-4 px-6 text-[13px] font-semibold text-slate-600 whitespace-nowrap">Country</th>
                  <th className="py-4 px-6 text-[13px] font-semibold text-slate-600 whitespace-nowrap text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((vendor, index) => (
                  <tr key={vendor.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                    <td className="py-4 px-6 text-[13px] text-slate-500">{index + 1}</td>
                    <td className="py-4 px-6 text-[13px] font-medium text-slate-800 flex items-center gap-2">
                       {vendor.code}
                       {vendor.verified && <CheckSquare size={16} className="text-emerald-500" />}
                    </td>
                    <td className="py-4 px-6 text-[13px] text-slate-800">{vendor.name}</td>
                    <td className="py-4 px-6 text-[13px] text-slate-500">{vendor.type}</td>
                    <td className="py-4 px-6 text-[13px] text-slate-500 whitespace-nowrap">{vendor.phone}</td>
                    <td className="py-4 px-6 text-[13px] text-slate-500">{vendor.email}</td>
                    <td className="py-4 px-6 text-[13px] text-slate-500">{vendor.country}</td>
                    <td className="py-4 px-6 flex items-center justify-end">
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
