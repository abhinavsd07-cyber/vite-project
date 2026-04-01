import { useState } from 'react';
import { Search, Filter, MoreVertical, Plus } from 'lucide-react';
import { Toggle } from '../../components/ui/Toggle';
import { Pagination } from '../../components/ui/Pagination';

const MOCK_USERS = [
  { id: 1, name: "Aabasoft Testodd", email: "nithinmathew@aabasoft.com", phone: "+91 8138080143", group: "Super Admin", company: "0", status: "Invited", active: true },
  { id: 2, name: "aabasofttest", email: "aabasofttest@yopmail.com", phone: "+91 0123456789", group: "Super Admin", company: "0", status: "Invited", active: true },
  { id: 3, name: "Alen T Jose", email: "alentjose@finbookglobal.com", phone: "+91 9400104307", group: "Super Admin", company: "8", status: "Invited", active: true },
  { id: 4, name: "Allen (Admin)a", email: "allenjose@finbookglobal.com", phone: "+91 8971738660", group: "Super Admin", company: "13", status: "Active", active: true },
  { id: 5, name: "Allen (Maker)", email: "allenjose99a@gmail.com", phone: "+91 8971738660", group: "Maker", company: "3", status: "Active", active: true },
  { id: 6, name: "Allen Checker", email: "allenjosechecker@gmail.com", phone: "+91 8971738660", group: "Checker", company: "2", status: "Active", active: true },
  { id: 7, name: "George (Checker)", email: "georgeabrchecker@gmail.com", phone: "+91 8547121715", group: "Checker", company: "1", status: "Invited", active: true },
  { id: 8, name: "George (maker)", email: "georgeabrmaker@gmail.com", phone: "+91 8547121715", group: "Maker", company: "3", status: "Active", active: true },
  { id: 9, name: "Jobin Checker", email: "jobinjameschecker@gmail.com", phone: "+91 9037814789", group: "Checker", company: "7", status: "Active", active: true },
  { id: 10, name: "Jobin Maker", email: "jobinjamesmaker@gmail.com", phone: "+91 9037814789", group: "Maker", company: "13", status: "Active", active: true },
];

export const UserList = () => {
  const [users, setUsers] = useState(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const StatusBadge = ({ status }) => {
    if (status === 'Active') {
      return <div className="px-3 py-1 rounded-md bg-emerald-50 text-emerald-500 text-xs font-semibold inline-block border border-emerald-100">Active</div>;
    }
    return <div className="px-3 py-1 rounded-md bg-orange-50 text-orange-400 text-xs font-semibold inline-block border border-orange-100">Invited</div>;
  };

  const handleToggle = (id, newState) => {
    setUsers(users.map(u => u.id === id ? { ...u, active: newState } : u));
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] w-full animate-fade-in">
      {/* Header */}
      <div className="px-6 py-4 shrink-0">
        <h1 className="text-xl font-bold text-slate-800">User List</h1>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-6 pb-6 overflow-hidden flex flex-col">
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex-1 flex flex-col overflow-hidden">
          
          {/* Top Actions */}
          <div className="px-5 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-100">
             <div className="flex items-center gap-2 w-full sm:w-auto">
                {/* Search */}
                <div className="relative w-full sm:w-64">
                   <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                   <input
                      type="text"
                      placeholder="Search User..."
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

             <button className="flex items-center gap-2 bg-[#212529] hover:bg-black text-white px-4 py-1.5 rounded text-sm font-medium transition-colors md:ml-auto w-full sm:w-auto justify-center">
                <Plus size={14} />
                Quick Add
             </button>
          </div>

          {/* Table Container */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                 <tr className="border-b border-slate-100">
                   <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 whitespace-nowrap">SL No</th>
                   <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 whitespace-nowrap">User name</th>
                   <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 whitespace-nowrap">Email</th>
                   <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 whitespace-nowrap">Contact Number</th>
                   <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 whitespace-nowrap">User Group</th>
                   <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 whitespace-nowrap">Company</th>
                   <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 whitespace-nowrap">Status</th>
                   <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 whitespace-nowrap text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                     <td className="py-4 px-4 text-[13px] text-slate-500">{user.id}</td>
                     <td className="py-4 px-4 text-[13px] text-slate-800 font-medium">{user.name}</td>
                     <td className="py-4 px-4 text-[13px] text-slate-500 hidden md:table-cell">{user.email}</td>
                     <td className="py-4 px-4 text-[13px] text-slate-500 whitespace-nowrap">{user.phone}</td>
                     <td className="py-4 px-4 text-[13px] text-slate-500">{user.group}</td>
                     <td className="py-4 px-4 text-[13px] text-slate-500">{user.company}</td>
                     <td className="py-4 px-4 text-[13px]">
                        <StatusBadge status={user.status} />
                     </td>
                     <td className="py-4 px-4 flex items-center justify-end gap-3">
                        <Toggle 
                           initialState={user.active} 
                           onChange={(newState) => handleToggle(user.id, newState)} 
                        />
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
    </div>
  );
};
