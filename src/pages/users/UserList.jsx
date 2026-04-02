import { useState } from 'react';
import { Search, Filter, MoreVertical, Plus } from 'lucide-react';
import { Pagination } from '../../components/ui/Pagination';

const MOCK_USERS = [
  { id: 1, name: "Samantha Gray", email: "ali.hassan@gmail.com", phone: "(512) 543-4588", group: "Client Manager", customers: 25, status: "Inactive" },
  { id: 2, name: "Sofía Suárez", email: "stefan.peeters@gmail.com", phone: "(728) 321-5259", group: "Payroll Administrator", customers: 7, status: "Invited" },
  { id: 3, name: "Priyanka Gupta", email: "tanya.mehta@gmail.com", phone: "(799) 095-8314", group: "Auditor", customers: 12, status: "Active" },
  { id: 4, name: "Cayadi Megantara", email: "minatory_plumber_43@gmail.com", phone: "(196) 357-1409", group: "Finance Manager", customers: 8, status: "Active" },
  { id: 5, name: "Sara Gbeho", email: "amelia.rossi@gmail.com", phone: "(356) 675-3014", group: "Accountant", customers: 9, status: "Invited" },
  { id: 6, name: "Jakub Peeters", email: "redolent_toejam_65@gmail.com", phone: "(007) 819-5008", group: "Bookkeeper", customers: 16, status: "Active" },
  { id: 7, name: "Salma Rashid", email: "ishita.singh@gmail.com", phone: "(593) 436-3473", group: "Accountant", customers: 22, status: "Invited" },
  { id: 8, name: "Kamau Chidubem", email: "loquacious_designer_60@gmail.com", phone: "(718) 072-1984", group: "Accountant", customers: 14, status: "Inactive" },
  { id: 9, name: "Indah Wijayanti", email: "jejune_glitter_57@gmail.com", phone: "(017) 151-4874", group: "Bookkeeper", customers: 7, status: "Active" },
  { id: 10, name: "Anna Diaz", email: "fatima.mohammed@gmail.com", phone: "(966) 473-1271", group: "Senior Management", customers: 3, status: "Invited" },
];

const SortIcon = () => (
  <svg width="12" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
    <path d="M9 18V6l-3 4" />
    <path d="M15 6v12l3-4" />
  </svg>
);

export const UserList = () => {
  const [users, setUsers] = useState(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const StatusBadge = ({ status }) => {
    switch (status) {
       case 'Active':
          return <div className="px-4 py-1.5 rounded-md bg-[#eaf8f0] text-[#34d399] text-[11px] font-bold text-center w-[75px] tracking-wide">Active</div>;
       case 'Invited':
          return <div className="px-4 py-1.5 rounded-md bg-[#fef3eb] text-[#fb923c] text-[11px] font-bold text-center w-[75px] tracking-wide">Invited</div>;
       case 'Inactive':
          return <div className="px-4 py-1.5 rounded-md bg-[#eff6ff] text-[#60a5fa] text-[11px] font-bold text-center w-[75px] tracking-wide">Inactive</div>;
       default:
          return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] w-full animate-fade-in relative z-10">
      
       {/* Page Header */}
       <div className="px-6 py-4 shrink-0 flex justify-between items-center">
        <h1 className="text-xl font-bold text-slate-800">User List</h1>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-6 pb-6 overflow-hidden flex flex-col">
          {/* Main Card */}
          <div className="bg-white rounded-lg border border-slate-200/60 shadow-sm flex-1 flex flex-col overflow-hidden">
        
        {/* Toolbar */}
        <div className="px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
           {/* Left Controls (Joined Search and Filter) */}
           <div className="flex items-center w-full sm:w-[320px]">
              <div className="relative flex-1">
                 <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                 <input
                    type="text"
                    placeholder="Search here..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 border-r-0 rounded-l-lg text-[13px] text-slate-700 focus:outline-none placeholder:text-slate-400 shadow-sm"
                 />
              </div>
              <button className="flex items-center justify-center w-11 h-[38px] border border-slate-200 rounded-r-lg hover:bg-slate-50 transition-colors text-slate-500 shadow-sm bg-white">
                 <Filter size={16} />
              </button>
           </div>

           {/* Right Control */}
           <button className="flex items-center gap-2 bg-[#212529] hover:bg-black text-white px-5 py-2.5 rounded text-[13px] font-medium transition-colors md:ml-auto w-full sm:w-auto justify-center shadow-sm">
              <Plus size={14} />
              Quick add
           </button>
        </div>

        {/* Table Container */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead>
               <tr className="border-y border-slate-200 bg-white">
                 <th className="py-4 px-4 text-[12.5px] font-bold text-[#5c6873] whitespace-nowrap w-16">SL No</th>
                 <th className="py-4 px-4 text-[12.5px] font-bold text-[#5c6873] whitespace-nowrap">
                    <div className="flex items-center justify-between">User Name <SortIcon /></div>
                 </th>
                 <th className="py-4 px-4 text-[12.5px] font-bold text-[#5c6873] whitespace-nowrap">
                    <div className="flex items-center justify-between">Email <SortIcon /></div>
                 </th>
                 <th className="py-4 px-4 text-[12.5px] font-bold text-[#5c6873] whitespace-nowrap">
                    <div className="flex items-center justify-between">Contact Number <SortIcon /></div>
                 </th>
                 <th className="py-4 px-4 text-[12.5px] font-bold text-[#5c6873] whitespace-nowrap">
                    <div className="flex items-center justify-between">User group <SortIcon /></div>
                 </th>
                 <th className="py-4 px-4 text-[12.5px] font-bold text-[#5c6873] whitespace-nowrap">
                    <div className="flex items-center justify-between">Customers <SortIcon /></div>
                 </th>
                 <th className="py-4 px-4 text-[12.5px] font-bold text-[#5c6873] whitespace-nowrap">Status</th>
                 <th className="py-4 px-4 text-[12.5px] font-bold text-[#5c6873] whitespace-nowrap text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className="border-b border-slate-100 transition-colors bg-white hover:bg-slate-50/50">
                   <td className="py-5 px-4 text-[13px] text-slate-600 whitespace-nowrap">{index + 1}</td>
                   <td className="py-5 px-4 text-[13px] text-slate-700 font-medium tracking-tight pr-6 whitespace-nowrap">{user.name}</td>
                   <td className="py-5 px-4 text-[13px] text-slate-600 pr-6 whitespace-nowrap">{user.email}</td>
                   <td className="py-5 px-4 text-[13px] text-slate-600 tracking-tight pr-6 whitespace-nowrap">{user.phone}</td>
                   <td className="py-5 px-4 text-[13px] text-slate-600 pr-6 whitespace-nowrap">{user.group}</td>
                   <td className="py-5 px-4 text-[13px] text-slate-600 pl-4 whitespace-nowrap">{user.customers}</td>
                   <td className="py-5 px-4 text-left">
                      <StatusBadge status={user.status} />
                   </td>
                   <td className="py-5 px-4 flex justify-end">
                      <button className="text-slate-300 hover:text-slate-500 transition-colors p-1">
                         <MoreVertical size={18} strokeWidth={2.5} />
                      </button>
                   </td>
                 </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-auto shrink-0 w-full bg-white border-t border-slate-100">
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

