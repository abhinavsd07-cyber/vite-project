import { useState } from 'react';
import { Search, Filter, MoreVertical, Plus, CheckSquare, ChevronDown } from 'lucide-react';
import { Pagination } from '../../components/ui/Pagination';
import { RightDrawer } from '../../components/ui/RightDrawer';

const MOCK_VENDORS = [
  { id: 1, code: "VEND-000003", name: "Test vendor", type: "test vendor type", phone: "+91 123432434343", email: "test.test@gmail.com", country: "India", verified: true },
];

export const VendorList = () => {
  const [vendors] = useState(MOCK_VENDORS);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [, setIsDrawerOpen] = useState(false);

  const filtered = vendors.filter(v =>
    searchTerm === '' ||
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full w-full">
      <div className="px-6 pt-6 pb-4 shrink-0">
        <h1 className="text-[20px] font-semibold text-gray-800">Vendor List</h1>
      </div>

      <div className="flex-1 px-6 pb-6 overflow-hidden flex flex-col min-h-0">
        <div className="bg-white rounded-lg border border-gray-200 flex-1 flex flex-col overflow-hidden">

          {/* Toolbar */}
          <div className="px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-gray-100">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-[300px]">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search vendor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-[13px] text-gray-700 focus:outline-none focus:border-gray-300 placeholder:text-gray-400"
                />
              </div>
              <button className="flex items-center justify-center w-9 h-9 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 transition-colors shrink-0">
                <Filter size={15} />
              </button>
            </div>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-2 bg-[#212529] hover:bg-black text-white px-4 py-2 rounded-md text-[13px] font-medium transition-colors shrink-0 w-full sm:w-auto justify-center"
            >
              <Plus size={14} /> Add Vendor
            </button>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-3.5 px-6 text-[12px] font-semibold text-gray-500 uppercase tracking-wide w-14">SL No</th>
                  <th className="py-3.5 px-6 text-[12px] font-semibold text-gray-500 uppercase tracking-wide">Vendor Code</th>
                  <th className="py-3.5 px-6 text-[12px] font-semibold text-gray-500 uppercase tracking-wide">Vendor Name</th>
                  <th className="py-3.5 px-6 text-[12px] font-semibold text-gray-500 uppercase tracking-wide">Vendor Type</th>
                  <th className="py-3.5 px-6 text-[12px] font-semibold text-gray-500 uppercase tracking-wide">Phone</th>
                  <th className="py-3.5 px-6 text-[12px] font-semibold text-gray-500 uppercase tracking-wide">Email</th>
                  <th className="py-3.5 px-6 text-[12px] font-semibold text-gray-500 uppercase tracking-wide">Country</th>
                  <th className="py-3.5 px-6 text-[12px] font-semibold text-gray-500 uppercase tracking-wide text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? filtered.map((v, i) => (
                  <tr key={v.id} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                    <td className="py-4 px-6 text-[13px] text-gray-500">{i + 1}</td>
                    <td className="py-4 px-6 text-[13px] text-gray-800 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {v.code}
                        {v.verified && <CheckSquare size={13} className="text-emerald-500 shrink-0" />}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-[13px] text-gray-800 whitespace-nowrap">{v.name}</td>
                    <td className="py-4 px-6 text-[13px] text-gray-600 whitespace-nowrap">{v.type}</td>
                    <td className="py-4 px-6 text-[13px] text-gray-600 whitespace-nowrap">{v.phone}</td>
                    <td className="py-4 px-6 text-[13px] text-gray-600 whitespace-nowrap">{v.email}</td>
                    <td className="py-4 px-6 text-[13px] text-gray-600 whitespace-nowrap">{v.country}</td>
                    <td className="py-4 px-6 text-right">
                      <button className="text-gray-300 hover:text-gray-500 p-1 rounded">
                        <MoreVertical size={17} strokeWidth={2} />
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={8} className="py-16 text-center text-[13px] text-gray-400">No vendors found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filtered.length / rowsPerPage) || 1}
            totalEntries={filtered.length}
            rowsPerPage={rowsPerPage}
            onPageChange={setCurrentPage}
            onRowsChange={(n) => { setRowsPerPage(n); setCurrentPage(1); }}
          />
        </div>
      </div>
    </div>
  );
};
