import { useState } from 'react';
import { Search, Filter, MoreVertical, Plus, List, Grid } from 'lucide-react';
import { Pagination } from '../../components/ui/Pagination';
import { useNavigate } from 'react-router-dom';

const MOCK_TASKS = [
  { id: 1, taskId: "9092984", title: "Account Reconciliation and Reporting", customer: "XYZ", category: "-", createdDate: "18/09/2016 9:00AM", completedDate: "18/09/2016 9:00AM" },
  { id: 2, taskId: "5637657", title: "Invoice Generation and Processing", customer: "ABC", category: "-", createdDate: "07/05/2016 12:30PM", completedDate: "07/05/2016 12:30PM" },
  { id: 3, taskId: "5227365", title: "Customer Account Verification ....", customer: "ERT", category: "General Ledger Accounts", createdDate: "12/06/2020 8:10PM", completedDate: "12/06/2020 8:10PM" },
  { id: 4, taskId: "8466754", title: "Accounts Payable and Receivable M...", customer: "YUI", category: "-", createdDate: "16/08/2013 2:00PM", completedDate: "16/08/2013 2:00PM" },
  { id: 5, taskId: "7632785", title: "Budget Monitoring and Expense Tr...", customer: "IOP", category: "Inventory Accounts", createdDate: "15/08/2017 11:30AM", completedDate: "15/08/2017 11:30AM" },
  { id: 6, taskId: "3562756", title: "Jakub Financial Statement Preparation", customer: "QWE", category: "-", createdDate: "28/10/2012 12:00AM", completedDate: "28/10/2012 12:00AM" },
  { id: 7, taskId: "9003237", title: "Audit Preparation and Compliance R....", customer: "ZXC", category: "Expense Accounts", createdDate: "28/10/2012 1:30PM", completedDate: "28/10/2012 1:30PM" },
  { id: 8, taskId: "6426778", title: "Tax Filing and Documentation", customer: "WER", category: "-", createdDate: "28/10/2012 7:30AM", completedDate: "28/10/2012 7:30AM" },
  { id: 9, taskId: "5262267", title: "Account Data Entry and Maintenance", customer: "YTR", category: "Liability Accounts", createdDate: "16/08/2013 8:15PM", completedDate: "16/08/2013 8:15PM" },
  { id: 10, taskId: "7372572", title: "Cash Flow Analysis and Forecasting", customer: "MNB", category: "-", createdDate: "07/05/2016 9:30PM", completedDate: "07/05/2016 9:30PM" },
];

const TABS = ["ALL", "PENDING", "PROCESSING", "COMPLETED", "VERIFIED", "DELETE REQUESTS"];

const SortIcon = () => (
  <svg className="w-3 h-3 text-slate-400 opacity-60 ml-2 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m5 15 7-7 7 7" />
    <path d="m19 9-7 7-7-7" className="translate-y-6" />
  </svg>
);

export const TaskList = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("VERIFIED");
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] w-full p-4 md:p-6 animate-fade-in relative z-10">
      
      {/* Main Card */}
      <div className="bg-white rounded-[14px] border border-slate-200/80 shadow-[0_1px_5px_rgba(0,0,0,0.02)] flex-1 flex flex-col overflow-hidden">
        
        {/* Header Tabs & Create Button */}
        <div className="px-6 pt-6 pb-2 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-100/60">
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar w-full md:w-auto">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-[12px] font-bold tracking-wider transition-all relative whitespace-nowrap ${
                  activeTab === tab ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-slate-900 rounded-t-full" />
                )}
              </button>
            ))}
          </div>

          <button 
            onClick={() => navigate('/tasks/create')}
            className="flex items-center gap-2 bg-[#212529] hover:bg-black text-white px-5 py-2 rounded-lg text-[13px] font-medium transition-colors shrink-0 shadow-sm"
          >
            <Plus size={14} />
            Create task
          </button>
        </div>

        {/* Search & Layout Controls */}
        <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
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

          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-slate-600 border border-slate-100 rounded-md bg-slate-50/50 transition-colors">
              <List size={18} />
            </button>
            <button className="p-2 text-slate-300 hover:text-slate-500 transition-colors">
              <Grid size={18} className="opacity-60" />
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="flex-1 overflow-auto px-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-y border-slate-100/80 bg-slate-50/30">
                <th className="py-4 px-2 text-[12.5px] font-bold text-slate-700 whitespace-nowrap w-16">SL No</th>
                <th className="py-4 px-2 text-[12.5px] font-bold text-slate-700 whitespace-nowrap w-28">
                  <div className="flex items-center">Task ID <SortIcon /></div>
                </th>
                <th className="py-4 px-2 text-[12.5px] font-bold text-slate-700 whitespace-nowrap">
                  <div className="flex items-center">Title</div>
                </th>
                <th className="py-4 px-2 text-[12.5px] font-bold text-slate-700 whitespace-nowrap w-40">
                  <div className="flex items-center">Customer Name <SortIcon /></div>
                </th>
                <th className="py-4 px-2 text-[12.5px] font-bold text-slate-700 whitespace-nowrap w-44">
                  <div className="flex items-center">Category <SortIcon /></div>
                </th>
                <th className="py-4 px-2 text-[12.5px] font-bold text-slate-700 whitespace-nowrap w-44">
                  <div className="flex items-center">Created Date and Time <SortIcon /></div>
                </th>
                <th className="py-4 px-2 text-[12.5px] font-bold text-slate-700 whitespace-nowrap w-44">
                  <div className="flex items-center">Completed Date <SortIcon /></div>
                </th>
                <th className="py-4 px-2 text-[12.5px] font-bold text-slate-800 whitespace-nowrap text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_TASKS.map((task, index) => (
                <tr key={task.id} className="border-b border-slate-100/60 transition-colors bg-white hover:bg-slate-50/50 group">
                  <td className="py-5 px-2 text-[12.5px] text-slate-500 whitespace-nowrap">{index + 1}</td>
                  <td className="py-5 px-2 text-[12.5px] text-slate-600 font-medium whitespace-nowrap">{task.taskId}</td>
                  <td className="py-5 px-2 text-[12.5px] text-slate-600 font-medium whitespace-nowrap truncate max-w-[200px]" title={task.title}>{task.title}</td>
                  <td className="py-5 px-2 text-[12.5px] text-slate-600 whitespace-nowrap">{task.customer}</td>
                  <td className="py-5 px-2 text-[12.5px] text-slate-600 whitespace-nowrap">{task.category}</td>
                  <td className="py-5 px-2 text-[12.5px] text-slate-600 whitespace-nowrap">{task.createdDate}</td>
                  <td className="py-5 px-2 text-[12.5px] text-slate-600 whitespace-nowrap">{task.completedDate}</td>
                  <td className="py-5 px-2 flex justify-end">
                    <button className="text-slate-300 hover:text-slate-500 transition-colors p-1">
                      <MoreVertical size={16} strokeWidth={2.5} />
                    </button>
                    {task.id === 2 && (
                      <button className="ml-2 text-[#ec6e5a] hover:text-red-600 transition-colors p-1">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6" />
                        </svg>
                      </button>
                    )}
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
