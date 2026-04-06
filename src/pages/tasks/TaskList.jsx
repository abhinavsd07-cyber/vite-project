import { useState } from 'react';
import { Search, Filter, MoreVertical, Plus } from 'lucide-react';
import { Pagination } from '../../components/ui/Pagination';
import { useNavigate } from 'react-router-dom';

const MOCK_TASKS = [
  { id: 1, taskId: "9092984", title: "Account Reconciliation and Reporting", customer: "XYZ", category: "-", createdDate: "18/09/2016 9:00AM", completedDate: "18/09/2016 9:00AM" },
  { id: 2, taskId: "5637657", title: "Invoice Generation and Processing", customer: "ABC", category: "-", createdDate: "07/05/2016 12:30PM", completedDate: "07/05/2016 12:30PM" },
  { id: 3, taskId: "5227365", title: "Customer Account Verification", customer: "ERT", category: "General Ledger Accounts", createdDate: "12/06/2020 8:10PM", completedDate: "12/06/2020 8:10PM" },
  { id: 4, taskId: "8466754", title: "Accounts Payable and Receivable Management", customer: "YUI", category: "-", createdDate: "16/08/2013 2:00PM", completedDate: "16/08/2013 2:00PM" },
  { id: 5, taskId: "7632785", title: "Budget Monitoring and Expense Tracking", customer: "IOP", category: "Inventory Accounts", createdDate: "15/08/2017 11:30AM", completedDate: "15/08/2017 11:30AM" },
  { id: 6, taskId: "3562756", title: "Jakub Financial Statement Preparation", customer: "QWE", category: "-", createdDate: "28/10/2012 12:00AM", completedDate: "28/10/2012 12:00AM" },
  { id: 7, taskId: "9003237", title: "Audit Preparation and Compliance Review", customer: "ZXC", category: "Expense Accounts", createdDate: "28/10/2012 1:30PM", completedDate: "28/10/2012 1:30PM" },
  { id: 8, taskId: "6426778", title: "Tax Filing and Documentation", customer: "WER", category: "-", createdDate: "28/10/2012 7:30AM", completedDate: "28/10/2012 7:30AM" },
  { id: 9, taskId: "5262267", title: "Account Data Entry and Maintenance", customer: "YTR", category: "Liability Accounts", createdDate: "16/08/2013 8:15PM", completedDate: "16/08/2013 8:15PM" },
  { id: 10, taskId: "7372572", title: "Cash Flow Analysis and Forecasting", customer: "MNB", category: "-", createdDate: "07/05/2016 9:30PM", completedDate: "07/05/2016 9:30PM" },
];

const TABS = ["ALL", "PENDING", "PROCESSING", "COMPLETED", "VERIFIED", "DELETE REQUESTS"];

export const TaskList = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("VERIFIED");
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filtered = MOCK_TASKS.filter(t =>
    searchTerm === '' ||
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.taskId.includes(searchTerm)
  );
  const paginated = filtered.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="px-6 pt-6 pb-4 shrink-0">
        <h1 className="text-[20px] font-semibold text-gray-800">Task List</h1>
      </div>

      <div className="flex-1 px-6 pb-6 overflow-hidden flex flex-col min-h-0">
        <div className="bg-white rounded-lg border border-gray-200 flex-1 flex flex-col overflow-hidden">

          {/* Tabs + Create button */}
          <div className="px-5 border-b border-gray-100 flex items-center justify-between gap-4">
            <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-4 py-4 text-[12px] font-semibold tracking-wide whitespace-nowrap transition-colors ${
                    activeTab === tab ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-900 rounded-t" />
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={() => navigate('/tasks/create')}
              className="flex items-center gap-2 bg-[#212529] hover:bg-black text-white px-4 py-2 rounded-md text-[13px] font-medium transition-colors shrink-0"
            >
              <Plus size={14} /> Create Task
            </button>
          </div>

          {/* Toolbar */}
          <div className="px-5 py-3 flex items-center gap-2 border-b border-gray-50">
            <div className="relative w-[280px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search task..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-[13px] text-gray-700 focus:outline-none focus:border-gray-300 placeholder:text-gray-400"
              />
            </div>
            <button className="flex items-center justify-center w-9 h-9 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 transition-colors">
              <Filter size={15} />
            </button>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-3.5 px-6 text-[12px] font-semibold text-gray-500 uppercase tracking-wide w-14">SL No</th>
                  <th className="py-3.5 px-6 text-[12px] font-semibold text-gray-500 uppercase tracking-wide">Task ID</th>
                  <th className="py-3.5 px-6 text-[12px] font-semibold text-gray-500 uppercase tracking-wide">Task Title</th>
                  <th className="py-3.5 px-6 text-[12px] font-semibold text-gray-500 uppercase tracking-wide">Customer</th>
                  <th className="py-3.5 px-6 text-[12px] font-semibold text-gray-500 uppercase tracking-wide">Category</th>
                  <th className="py-3.5 px-6 text-[12px] font-semibold text-gray-500 uppercase tracking-wide">Created Date</th>
                  <th className="py-3.5 px-6 text-[12px] font-semibold text-gray-500 uppercase tracking-wide">Completed Date</th>
                  <th className="py-3.5 px-6 text-[12px] font-semibold text-gray-500 uppercase tracking-wide text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((task, i) => (
                  <tr key={task.id} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                    <td className="py-4 px-6 text-[13px] text-gray-500">{(currentPage - 1) * rowsPerPage + i + 1}</td>
                    <td className="py-4 px-6 text-[13px] text-gray-600 whitespace-nowrap">{task.taskId}</td>
                    <td className="py-4 px-6 text-[13px] text-gray-800 max-w-[220px] truncate">{task.title}</td>
                    <td className="py-4 px-6 text-[13px] text-gray-600 whitespace-nowrap">{task.customer}</td>
                    <td className="py-4 px-6 text-[13px] text-gray-600 whitespace-nowrap">{task.category}</td>
                    <td className="py-4 px-6 text-[13px] text-gray-600 whitespace-nowrap">{task.createdDate}</td>
                    <td className="py-4 px-6 text-[13px] text-gray-600 whitespace-nowrap">{task.completedDate}</td>
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
