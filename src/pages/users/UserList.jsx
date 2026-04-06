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
    return matchesSearch && matchesGroup;
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

  const handleEdit = (user) => { setActiveActionMenu(null); Toast.fire({ icon: 'info', title: `Edit: ${user.name}` }); };
  const handleResend = (user) => { setActiveActionMenu(null); Toast.fire({ icon: 'success', title: `Credentials resent to ${user.email}` }); };

  return (
    <div className="flex flex-col h-full w-full">

      {/* Page Title */}
      <div className="px-6 pt-6 pb-4 shrink-0">
        <h1 className="text-[20px] font-semibold text-gray-800">User List</h1>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-6 overflow-hidden flex flex-col min-h-0">
        <div className="bg-white rounded-lg border border-gray-200 flex-1 flex flex-col overflow-hidden">

          {/* Toolbar */}
          <div className="px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-gray-100">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {/* Search */}
              <div className="relative flex-1 sm:w-[300px]">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search User..."
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-[13px] text-gray-700 focus:outline-none focus:border-gray-300 placeholder:text-gray-400 bg-white"
                />
              </div>
              {/* Filter toggle */}
              <button
                onClick={() => setShowFilter(!showFilter)}
                className={`flex items-center justify-center w-9 h-9 shrink-0 border rounded-lg transition-colors ${showFilter ? 'border-gray-400 text-gray-700 bg-gray-50' : 'border-gray-200 text-gray-400 hover:bg-gray-50'}`}
              >
                {showFilter ? <X size={15} /> : <Filter size={15} />}
              </button>
            </div>

            {/* Quick Add */}
            <button
              onClick={() => setShowQuickAdd(true)}
              className="flex items-center gap-2 bg-[#212529] hover:bg-black text-white px-4 py-2 rounded-md text-[13px] font-medium transition-colors shrink-0 w-full sm:w-auto justify-center"
            >
              <Plus size={14} />
              Quick Add
            </button>
          </div>

          {/* Filter Panel */}
          {showFilter && (
            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50 animate-slide-down">
              <div className="flex flex-col sm:flex-row items-end gap-3">
                <div className="flex flex-col gap-1.5 w-full sm:w-[200px]">
                  <label className="text-[12px] font-medium text-gray-400 uppercase tracking-wide">User Group</label>
                  <div className="relative">
                    <select
                      value={filterUserGroup}
                      onChange={(e) => setFilterUserGroup(e.target.value)}
                      className="appearance-none w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-[13px] text-gray-600 focus:outline-none cursor-pointer"
                    >
                      <option value="">Select User Group</option>
                      {USER_GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                    <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 w-full sm:w-[200px]">
                  <label className="text-[12px] font-medium text-gray-400 uppercase tracking-wide">Status</label>
                  <div className="relative">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="appearance-none w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-[13px] text-gray-600 focus:outline-none cursor-pointer"
                    >
                      <option value="">Select Status</option>
                      {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    onClick={() => { setFilterUserGroup(''); setFilterStatus(''); setAppliedFilters({ userGroup: '', status: '' }); }}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-lg text-[13px] font-medium transition-colors"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => { setAppliedFilters({ userGroup: filterUserGroup, status: filterStatus }); setCurrentPage(1); }}
                    className="px-4 py-2 bg-[#212529] hover:bg-black text-white rounded-lg text-[13px] font-medium transition-colors"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-3.5 px-6 text-[12px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap w-16">SL No</th>
                  <th className="py-3.5 px-6 text-[12px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">User name</th>
                  <th className="py-3.5 px-6 text-[12px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">Email</th>
                  <th className="py-3.5 px-6 text-[12px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">Contact Number</th>
                  <th className="py-3.5 px-6 text-[12px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">User Group</th>
                  <th className="py-3.5 px-6 text-[12px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.length > 0 ? (
                  paginatedUsers.map((user, index) => (
                    <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                      <td className="py-4 px-6 text-[13px] text-gray-500 whitespace-nowrap">
                        {(currentPage - 1) * rowsPerPage + index + 1}
                      </td>
                      <td className="py-4 px-6 text-[13px] text-gray-800 whitespace-nowrap">{user.name}</td>
                      <td className="py-4 px-6 text-[13px] text-gray-600 whitespace-nowrap">{user.email}</td>
                      <td className="py-4 px-6 text-[13px] text-gray-600 whitespace-nowrap">{user.phone}</td>
                      <td className="py-4 px-6 text-[13px] text-gray-600 whitespace-nowrap">{user.group}</td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="flex justify-end relative">
                          <button
                            onClick={() => setActiveActionMenu(activeActionMenu === user.id ? null : user.id)}
                            className="text-gray-300 hover:text-gray-500 transition-colors p-1 rounded"
                          >
                            <MoreVertical size={17} strokeWidth={2} />
                          </button>
                          {activeActionMenu === user.id && (
                            <div
                              ref={actionMenuRef}
                              className="absolute right-0 top-full mt-1 w-[180px] bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50"
                            >
                              <button
                                onClick={() => handleEdit(user)}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-gray-600 hover:bg-gray-50 transition-colors"
                              >
                                <Edit2 size={13} className="text-gray-400" /> Edit
                              </button>
                              <button
                                onClick={() => handleResend(user)}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-gray-600 hover:bg-gray-50 transition-colors"
                              >
                                <Send size={13} className="text-gray-400" /> Resend Credentials
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-16 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                          <Search size={20} className="text-gray-300" />
                        </div>
                        <p className="text-[13px] text-gray-400">No users found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredUsers.length / rowsPerPage) || 1}
            totalEntries={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            onPageChange={setCurrentPage}
            onRowsChange={(n) => { setRowsPerPage(n); setCurrentPage(1); }}
          />
        </div>
      </div>

      {/* Quick Add Drawer */}
      <RightDrawer isOpen={showQuickAdd} onClose={() => setShowQuickAdd(false)} title="Add User">
        <div className="p-6 flex flex-col gap-5">
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
            className="px-4 py-2 bg-[#212529] hover:bg-black text-white rounded-lg text-[13px] font-medium transition-colors"
          >
            Create
          </button>
        </div>
      </RightDrawer>
    </div>
  );
};
