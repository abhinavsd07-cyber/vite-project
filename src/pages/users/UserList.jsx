import { useState, useRef, useEffect } from 'react';
import { Search, Filter, MoreVertical, Plus, X, ChevronDown, Edit2, Send } from 'lucide-react';
import { Pagination } from '../../components/ui/Pagination';
import { RightDrawer } from '../../components/ui/RightDrawer';
import { Toast } from '../../lib/utils';

const MOCK_USERS = [
  { id: 1, name: "Aabasoft Testddd", email: "nithinmathew@aabasoft.com", phone: "+91 8138080143", group: "Super Admin" },
  { id: 2, name: "aabasofttest", email: "aabasofttest@yopmail.com", phone: "+91 0123456789", group: "Super Admin" },
  { id: 3, name: "Alen T Jose", email: "alentjose@finbookglobal.com", phone: "+91 9400104307", group: "Super Admin" },
  { id: 4, name: "Allen (Admin)a", email: "allenjose@finbookglobal.com", phone: "+91 8971738660", group: "Super Admin" },
  { id: 5, name: "Allen (Maker)", email: "allenjose99a@gmail.com", phone: "+91 8971738660", group: "Maker" },
  { id: 6, name: "Allen Checker", email: "allenjosechecker@gmail.com", phone: "+91 8971738660", group: "Checker" },
  { id: 7, name: "George (Checker)", email: "georgeabrchecker@gmail.com", phone: "+91 8547121715", group: "Checker" },
  { id: 8, name: "George (maker)", email: "georgeabrmaker@gmail.com", phone: "+91 8547121715", group: "Maker" },
  { id: 9, name: "Nithin Mathew", email: "nithin@finbookglobal.com", phone: "+91 9876543210", group: "Super Admin" },
  { id: 10, name: "Rahul Dev", email: "rahul.dev@gmail.com", phone: "+91 7890123456", group: "Maker" },
];

const USER_GROUPS = ["Super Admin", "Maker", "Checker", "Admin"];
const STATUS_OPTIONS = ["Active", "Inactive", "Invited"];

const SortIcon = () => (
  <svg width="12" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
    <path d="M9 18V6l-3 4" />
    <path d="M15 6v12l3-4" />
  </svg>
);

export const UserList = () => {
  const [users] = useState(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filter panel state
  const [showFilter, setShowFilter] = useState(false);
  const [filterUserGroup, setFilterUserGroup] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [appliedFilters, setAppliedFilters] = useState({ userGroup: '', status: '' });

  // Quick Add drawer state
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [quickAddForm, setQuickAddForm] = useState({
    userName: '',
    email: '',
    countryCode: 'Code',
    phone: '',
    userGroup: '',
  });

  // Action menu state
  const [activeActionMenu, setActiveActionMenu] = useState(null);
  const actionMenuRef = useRef(null);

  // Close action menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(e.target)) {
        setActiveActionMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ─── Filter Logic ─────────────────────────────────────────────────────────────
  const filteredUsers = users.filter((user) => {
    // Search filter (real-time)
    const matchesSearch = searchTerm === '' || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.group.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Applied filter (on Search button click)
    const matchesGroup = !appliedFilters.userGroup || user.group === appliedFilters.userGroup;
    
    return matchesSearch && matchesGroup;
  });

  // ─── Filter Panel Handlers ──────────────────────────────────────────────────
  const handleFilterToggle = () => {
    setShowFilter(!showFilter);
  };

  const handleFilterSearch = () => {
    setAppliedFilters({ userGroup: filterUserGroup, status: filterStatus });
  };

  const handleFilterClear = () => {
    setFilterUserGroup('');
    setFilterStatus('');
    setAppliedFilters({ userGroup: '', status: '' });
  };

  // ─── Quick Add Handlers ──────────────────────────────────────────────────────
  const handleQuickAddChange = (field, value) => {
    setQuickAddForm(prev => ({ ...prev, [field]: value }));
  };

  const handleQuickAddClear = () => {
    setQuickAddForm({ userName: '', email: '', countryCode: 'Code', phone: '', userGroup: '' });
  };

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
    Toast.fire({ icon: 'success', title: 'User saved! Redirecting to allocate...' });
    handleQuickAddClear();
    setShowQuickAdd(false);
  };

  // ─── Action Menu Handlers ──────────────────────────────────────────────────
  const handleEdit = (user) => {
    setActiveActionMenu(null);
    Toast.fire({ icon: 'info', title: `Edit user: ${user.name}` });
  };

  const handleResendCredentials = (user) => {
    setActiveActionMenu(null);
    Toast.fire({ icon: 'success', title: `Credentials resent to ${user.email}` });
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
           {/* Left Controls (Separate Search and Filter) */}
           <div className="flex items-center gap-3 w-full sm:w-[360px]">
              <div className="relative flex-1">
                 <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                 <input
                    type="text"
                    placeholder="Search User..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-[13px] text-slate-700 focus:outline-none placeholder:text-slate-400 shadow-sm transition-all"
                 />
              </div>
              <button 
                onClick={handleFilterToggle}
                className={`flex items-center justify-center w-[38px] h-[38px] border shrink-0 rounded-lg transition-colors shadow-sm bg-white ${showFilter ? 'border-slate-300 text-slate-800' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
              >
                 {showFilter ? <X size={16} /> : <Filter size={16} />}
              </button>
           </div>

           {/* Right Control: Quick Add */}
           <button 
             onClick={() => setShowQuickAdd(true)}
             className="flex items-center gap-2 bg-[#212529] hover:bg-black text-white px-5 py-2.5 rounded text-[13px] font-medium transition-colors md:ml-auto w-full sm:w-auto justify-center shadow-sm"
           >
              <Plus size={14} />
              Quick Add
           </button>
        </div>

        {/* ─── Filter Panel (toggled) ─────────────────────────────────────── */}
        {showFilter && (
          <div className="px-4 pb-4 animate-slide-down">
            <div className="bg-[#f8f9fb] rounded-lg border border-slate-100 p-4 flex flex-col sm:flex-row items-end gap-4">
              {/* User Group Dropdown */}
              <div className="flex flex-col gap-1.5 w-full sm:w-[220px]">
                <label className="text-[12px] font-medium text-slate-400">User Group</label>
                <div className="relative">
                  <select
                    value={filterUserGroup}
                    onChange={(e) => setFilterUserGroup(e.target.value)}
                    className="appearance-none w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-[13px] focus:outline-none text-slate-500 shadow-sm cursor-pointer"
                  >
                    <option value="">Select User Group</option>
                    {USER_GROUPS.map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Status Dropdown */}
              <div className="flex flex-col gap-1.5 w-full sm:w-[220px]">
                <label className="text-[12px] font-medium text-slate-400">Status</label>
                <div className="relative">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="appearance-none w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-[13px] focus:outline-none text-slate-500 shadow-sm cursor-pointer"
                  >
                    <option value="">Select Status</option>
                    {STATUS_OPTIONS.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Clear & Search Buttons */}
              <div className="flex items-center gap-2.5 ml-auto">
                <button 
                  onClick={handleFilterClear}
                  className="px-5 py-2.5 bg-[#e2e4e7] hover:bg-slate-300 text-slate-600 rounded-lg text-[13px] font-medium transition-colors shadow-sm"
                >
                  Clear
                </button>
                <button 
                  onClick={handleFilterSearch}
                  className="px-5 py-2.5 bg-[#212529] hover:bg-black text-white rounded-lg text-[13px] font-medium transition-colors shadow-sm"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Table Container */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead>
               <tr className="border-y border-slate-200 bg-white">
                 <th className="py-4 px-6 text-[13px] font-semibold text-slate-600 whitespace-nowrap w-20">SL No</th>
                 <th className="py-4 px-6 text-[13px] font-semibold text-slate-600 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 cursor-pointer hover:text-slate-800">User name <SortIcon /></div>
                 </th>
                 <th className="py-4 px-6 text-[13px] font-semibold text-slate-600 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 cursor-pointer hover:text-slate-800">Email <SortIcon /></div>
                 </th>
                 <th className="py-4 px-6 text-[13px] font-semibold text-slate-600 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 cursor-pointer hover:text-slate-800">Contact Number <SortIcon /></div>
                 </th>
                 <th className="py-4 px-6 text-[13px] font-semibold text-slate-600 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 cursor-pointer hover:text-slate-800">User Group <SortIcon /></div>
                 </th>
                 <th className="py-4 px-6 text-[13px] font-semibold text-slate-600 whitespace-nowrap text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr key={user.id} className="border-b border-slate-100 transition-colors bg-white even:bg-[#fafafa] hover:bg-slate-50">
                     <td className="py-4 px-6 text-[13px] text-slate-600 whitespace-nowrap">{index + 1}</td>
                     <td className="py-4 px-6 text-[13px] text-slate-800 font-medium whitespace-nowrap">{user.name}</td>
                     <td className="py-4 px-6 text-[13px] text-slate-600 whitespace-nowrap">{user.email}</td>
                     <td className="py-4 px-6 text-[13px] text-slate-600 whitespace-nowrap">{user.phone}</td>
                     <td className="py-4 px-6 text-[13px] text-slate-600 whitespace-nowrap">{user.group}</td>
                     <td className="py-4 px-6 relative">
                        <div className="flex justify-end">
                          <button 
                            onClick={() => setActiveActionMenu(activeActionMenu === user.id ? null : user.id)}
                            className="text-slate-300 hover:text-slate-500 transition-colors p-1"
                          >
                             <MoreVertical size={18} strokeWidth={2.5} />
                          </button>
                        </div>

                        {/* Action Dropdown Menu */}
                        {activeActionMenu === user.id && (
                          <div 
                            ref={actionMenuRef}
                            className="absolute right-4 top-full mt-1 w-[190px] bg-white rounded-lg shadow-lg border border-slate-100 py-1.5 z-50 animate-fade-in"
                          >
                            <button
                              onClick={() => handleEdit(user)}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-slate-600 hover:bg-slate-50 transition-colors"
                            >
                              <Edit2 size={14} className="text-slate-400" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleResendCredentials(user)}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-slate-600 hover:bg-slate-50 transition-colors"
                            >
                              <Send size={14} className="text-slate-400" />
                              Resend Credentials
                            </button>
                          </div>
                        )}
                     </td>
                   </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[13px] text-slate-400">
                    No users found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-auto shrink-0 w-full bg-white border-t border-slate-100">
           <Pagination 
              currentPage={currentPage}
              totalPages={Math.ceil(filteredUsers.length / rowsPerPage) || 1}
              totalEntries={filteredUsers.length}
              rowsPerPage={rowsPerPage}
              onPageChange={setCurrentPage}
              onRowsChange={setRowsPerPage}
           />
        </div>
      </div>
      </div>

      {/* ─── Quick Add Drawer ────────────────────────────────────────────── */}
      <RightDrawer
        isOpen={showQuickAdd}
        onClose={() => setShowQuickAdd(false)}
        title="Add User"
      >
        <div className="p-6 pt-2 flex flex-col gap-6">
          {/* User Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-500">
              User Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter User name"
              value={quickAddForm.userName}
              onChange={(e) => handleQuickAddChange('userName', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 text-[14px] placeholder:text-slate-300 transition-colors"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-500">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter email"
              value={quickAddForm.email}
              onChange={(e) => handleQuickAddChange('email', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 text-[14px] placeholder:text-slate-300 transition-colors"
            />
          </div>

          {/* Contact Number */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-500">
              Contact Number <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3 w-full">
              <div className="relative w-[110px] flex-shrink-0">
                <select 
                  value={quickAddForm.countryCode}
                  onChange={(e) => handleQuickAddChange('countryCode', e.target.value)}
                  className="appearance-none w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 text-[14px] text-slate-500 transition-colors cursor-pointer"
                >
                  <option>Code</option>
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+971">+971</option>
                </select>
                <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
              <input
                type="tel"
                placeholder="Enter phone number"
                value={quickAddForm.phone}
                onChange={(e) => handleQuickAddChange('phone', e.target.value)}
                className="flex-1 min-w-0 px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 text-[14px] placeholder:text-slate-300 transition-colors"
              />
            </div>
          </div>

          {/* User Group */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-500">
              User Group <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={quickAddForm.userGroup}
                onChange={(e) => handleQuickAddChange('userGroup', e.target.value)}
                className="appearance-none w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 text-[14px] text-slate-500 transition-colors cursor-pointer"
              >
                <option value="">Choose user group</option>
                {USER_GROUPS.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Drawer Footer Buttons */}
        <div className="mt-auto border-t border-slate-100 px-6 py-4 flex items-center justify-end gap-3">
          <button
            onClick={handleQuickAddClear}
            className="px-6 py-2.5 bg-[#e2e4e7] hover:bg-slate-300 text-slate-600 rounded-lg text-[13px] font-medium transition-colors shadow-sm"
          >
            Clear
          </button>
          <button
            onClick={handleSaveAndAllocate}
            className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-[13px] font-medium transition-colors shadow-sm"
          >
            Save & allocate
          </button>
          <button
            onClick={handleQuickAddCreate}
            className="px-6 py-2.5 bg-[#212529] hover:bg-black text-white rounded-lg text-[13px] font-medium transition-colors shadow-sm"
          >
            Create
          </button>
        </div>
      </RightDrawer>
    </div>
  );
};
