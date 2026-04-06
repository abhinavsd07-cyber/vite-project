import { useState } from 'react';
import { Search, Filter, MoreVertical } from 'lucide-react';
import { Pagination } from '../../components/ui/Pagination';

const MOCK_ARCHIVED = [
  { id: 1, taskId: "9092984", title: "Account Reconciliation and Reporting", customer: "XYZ", category: "Inventory Accounts", deleteDate: "18/09/2016 9:00AM", requestedBy: "Király Vince", actionCount: 1 },
  { id: 2, taskId: "5637657", title: "Invoice Generation and Processing", customer: "ABC", category: "-", deleteDate: "07/05/2016 12:30PM", requestedBy: "Szabó Jakab", actionCount: 0 },
  { id: 3, taskId: "5227365", title: "Customer Account Verification ....", customer: "ERT", category: "General Ledger Accounts", deleteDate: "12/06/2020 8:10PM", requestedBy: "Orosz Boldizsár", actionCount: 1 },
  { id: 4, taskId: "8466754", title: "Accounts Payable and Receivable M...", customer: "YUI", category: "General Ledger Accounts", deleteDate: "16/08/2013 2:00PM", requestedBy: "Takács Béla", actionCount: 1 },
  { id: 5, taskId: "7632785", title: "Budget Monitoring and Expense Tr...", customer: "IOP", category: "Inventory Accounts", deleteDate: "15/08/2017 11:30AM", requestedBy: "Fekete Csanád", actionCount: 1 },
  { id: 6, taskId: "3562756", title: "Jakub Financial Statement Preparation", customer: "QWE", category: "General Ledger Accounts", deleteDate: "28/10/2012 12:00AM", requestedBy: "Simon Árpád", actionCount: 2 },
  { id: 7, taskId: "9003237", title: "Audit Preparation and Compliance R....", customer: "ZXC", category: "-", deleteDate: "28/10/2012 1:30PM", requestedBy: "Bogdán Norbert", actionCount: 2 },
  { id: 8, taskId: "6426778", title: "Tax Filing and Documentation", customer: "WER", category: "Expense Accounts", deleteDate: "28/10/2012 7:30AM", requestedBy: "Csatár Géza", actionCount: 2 },
  { id: 9, taskId: "5262267", title: "Account Data Entry and Maintenance", customer: "YTR", category: "Liability Accounts", deleteDate: "16/08/2013 8:15PM", requestedBy: "Somogyi Adrián", actionCount: 1 },
  { id: 10, taskId: "7372572", title: "Cash Flow Analysis and Forecasting", customer: "MNB", category: "-", deleteDate: "07/05/2016 9:30PM", requestedBy: "Kovács Lajos", actionCount: 0 },
];

const SortIcon = () => (
  <svg className="w-3 h-3 text-gray-400 opacity-60 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m5 15 7-7 7 7" />
    <path d="m19 9-7 7-7-7" className="translate-y-6" />
  </svg>
);

export const ArchivedTasks = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    return (
        <div className="flex flex-col h-full w-full">
            {/* Main Card */}
            <div className="bg-white rounded-lg border border-gray-200/80  flex-1 flex flex-col overflow-hidden">
                {/* Search & Layout Controls */}
                <div className="px-6 py-5 border-b border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white sticky top-0 z-10">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="relative w-full sm:w-[280px]">
                            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search here..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-[13px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder:text-gray-400 placeholder:font-light shadow-sm"
                            />
                        </div>
                        <button className="flex items-center justify-center w-9 h-9 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-500 shadow-sm">
                            <Filter size={15} />
                        </button>
                    </div>
                </div>

                {/* Table Container */}
                <div className="flex-1 overflow-auto px-6">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100/80">
                                <th className="py-4 px-2 text-[12.5px] font-bold text-gray-600 whitespace-nowrap w-20">SL No</th>
                                <th className="py-4 px-2 text-[12.5px] font-bold text-gray-600 whitespace-nowrap w-32">
                                    <div className="flex items-center">Task ID <SortIcon /></div>
                                </th>
                                <th className="py-4 px-2 text-[12.5px] font-bold text-gray-600 whitespace-nowrap">
                                    <div className="flex items-center justify-between">Title <SortIcon /></div>
                                </th>
                                <th className="py-4 px-2 text-[12.5px] font-bold text-gray-600 whitespace-nowrap w-40">
                                    <div className="flex items-center justify-between">Customer Name <SortIcon /></div>
                                </th>
                                <th className="py-4 px-2 text-[12.5px] font-bold text-gray-600 whitespace-nowrap w-44">
                                    <div className="flex items-center justify-between">Category <SortIcon /></div>
                                </th>
                                <th className="py-4 px-2 text-[12.5px] font-bold text-gray-600 whitespace-nowrap w-48">
                                    <div className="flex items-center justify-between">Delete request date and Time <SortIcon /></div>
                                </th>
                                <th className="py-4 px-2 text-[12.5px] font-bold text-gray-600 whitespace-nowrap w-44">
                                    <div className="flex items-center justify-between">Delete requested by <SortIcon /></div>
                                </th>
                                <th className="py-4 px-2 text-[12.5px] font-bold text-gray-600 whitespace-nowrap text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_ARCHIVED.map((task, index) => (
                                <tr key={task.id} className="border-b border-gray-100/60 transition-colors hover:bg-gray-50/50">
                                    <td className="py-4 px-2 text-[12.5px] text-gray-500 whitespace-nowrap">{index + 1}</td>
                                    <td className="py-4 px-2 text-[12.5px] text-gray-600 font-medium whitespace-nowrap">{task.taskId}</td>
                                    <td className="py-4 px-2 text-[12.5px] text-gray-600 font-medium truncate max-w-[200px] whitespace-nowrap" title={task.title}>{task.title}</td>
                                    <td className="py-4 px-2 text-[12.5px] text-gray-600 truncate max-w-[150px] whitespace-nowrap">{task.customer}</td>
                                    <td className="py-4 px-2 text-[12.5px] text-gray-600 truncate max-w-[150px] whitespace-nowrap">{task.category}</td>
                                    <td className="py-4 px-2 text-[12.5px] text-gray-600 whitespace-nowrap">{task.deleteDate}</td>
                                    <td className="py-4 px-2 text-[12.5px] text-gray-600 whitespace-nowrap">{task.requestedBy}</td>
                                    <td className="py-4 px-2 text-right whitespace-nowrap">
                                        <div className="flex items-center justify-end gap-3 font-medium text-[12.5px] text-gray-600">
                                          {task.actionCount}
                                          <button className="text-gray-300 hover:text-gray-500 p-1">
                                            <MoreVertical size={16} />
                                          </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer / Pagination */}
                <div className="mt-auto border-t border-gray-50 bg-white">
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
