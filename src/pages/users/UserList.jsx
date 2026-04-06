import { useState, useRef, useEffect } from 'react';
import { Search, Filter, MoreVertical, Plus, X, ChevronDown, Edit2, Send, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';

import '../../index.css'; // Ensure index.css is applied if we add custom styles
import { Pagination } from '../../components/ui/Pagination';
import { RightDrawer } from '../../components/ui/RightDrawer';
import { Toast } from '../../lib/utils';

const MOCK_USERS = [
  { id: 1, name: "Samantha Gray", email: "ali.hassan@gmail.com", phone: "(512) 543-4588", group: "Client Manager", customers: 25, status: "Inactive" },
  { id: 2, name: "Sofia Suárez", email: "stefan.peeters@gmail.com", phone: "(728) 321-5259", group: "Payroll Administrator", customers: 7, status: "Invited" },
  { id: 3, name: "Priyanka Gupta", email: "tanya.mehta@gmail.com", phone: "(799) 095-8314", group: "Auditor", customers: 12, status: "Active" },
  { id: 4, name: "Cayadi Megantara", email: "minatory_plumber_43@gmail.com", phone: "(196) 357-1409", group: "Finance Manager", customers: 8, status: "Active" },
  { id: 5, name: "Sara Gbeho", email: "amelia.rossi@gmail.com", phone: "(356) 675-3014", group: "Accountant", customers: 9, status: "Invited" },
  { id: 6, name: "Jakub Peeters", email: "redolent_toejam_65@gmail.com", phone: "(007) 819-5008", group: "Bookkeeper", customers: 16, status: "Active" },
  { id: 7, name: "Salma Rashid", email: "ishita.singh@gmail.com", phone: "(593) 436-3473", group: "Accountant", customers: 22, status: "Invited" },
  { id: 8, name: "Kamau Chidubem", email: "loquacious_designer_60@gmail.com", phone: "(718) 072-1984", group: "Accountant", customers: 14, status: "Inactive" },
  { id: 9, name: "Indah Wijayanti", email: "jejune_glitter_57@gmail.com", phone: "(017) 151-4874", group: "Bookkeeper", customers: 7, status: "Active" },
  { id: 10, name: "Anna Diaz", email: "fatima.mohammed@gmail.com", phone: "(966) 473-1271", group: "Senior Management", customers: 3, status: "Invited" }
];

const USER_GROUPS = ["Client Manager", "Payroll Administrator", "Auditor", "Finance Manager", "Accountant", "Bookkeeper", "Senior Management"];
const STATUS_OPTIONS = ["Active", "Inactive", "Invited"];

const StatusBadge = ({ status }) => {
  const styles = {
    Active: "bg-[#e8f5e9] text-[#2e7d32]",
    Inactive: "bg-[#e3f2fd] text-[#1976d2]",
    Invited: "bg-[#fff3e0] text-[#f57c00]",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-[12px] font-medium ${styles[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
};

export const UserList = () => {
  const [users] = useState(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showFilter, setShowFilter] = useState(false);
  const [filterUserGroup, setFilterUserGroup] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [appliedFilters, setAppliedFilters] = useState({ userGroup: '', status: '' });
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [quickAddForm, setQuickAddForm] = useState({ userName: '', email: '', countryCode: '+91', phone: '', userGroup: '' });
  const [showEditUser, setShowEditUser] = useState(false);
  const [editUserForm, setEditUserForm] = useState({ userName: '', email: '', countryCode: '+91', phone: '', userGroup: '' });
  const [activeActionMenu, setActiveActionMenu] = useState(null);
  const actionMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(e.target)) {
        setActiveActionMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = searchTerm === '' ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.group.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = !appliedFilters.userGroup || user.group === appliedFilters.userGroup;
    const matchesStatus = !appliedFilters.status || user.status === appliedFilters.status;
    return matchesSearch && matchesGroup && matchesStatus;
  });

  const paginatedUsers = filteredUsers.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleQuickAddChange = (field, value) => setQuickAddForm(prev => ({ ...prev, [field]: value }));
  const handleQuickAddClear = () => setQuickAddForm({ userName: '', email: '', countryCode: '+91', phone: '', userGroup: '' });

  const handleQuickAddCreate = (e) => {
    e.preventDefault();
    if (!quickAddForm.userName || !quickAddForm.email || !quickAddForm.phone || !quickAddForm.userGroup) {
      Toast.fire({ icon: 'warning', title: 'Please fill all required fields' });
      return;
    }
    Toast.fire({ icon: 'success', title: 'User created successfully!' });
    handleQuickAddClear();
    setShowQuickAdd(false);
  };

  const handleSaveAndAllocate = (e) => {
    e.preventDefault();
    if (!quickAddForm.userName || !quickAddForm.email || !quickAddForm.phone || !quickAddForm.userGroup) {
      Toast.fire({ icon: 'warning', title: 'Please fill all required fields' });
      return;
    }
    Toast.fire({ icon: 'success', title: 'User saved!' });
    handleQuickAddClear();
    setShowQuickAdd(false);
  };

  const handleEdit = (user) => { 
    setActiveActionMenu(null); 
    setEditUserForm({
      id: user.id,
      userName: user.name,
      email: user.email,
      countryCode: '+91',
      phone: user.phone,
      userGroup: user.group
    });
    setShowEditUser(true); 
  };

  const handleEditChange = (field, value) => setEditUserForm(prev => ({ ...prev, [field]: value }));

  const handleEditSave = (e) => {
    e.preventDefault();
    if (!editUserForm.userName || !editUserForm.email || !editUserForm.phone || !editUserForm.userGroup) {
      Toast.fire({ icon: 'warning', title: 'Please fill all required fields' });
      return;
    }
    Toast.fire({ icon: 'success', title: 'User updated successfully!' });
    setShowEditUser(false);
  };

  const handleResend = (user) => { setActiveActionMenu(null); Toast.fire({ icon: 'success', title: `Credentials resent to ${user.email}` }); };

  return (
    <div className="flex flex-col h-full w-full bg-[#fafafa]">

      {/* Page Title */}
      <div className="px-6 pt-6 pb-4 shrink-0">
        <h1 className="text-[22px] font-semibold text-gray-800">User List</h1>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-6 overflow-hidden flex flex-col min-h-0">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex-1 flex flex-col overflow-hidden">

          {/* Toolbar */}
          <div className="px-6 py-5 flex items-center justify-between gap-3 bg-white">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Search */}
              <div className="relative flex-1 sm:w-[320px]">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search here..."
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-[13.5px] text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-gray-300 placeholder:text-gray-400 transition-all"
                />
              </div>
              {/* Filter toggle */}
              <button
                onClick={() => setShowFilter(!showFilter)}
                className={`flex items-center justify-center w-10 h-10 shrink-0 border rounded-lg transition-colors ${showFilter ? 'border-gray-400 text-gray-700 bg-gray-50' : 'border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600'}`}
              >
                {showFilter ? <X size={16} /> : <Filter size={16} />}
              </button>
            </div>

            {/* Quick Add */}
            <button
              onClick={() => setShowQuickAdd(true)}
              className="flex items-center gap-2 bg-[#1a1a1a] hover:bg-black text-white px-5 py-2.5 rounded-lg text-[13.5px] font-medium transition-colors shrink-0"
            >
              <Plus size={16} />
              Quick add
            </button>
          </div>

          {/* Filter Panel */}
          {showFilter && (
            <div className="px-6 py-5 border-t border-gray-100 bg-[#fafafa] animate-slide-down">
              <div className="flex flex-col sm:flex-row items-end gap-4">
                <div className="flex flex-col gap-2 w-full sm:w-[220px]">
                  <label className="text-[12.5px] font-medium text-gray-600">User Group</label>
                  <div className="relative">
                    <select
                      value={filterUserGroup}
                      onChange={(e) => setFilterUserGroup(e.target.value)}
                      className="appearance-none w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-[13.5px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-gray-300 cursor-pointer transition-all"
                    >
                      <option value="">All Groups</option>
                      {USER_GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full sm:w-[220px]">
                  <label className="text-[12.5px] font-medium text-gray-600">Status</label>
                  <div className="relative">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="appearance-none w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-[13.5px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-gray-300 cursor-pointer transition-all"
                    >
                      <option value="">All Statuses</option>
                      {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-auto">
                  <button
                    onClick={() => { setFilterUserGroup(''); setFilterStatus(''); setAppliedFilters({ userGroup: '', status: '' }); }}
                    className="px-5 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-[13.5px] font-medium transition-colors"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => { setAppliedFilters({ userGroup: filterUserGroup, status: filterStatus }); setCurrentPage(1); }}
                    className="px-5 py-2.5 bg-[#1a1a1a] hover:bg-black text-white rounded-lg text-[13.5px] font-medium transition-colors"
                  >
                    Apply Filter
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Table Container */}
          <div className="flex-1 overflow-auto scrollbar-thin pr-1 pb-2">
            <table className="w-full text-left border-collapse min-w-[950px]">
              <thead>
                <tr className="bg-white border-y border-gray-100">
                  <th className="py-3.5 px-6 text-[13px] font-medium text-[#212529] whitespace-nowrap w-16">SL No</th>
                  <th className="py-3.5 px-6 text-[13px] font-medium text-[#212529] whitespace-nowrap group cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-1.5">
                      User Name
                      <ArrowUpDown size={13} className="text-gray-400 group-hover:text-gray-600" />
                    </div>
                  </th>
                  <th className="py-3.5 px-6 text-[13px] font-medium text-[#212529] whitespace-nowrap">Email</th>
                  <th className="py-3.5 px-6 text-[13px] font-medium text-[#212529] whitespace-nowrap group cursor-pointer hover:bg-gray-50 transition-colors">
                     <div className="flex items-center gap-1.5">
                      Contact Number
                      <ArrowUpDown size={13} className="text-gray-400 group-hover:text-gray-600" />
                    </div>
                  </th>
                  <th className="py-3.5 px-6 text-[13px] font-medium text-[#212529] whitespace-nowrap group cursor-pointer hover:bg-gray-50 transition-colors">
                     <div className="flex items-center gap-1.5">
                      User group
                      <ArrowUpDown size={13} className="text-gray-400 group-hover:text-gray-600" />
                    </div>
                  </th>
                  <th className="py-3.5 px-6 text-[13px] font-medium text-[#212529] whitespace-nowrap group cursor-pointer hover:bg-gray-50 transition-colors">
                     <div className="flex items-center gap-1.5">
                      Customers
                      <ArrowUpDown size={13} className="text-gray-400 group-hover:text-gray-600" />
                    </div>
                  </th>
                  <th className="py-3.5 px-6 text-[13px] font-medium text-[#212529] whitespace-nowrap">Status</th>
                  <th className="py-3.5 px-6 text-[13px] font-medium text-[#212529] whitespace-nowrap text-right pr-8">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {paginatedUsers.length > 0 ? (
                  paginatedUsers.map((user, index) => (
                    <tr key={user.id} className="hover:bg-[#fafafa] transition-colors">
                      <td className="py-4 px-6 text-[13px] text-gray-500 font-medium whitespace-nowrap">
                        {(currentPage - 1) * rowsPerPage + index + 1}
                      </td>
                      <td className="py-4 px-6 text-[13px] text-[#495057] whitespace-nowrap">{user.name}</td>
                      <td className="py-4 px-6 text-[13px] text-[#495057] whitespace-nowrap">{user.email}</td>
                      <td className="py-4 px-6 text-[13px] text-[#495057] whitespace-nowrap">{user.phone}</td>
                      <td className="py-4 px-6 text-[13px] text-[#495057] whitespace-nowrap">{user.group}</td>
                      <td className="py-4 px-6 text-[13px] text-[#495057] whitespace-nowrap">{user.customers}</td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <StatusBadge status={user.status} />
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap pr-8">
                        <div className="flex justify-end relative">
                          <button
                            onClick={() => setActiveActionMenu(activeActionMenu === user.id ? null : user.id)}
                            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded"
                          >
                            <MoreVertical size={18} strokeWidth={2} />
                          </button>
                          {activeActionMenu === user.id && (
                            <div
                              ref={actionMenuRef}
                              className="absolute right-0 top-full mt-1 w-[180px] bg-white rounded-lg shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100 py-1.5 z-50"
                            >
                              <button
                                onClick={() => handleEdit(user)}
                                className="w-full flex items-center gap-3 px-4 py-2 text-[13.5px] text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                              >
                                <Edit2 size={14} className="text-gray-400" /> Edit
                              </button>
                              <button
                                onClick={() => handleResend(user)}
                                className="w-full flex items-center gap-3 px-4 py-2 text-[13.5px] text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                              >
                                <Send size={14} className="text-gray-400" /> Resend Credentials
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center">
                          <Search size={24} className="text-gray-300" />
                        </div>
                        <p className="text-[14px] text-gray-400 font-medium">No users found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Custom Footer Pagination mimicking the image closely */}
          <div className="px-6 py-4 border-t border-gray-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
             <div className="text-[13.5px] text-gray-500">
               Showing {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, filteredUsers.length)} of 256 entries
             </div>
             
             <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                     className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  {[1, 2, 3].map(pageNum => (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 flex items-center justify-center rounded text-[13px] font-medium transition-colors ${
                        currentPage === pageNum 
                        ? 'bg-[#1a1a1a] text-white' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                  <span className="text-gray-400 px-1">...</span>
                  <button 
                    onClick={() => setCurrentPage(17)}
                    className={`w-8 h-8 flex items-center justify-center rounded text-[13px] font-medium transition-colors ${
                      currentPage === 17 
                      ? 'bg-[#1a1a1a] text-white' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent'
                    }`}
                  >
                    17
                  </button>
                   <button 
                    onClick={() => setCurrentPage(Math.min(Math.ceil(filteredUsers.length / rowsPerPage), currentPage + 1))}
                     className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
                
                <div className="flex items-center gap-2 text-[13px] text-gray-500">
                   Show 
                   <div className="relative">
                     <select
                       value={rowsPerPage}
                       onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                       className="appearance-none w-14 px-2 py-1.5 bg-white border border-gray-200 rounded text-[13px] text-gray-700 focus:outline-none cursor-pointer"
                     >
                       <option value={10}>10</option>
                       <option value={25}>25</option>
                       <option value={50}>50</option>
                     </select>
                     <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                   </div>
                   entries
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Quick Add Drawer */}
      <RightDrawer isOpen={showQuickAdd} onClose={() => setShowQuickAdd(false)} title="Add User">
        <div className="p-6 flex flex-col gap-5">
           {/* ...rest of drawer logic remains the same... */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-gray-600">User Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="Enter user name"
              value={quickAddForm.userName}
              onChange={(e) => handleQuickAddChange('userName', e.target.value)}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-[13px] text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-gray-600">Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              placeholder="Enter email"
              value={quickAddForm.email}
              onChange={(e) => handleQuickAddChange('email', e.target.value)}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-[13px] text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-gray-600">Contact Number <span className="text-red-500">*</span></label>
            <div className="flex gap-2">
              <div className="relative w-[90px] shrink-0">
                <select
                  value={quickAddForm.countryCode}
                  onChange={(e) => handleQuickAddChange('countryCode', e.target.value)}
                  className="appearance-none w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] text-gray-600 focus:outline-none focus:border-gray-400 cursor-pointer"
                >
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+971">+971</option>
                </select>
                <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <input
                type="tel"
                placeholder="Enter phone number"
                value={quickAddForm.phone}
                onChange={(e) => handleQuickAddChange('phone', e.target.value)}
                className="flex-1 px-3.5 py-2.5 border border-gray-200 rounded-lg text-[13px] text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-gray-600">User Group <span className="text-red-500">*</span></label>
            <div className="relative">
              <select
                value={quickAddForm.userGroup}
                onChange={(e) => handleQuickAddChange('userGroup', e.target.value)}
                className="appearance-none w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-[13px] text-gray-600 focus:outline-none focus:border-gray-400 cursor-pointer"
              >
                <option value="">Choose user group</option>
                {USER_GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
              <ChevronDown size={13} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-end gap-2 mt-auto">
          <button
            onClick={handleQuickAddClear}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg text-[13px] font-medium transition-colors"
          >
            Clear
          </button>
          <button
            onClick={handleSaveAndAllocate}
            className="px-4 py-2 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-[13px] font-medium transition-colors"
          >
            Save & allocate
          </button>
          <button
            onClick={handleQuickAddCreate}
            className="px-4 py-2 bg-[#1a1a1a] hover:bg-black text-white rounded-lg text-[13px] font-medium transition-colors"
          >
            Create
          </button>
        </div>
      </RightDrawer>

      {/* Edit User Drawer */}
      <RightDrawer isOpen={showEditUser} onClose={() => setShowEditUser(false)} title="Edit User">
        <div className="p-6 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-gray-600">User Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="Enter user name"
              value={editUserForm.userName}
              onChange={(e) => handleEditChange('userName', e.target.value)}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-[13px] text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-gray-600">Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              placeholder="Enter email"
              value={editUserForm.email}
              onChange={(e) => handleEditChange('email', e.target.value)}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-[13px] text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-gray-600">Contact Number <span className="text-red-500">*</span></label>
            <div className="flex gap-2">
              <div className="relative w-[90px] shrink-0">
                <select
                  value={editUserForm.countryCode}
                  onChange={(e) => handleEditChange('countryCode', e.target.value)}
                  className="appearance-none w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] text-gray-600 focus:outline-none focus:border-gray-400 cursor-pointer"
                >
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+971">+971</option>
                </select>
                <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <input
                type="tel"
                placeholder="Enter phone number"
                value={editUserForm.phone}
                onChange={(e) => handleEditChange('phone', e.target.value)}
                className="flex-1 px-3.5 py-2.5 border border-gray-200 rounded-lg text-[13px] text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-gray-600">User Group <span className="text-red-500">*</span></label>
            <div className="relative">
              <select
                value={editUserForm.userGroup}
                onChange={(e) => handleEditChange('userGroup', e.target.value)}
                className="appearance-none w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-[13px] text-gray-600 focus:outline-none focus:border-gray-400 cursor-pointer"
              >
                <option value="">Choose user group</option>
                {USER_GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
              <ChevronDown size={13} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-end gap-2 mt-auto">
          <button
            onClick={() => setShowEditUser(false)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg text-[13px] font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleEditSave}
            className="px-4 py-2 bg-[#1a1a1a] hover:bg-black text-white rounded-lg text-[13px] font-medium transition-colors"
          >
            Save Changes
          </button>
        </div>
      </RightDrawer>
    </div>
  );
};

