import { useState } from 'react';
import { Search, Filter, MoreVertical, Plus, CheckSquare, ChevronDown } from 'lucide-react';
import { Pagination } from '../../components/ui/Pagination';
import { RightDrawer } from '../../components/ui/RightDrawer';

const MOCK_VENDORS = [
  { id: 1, code: "VEND-000003", name: "Test vendor", type: "test vendor type", phone: "+91 123432434343", email: "test.test@gmail.com", country: "India", verified: true },
];

export const VendorList = () => {
  const [vendors, setVendors] = useState(MOCK_VENDORS);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] w-full animate-fade-in">
      <div className="px-6 py-4 shrink-0 flex justify-between items-center">
        <h1 className="text-xl font-bold text-slate-800">Vendor List</h1>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-6 pb-6 overflow-hidden flex flex-col">
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex-1 flex flex-col overflow-hidden">
          
          {/* Top Actions */}
          <div className="px-5 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-100">
             <div className="flex items-center gap-2 w-full sm:w-auto">
                {/* Search */}
                <div className="relative w-full sm:w-80">
                   <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                   <input
                      type="text"
                      placeholder="Search vendor name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-slate-300 placeholder:text-slate-400"
                   />
                </div>
                {/* Filter */}
                <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-500">
                   <Filter size={18} />
                </button>
             </div>

             <button 
                onClick={() => setIsDrawerOpen(true)}
                className="flex items-center gap-2 bg-[#212529] hover:bg-black text-white px-4 py-1.5 rounded text-sm font-medium transition-colors md:ml-auto w-full sm:w-auto justify-center"
             >
                <Plus size={14} />
                Add Vendor
             </button>
          </div>

          {/* Table Container */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                 <tr className="border-b border-slate-100">
                   <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 whitespace-nowrap">SL No</th>
                   <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 whitespace-nowrap">Vendor code</th>
                   <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 whitespace-nowrap">Vendor name</th>
                   <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 whitespace-nowrap">Vendor Type</th>
                   <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 whitespace-nowrap">Phone</th>
                   <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 whitespace-nowrap">Email</th>
                   <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 whitespace-nowrap">Country</th>
                   <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 whitespace-nowrap text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((vendor, index) => (
                  <tr key={vendor.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                     <td className="py-4 px-4 text-[13px] text-slate-500 whitespace-nowrap">{index + 1}</td>
                     <td className="py-4 px-4 text-[13px] font-medium text-slate-800 flex items-center gap-2 whitespace-nowrap">
                        {vendor.code}
                        {vendor.verified && <CheckSquare size={14} className="text-emerald-500" />}
                     </td>
                     <td className="py-4 px-4 text-[13px] text-slate-800 whitespace-nowrap">{vendor.name}</td>
                     <td className="py-4 px-4 text-[13px] text-slate-500 whitespace-nowrap">{vendor.type}</td>
                     <td className="py-4 px-4 text-[13px] text-slate-500 whitespace-nowrap">{vendor.phone}</td>
                     <td className="py-4 px-4 text-[13px] text-slate-500 whitespace-nowrap">{vendor.email}</td>
                     <td className="py-4 px-4 text-[13px] text-slate-500 whitespace-nowrap">{vendor.country}</td>
                     <td className="py-4 px-4 flex items-center justify-end whitespace-nowrap">
                        <button className="p-1 text-slate-400 hover:text-slate-600 rounded">
                           <MoreVertical size={16} />
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

      {/* Add Vendor Drawer */}
      <RightDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Add Vendor">
         <div className="p-6 flex flex-col gap-5">
            
            {/* Vendor Name */}
            <div>
               <label className="block text-[13px] font-medium text-slate-400 mb-1.5">
                  Vendor Name <span className="text-red-500">*</span>
               </label>
               <input
                 type="text"
                 placeholder="Enter Vendor Name"
                 className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-slate-300 placeholder:text-slate-400"
               />
            </div>
            
            {/* Vendor Type */}
            <div>
               <label className="block text-[13px] font-medium text-slate-400 mb-1.5">
                  Vendor Type <span className="text-red-500">*</span>
               </label>
               <input
                 type="text"
                 placeholder="Enter Vendor Type"
                 className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-slate-300 placeholder:text-slate-400"
               />
            </div>

            {/* Phone Number */}
            <div>
               <label className="block text-[13px] font-medium text-slate-400 mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
               </label>
               <div className="flex gap-3">
                  <div className="relative w-[100px]">
                     <select className="appearance-none w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-slate-300 bg-white">
                        <option>+91</option>
                        <option>+1</option>
                        <option>+44</option>
                     </select>
                     <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                  <input
                    type="tel"
                    placeholder="Enter your Phone Number"
                    className="flex-1 w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-slate-300 placeholder:text-slate-400"
                  />
               </div>
            </div>

            {/* Email */}
            <div>
               <label className="block text-[13px] font-medium text-slate-400 mb-1.5">
                  Email <span className="text-red-500">*</span>
               </label>
               <input
                 type="email"
                 placeholder="Enter your Email"
                 className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-slate-300 placeholder:text-slate-400"
               />
            </div>

            {/* Country */}
            <div>
               <label className="block text-[13px] font-medium text-slate-400 mb-1.5">
                  Country <span className="text-red-500">*</span>
               </label>
               <div className="relative">
                  <select className="appearance-none w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-slate-300 bg-white text-slate-400">
                     <option>Enter your Country</option>
                     <option>India</option>
                     <option>USA</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
               </div>
            </div>

            {/* Address */}
            <div>
               <label className="block text-[13px] font-medium text-slate-400 mb-1.5">
                  Address
               </label>
               <textarea
                 rows={4}
                 placeholder="Enter your Address"
                 className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-slate-300 placeholder:text-slate-400 resize-none"
               />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 mt-4">
               <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="px-6 py-2 bg-slate-200/80 hover:bg-slate-300 text-slate-600 rounded-lg text-[13px] font-medium transition-colors"
               >
                  Cancel
               </button>
               <button className="px-8 py-2 bg-[#212529] hover:bg-black text-white rounded-lg text-[13px] font-medium transition-colors">
                  Add
               </button>
            </div>
         </div>
      </RightDrawer>
    </div>
  );
};
