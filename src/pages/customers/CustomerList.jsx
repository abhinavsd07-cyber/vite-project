import { useState, useEffect } from 'react';
import { Search, Filter, Plus, MoreVertical, X, ChevronDown } from 'lucide-react';
import { Toggle } from '../../components/ui/Toggle';
import { Pagination } from '../../components/ui/Pagination';
import { getCustomersAPI } from '../../services/allApis';

const MOCK_CUSTOMERS = [
  { id: 1, name: "Aabasoft customer", email: "sanjay.jayan@aabasoft.com", phone: "+91 9874651111", company: "4", date: "25/04/2025", active: true },
  { id: 2, name: "aabasofttest", email: "aabasofttest@yopmail.com", phone: "+91 1234567890", company: "0", date: "29/10/2025", active: true },
  { id: 3, name: "Alen T Jose", email: "alentjose@finbookglobal.com", phone: "+91 9400104307", company: "0", date: "28/10/2025", active: true },
  { id: 4, name: "Allen Jose", email: "allenjose99a@gmail.com", phone: "+91 08971738660", company: "4", date: "28/04/2025", active: true },
  { id: 5, name: "Allen jose", email: "allenjoseca@gmail.com", phone: "+91 08971738660", company: "0", date: "05/05/2025", active: false },
  { id: 6, name: "Customer 1", email: "customer1@gmail.com", phone: "+91 1234567890", company: "1", date: "23/01/2026", active: true },
  { id: 7, name: "Dane Kurian", email: "dane@senecavalleyproperties.com", phone: "+1 6033388055", company: "0", date: "07/06/2025", active: true },
  { id: 8, name: "Emil", email: "emileby16@gmail.com", phone: "+44 7388571676", company: "1", date: "21/01/2026", active: true },
  { id: 9, name: "Finbook User", email: "finbookuser@yopmail.com", phone: "+91 8138080143", company: "1", date: "24/04/2025", active: true },
  { id: 10, name: "George James", email: "dipinjames@gmail.com", phone: "+44 7411389177", company: "1", date: "08/01/2026", active: true },
];

export const CustomerList = () => {
  const [customers, setCustomers] = useState(MOCK_CUSTOMERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showFilter, setShowFilter] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [appliedStatus, setAppliedStatus] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await getCustomersAPI();
        if (res?.statusCode === "SB000" && res.data) {
          setCustomers(Array.isArray(res.data) ? res.data : (res.data.data || res.data));
        } else if (res && Array.isArray(res)) {
          setCustomers(res);
        }
      } catch (err) { /* use mock */ }
    };
    fetchCustomers();
  }, []);

  const handleToggle = (id, newState) => setCustomers(customers.map(c => c.id === id ? { ...c, active: newState } : c));

  const filtered = customers.filter(c => {
    const matchesSearch = searchTerm === '' ||
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !appliedStatus ||
      (appliedStatus === 'Active' ? c.active : !c.active);
    return matchesSearch && matchesStatus;
  });
  const paginated = filtered.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="px-6 pt-6 pb-4 shrink-0">
        <h1 className="text-[20px] font-semibold text-gray-800">Customer List</h1>
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
                  placeholder="Search customer..."
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-[13px] text-gray-700 focus:outline-none focus:border-gray-300 placeholder:text-gray-400"
                />
              </div>
              <button
                onClick={() => setShowFilter(!showFilter)}
                className={`flex items-center justify-center w-9 h-9 shrink-0 border rounded-lg transition-colors ${showFilter ? 'border-gray-400 text-gray-700 bg-gray-50' : 'border-gray-200 text-gray-400 hover:bg-gray-50'}`}
              >
                {showFilter ? <X size={15} /> : <Filter size={15} />}
              </button>
            </div>
            <button className="flex items-center gap-2 bg-[#212529] hover:bg-black text-white px-4 py-2 rounded-md text-[13px] font-medium transition-colors shrink-0 w-full sm:w-auto justify-center">
              <Plus size={14} /> Add Customer
            </button>
          </div>

          {/* Filter Panel */}
          {showFilter && (
            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50 animate-slide-down">
              <div className="flex flex-col sm:flex-row items-end gap-3">
                <div className="flex flex-col gap-1.5 w-full sm:w-[200px]">
                  <label className="text-[12px] font-medium text-gray-400 uppercase tracking-wide">Status</label>
                  <div className="relative">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="appearance-none w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-[13px] text-gray-600 focus:outline-none cursor-pointer"
                    >
                      <option value="">All Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                    <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    onClick={() => { setFilterStatus(''); setAppliedStatus(''); }}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-lg text-[13px] font-medium transition-colors"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => { setAppliedStatus(filterStatus); setCurrentPage(1); }}
                    className="px-4 py-2 bg-[#212529] hover:bg-black text-white rounded-lg text-[13px] font-medium transition-colors"
                  >
                    Apply
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
                  <th className="py-3.5 px-6 text-[12px] font-semibold text-gray-500 uppercase tracking-wide w-14">SL No</th>
                  <th className="py-3.5 px-6 text-[12px] font-semibold text-gray-500 uppercase tracking-wide">Customer Name</th>
                  <th className="py-3.5 px-6 text-[12px] font-semibold text-gray-500 uppercase tracking-wide">Email</th>
                  <th className="py-3.5 px-6 text-[12px] font-semibold text-gray-500 uppercase tracking-wide">Phone</th>
                  <th className="py-3.5 px-6 text-[12px] font-semibold text-gray-500 uppercase tracking-wide">Companies</th>
                  <th className="py-3.5 px-6 text-[12px] font-semibold text-gray-500 uppercase tracking-wide">Created Date</th>
                  <th className="py-3.5 px-6 text-[12px] font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                  <th className="py-3.5 px-6 text-[12px] font-semibold text-gray-500 uppercase tracking-wide text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((c, i) => (
                  <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                    <td className="py-4 px-6 text-[13px] text-gray-500">{(currentPage - 1) * rowsPerPage + i + 1}</td>
                    <td className="py-4 px-6 text-[13px] text-gray-800 whitespace-nowrap">{c.name}</td>
                    <td className="py-4 px-6 text-[13px] text-gray-600 whitespace-nowrap">{c.email}</td>
                    <td className="py-4 px-6 text-[13px] text-gray-600 whitespace-nowrap">{c.phone}</td>
                    <td className="py-4 px-6 text-[13px] text-gray-600 whitespace-nowrap">{c.company}</td>
                    <td className="py-4 px-6 text-[13px] text-gray-600 whitespace-nowrap">{c.date}</td>
                    <td className="py-4 px-6">
                      <Toggle checked={c.active} onChange={(v) => handleToggle(c.id, v)} />
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="text-gray-300 hover:text-gray-500 p-1 rounded">
                        <MoreVertical size={17} strokeWidth={2} />
                      </button>
                    </td>
                  </tr>
                ))}
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
