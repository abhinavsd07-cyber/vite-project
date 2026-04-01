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
   <svg className="w-3 h-3 text-slate-400 opacity-60 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
     <path d="m5 15 7-7 7 7" />
     <path d="m19 9-7 7-7-7" className="translate-y-6" />
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
          return <div className="px-4 py-1 rounded bg-[#eefcf2] text-[#4cd988] text-[11px] font-bold text-center border border-[#e2efe7] w-20 tracking-wide mt-1">Active</div>;
       case 'Invited':
          return <div className="px-4 py-1 rounded bg-[#fff3eb] text-[#f7a561] text-[11px] font-bold text-center border border-[#f5ede5] w-20 tracking-wide mt-1">Invited</div>;
       case 'Inactive':
          return <div className="px-4 py-1 rounded bg-[#eef5fd] text-[#6cb0eb] text-[11px] font-bold text-center border border-[#e1ebf5] w-20 tracking-wide mt-1">Inactive</div>;
       default:
          return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] w-full p-4 md:p-6 animate-fade-in relative z-10">
      
      {/* Main Card */}
      <div className="bg-white rounded-[14px] border border-slate-200/80 shadow-[0_1px_5px_rgba(0,0,0,0.02)] flex-1 flex flex-col overflow-hidden">
        
        {/* Toolbar */}
        <div className="px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
           {/* Left Controls */}
           <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-[280px]">
                 <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                 <input
                    type="text"
                    placeholder="Search here..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-[13px] text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-300 placeholder:text-slate-400 placeholder:font-light shadow-sm"
                 />
              </div>
              <button className="flex items-center justify-center w-9 h-9 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-500 shadow-sm">
                 <Filter size={15} />
              </button>
           </div>

           {/* Right Control */}
           <button className="flex items-center gap-2 bg-[#212529] hover:bg-black text-white px-5 py-2 rounded-lg text-[13px] font-medium transition-colors md:ml-auto w-full sm:w-auto justify-center shadow-sm">
              <Plus size={14} />
              Quick add
           </button>
        </div>

        {/* Table Container */}
        <div className="flex-1 overflow-auto px-6">
          <table className="w-full text-left border-collapse min-w-[950px]">
            <thead>
               <tr className="border-y border-slate-100/80">
                 <th className="py-4 px-2 text-[12.5px] font-bold text-slate-700 whitespace-nowrap w-20">SL No</th>
                 <th className="py-4 px-2 text-[12.5px] font-bold text-slate-700 whitespace-nowrap">
                    <div className="flex items-center justify-between">User Name <SortIcon /></div>
                 </th>
                 <th className="py-4 px-2 text-[12.5px] font-bold text-slate-700 whitespace-nowrap hidden lg:table-cell">
                    <div className="flex items-center justify-between">Email <SortIcon /></div>
                 </th>
                 <th className="py-4 px-2 text-[12.5px] font-bold text-slate-700 whitespace-nowrap">
                    <div className="flex items-center justify-between">Contact Number <SortIcon /></div>
                 </th>
                 <th className="py-4 px-2 text-[12.5px] font-bold text-slate-700 whitespace-nowrap">
                    <div className="flex items-center justify-between">User group <SortIcon /></div>
                 </th>
                 <th className="py-4 px-2 text-[12.5px] font-bold text-slate-700 whitespace-nowrap text-center">
                    <div className="flex items-center justify-between">Customers <SortIcon /></div>
                 </th>
                 <th className="py-4 px-2 text-[12.5px] font-bold text-slate-700 whitespace-nowrap">Status</th>
                 <th className="py-4 px-2 text-[12.5px] font-bold text-slate-700 whitespace-nowrap text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className="border-b border-slate-100/60 transition-colors bg-white hover:bg-slate-50/50 group">
                   <td className="py-5 px-2 text-[12.5px] text-slate-500">{index + 1}</td>
                   <td className="py-5 px-2 text-[12.5px] text-slate-600 font-medium tracking-tight pr-8">{user.name}</td>
                   <td className="py-5 px-2 text-[12.5px] text-slate-600 hidden lg:table-cell pr-8">{user.email}</td>
                   <td className="py-5 px-2 text-[12.5px] text-slate-600 tracking-tight pr-8">{user.phone}</td>
                   <td className="py-5 px-2 text-[12.5px] text-slate-600 pr-8">{user.group}</td>
                   <td className="py-5 px-2 text-[12.5px] text-slate-600">{user.customers}</td>
                   <td className="py-5 px-2 text-left">
                      <StatusBadge status={user.status} />
                   </td>
                   <td className="py-5 px-2 flex justify-end">
                      <button className="text-slate-300 hover:text-slate-500 transition-colors p-1">
                         <MoreVertical size={16} strokeWidth={2.5} />
                      </button>
                   </td>
                 </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-auto shrink-0 w-full bg-white">
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
  );
};
