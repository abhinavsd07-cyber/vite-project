import { useState } from 'react';
import { Search, Filter, MoreVertical, Plus, Upload, ChevronDown } from 'lucide-react';
import { Pagination } from '../../components/ui/Pagination';

const MOCK_TASKS = [
  { id: 1, taskId: "9092984", title: "Account Reconciliation and Reporting", user: "Annette Black", status: "Processing", customer: "XYZ", category: "Inventory Accounts", date: "18/09/2016 9:00AM" },
  { id: 2, taskId: "5637657", title: "Invoice Generation and Processing", user: "-", status: "Unallocated", customer: "ABC", category: "-", date: "07/05/2016 12:30PM" },
  { id: 3, taskId: "5227365", title: "Customer Account Verification ....", user: "Dianne Russell", status: "Completed", customer: "ERT", category: "General Ledger Accounts", date: "12/06/2020 8:10PM" },
  { id: 4, taskId: "8466754", title: "Accounts Payable and Receivable M...", user: "Darrell Steward", status: "Completed", customer: "YUI", category: "General Ledger Accounts", date: "16/08/2013 2:00PM" },
  { id: 5, taskId: "7632785", title: "Budget Monitoring and Expense Tr...", user: "Dianne Russell", status: "Pending", customer: "IOP", category: "Inventory Accounts", date: "15/08/2017 11:30AM" },
  { id: 6, taskId: "3562756", title: "Jakub Financial Statement Preparation", user: "Annette Black", status: "Completed", customer: "QWE", category: "General Ledger Accounts", date: "28/10/2012 12:00AM" },
  { id: 7, taskId: "9003237", title: "Audit Preparation and Compliance R....", user: "-", status: "Unallocated", customer: "ZXC", category: "-", date: "28/10/2012 1:30PM" },
  { id: 8, taskId: "6426778", title: "Tax Filing and Documentation", user: "Dianne Russell", status: "Processing", customer: "WER", category: "Expense Accounts", date: "28/10/2012 7:30AM" },
  { id: 9, taskId: "5262267", title: "Account Data Entry and Maintenance", user: "Arlene McCoy", status: "Completed", customer: "YTR", category: "Liability Accounts", date: "16/08/2013 8:15PM" },
  { id: 10, taskId: "7372572", title: "Cash Flow Analysis and Forecasting", user: "-", status: "Unallocated", customer: "MNB", category: "-", date: "07/05/2016 9:30PM" },
];

const StatusBadge = ({ status }) => {
  switch (status) {
    case 'Processing':
      return <div className="px-3 py-1 rounded bg-[#eef5fd] text-[#6cb0eb] text-[11px] font-bold text-center border border-[#e1ebf5] w-24 tracking-wide mt-1">Processing</div>;
    case 'Completed':
      return <div className="px-3 py-1 rounded bg-[#eefcf2] text-[#4cd988] text-[11px] font-bold text-center border border-[#e2efe7] w-24 tracking-wide mt-1">Completed</div>;
    case 'Pending':
      return <div className="px-3 py-1 rounded bg-[#fff3eb] text-[#f7a561] text-[11px] font-bold text-center border border-[#f5ede5] w-24 tracking-wide mt-1">Pending</div>;
    case 'Unallocated':
      return <div className="px-3 py-1 rounded bg-[#ffefef] text-[#ec6e5a] text-[11px] font-bold text-center border border-[#fbe6e3] w-24 tracking-wide mt-1">Unallocated</div>;
    default:
      return null;
  }
};

const SortIcon = () => (
  <svg className="w-3 h-3 text-gray-400 opacity-60 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m5 15 7-7 7 7" />
    <path d="m19 9-7 7-7-7" className="translate-y-6" />
  </svg>
);

export const CreateTask = () => {
    const [activeUploadTab, setActiveUploadTab] = useState("SINGLE FILE UPLOAD");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    return (
        <div className="flex flex-col h-full w-full p-4 md:p-6 overflow-auto">
            {/* Form Section Card */}
            <div className="bg-white rounded-lg border border-gray-200/80  mb-6 overflow-hidden">
                {/* Header Tabs */}
                <div className="px-6 pt-6 pb-2 border-b border-gray-100/60">
                    <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
                        {["SINGLE FILE UPLOAD", "MULTI FILE UPLOAD"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveUploadTab(tab)}
                                className={`pb-4 text-[12px] font-bold tracking-wider transition-all relative whitespace-nowrap ${
                                    activeUploadTab === tab ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
                                }`}
                            >
                                {tab}
                                {activeUploadTab === tab && (
                                    <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gray-900 rounded-t-full" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Form Content */}
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        {/* Title */}
                        <div>
                            <label className="block text-[12px] font-medium text-gray-400 mb-2 uppercase tracking-wide">Title</label>
                            <input 
                                type="text" 
                                placeholder="Enter title"
                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[13.5px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder:text-gray-300 transition-all font-light"
                            />
                        </div>

                        {/* Reference Number */}
                        <div>
                            <label className="block text-[12px] font-medium text-gray-400 mb-2 uppercase tracking-wide">Reference Number</label>
                            <input 
                                type="text" 
                                placeholder="Enter reference number"
                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[13.5px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder:text-gray-300 transition-all font-light"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-[12px] font-medium text-gray-400 mb-2 uppercase tracking-wide">Category</label>
                            <div className="relative">
                                <select className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[13.5px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 transition-all font-light appearance-none">
                                    <option>Choose Category</option>
                                    <option>General Ledger Accounts</option>
                                    <option>Inventory Accounts</option>
                                </select>
                                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Customer */}
                        <div>
                            <label className="block text-[12px] font-medium text-gray-400 mb-2 uppercase tracking-wide">Customer</label>
                            <div className="relative">
                                <select className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[13.5px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 transition-all font-light appearance-none">
                                    <option>CargoMasters Logistics Pvt. Ltd.</option>
                                </select>
                                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Remarks - Row Span 2 on Desktop */}
                        <div className="md:row-span-2">
                            <label className="block text-[12px] font-medium text-gray-400 mb-2 uppercase tracking-wide">Remarks</label>
                            <textarea 
                                placeholder="Enter remarks"
                                rows={6}
                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[13.5px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder:text-gray-300 transition-all font-light resize-none h-[115px]"
                            ></textarea>
                        </div>

                        {/* Document Upload */}
                        <div className="md:row-span-2">
                            <label className="block text-[12px] font-medium text-gray-400 mb-2 uppercase tracking-wide flex items-center">
                                Document Upload <span className="text-red-500 ml-1 mt-1">*</span>
                            </label>
                            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 flex flex-col items-center justify-center bg-gray-50/10 cursor-pointer hover:bg-gray-50 transition-colors h-[115px]">
                                <div className="bg-gray-50/50 p-2 rounded-lg mb-2">
                                    <Upload size={20} className="text-gray-400" />
                                </div>
                                <p className="text-[12.5px] text-gray-500 text-center font-medium">Drop files here from your device or click to upload</p>
                                <p className="text-[11px] text-gray-400 text-center mt-1">( Support format .CSV, .XLSX; max file size 5 MB )</p>
                            </div>
                        </div>

                        {/* Assign To */}
                        <div>
                            <label className="block text-[12px] font-medium text-gray-400 mb-2 uppercase tracking-wide">Assign To</label>
                            <div className="relative">
                                <select className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[13.5px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 transition-all font-light appearance-none">
                                    <option>Choose user</option>
                                </select>
                                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-3 mt-4">
                        <button className="px-6 py-2 border border-gray-200 rounded-lg text-[13px] font-bold text-gray-500 hover:bg-gray-50 transition-colors uppercase tracking-wide">Clear</button>
                        <button className="px-6 py-2 bg-[#212529] hover:bg-black text-white rounded-lg text-[13px] font-bold transition-colors uppercase tracking-wide shadow-sm">Create task</button>
                    </div>
                </div>
            </div>

            {/* List Section Card */}
            <div className="bg-white rounded-lg border border-gray-200/80  flex-1 flex flex-col overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-50 bg-white sticky top-0 z-10">
                    <h2 className="text-[14px] font-bold text-gray-900 uppercase tracking-widest">ALL TASKS</h2>
                </div>

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
                                    <div className="flex items-center justify-between">Assigned User <SortIcon /></div>
                                </th>
                                <th className="py-4 px-2 text-[12.5px] font-bold text-gray-600 whitespace-nowrap w-32">
                                    <div className="flex items-center">Status <SortIcon /></div>
                                </th>
                                <th className="py-4 px-2 text-[12.5px] font-bold text-gray-600 whitespace-nowrap w-40">
                                    <div className="flex items-center justify-between">Customer Name <SortIcon /></div>
                                </th>
                                <th className="py-4 px-2 text-[12.5px] font-bold text-gray-600 whitespace-nowrap w-44">
                                    <div className="flex items-center justify-between">Category <SortIcon /></div>
                                </th>
                                <th className="py-4 px-2 text-[12.5px] font-bold text-gray-600 whitespace-nowrap w-44">
                                    <div className="flex items-center justify-between">Created date and Ti <SortIcon /></div>
                                </th>
                                <th className="py-4 px-2 text-[12.5px] font-bold text-gray-600 whitespace-nowrap text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_TASKS.map((task, index) => (
                                <tr key={task.id} className="border-b border-gray-100/60 transition-colors hover:bg-gray-50/50">
                                    <td className="py-4 px-2 text-[12.5px] text-gray-500">{index + 1}</td>
                                    <td className="py-4 px-2 text-[12.5px] text-gray-600 font-medium">{task.taskId}</td>
                                    <td className="py-4 px-2 text-[12.5px] text-gray-600 truncate max-w-[200px]" title={task.title}>{task.title}</td>
                                    <td className="py-4 px-2 text-[12.5px] text-gray-600 font-medium">{task.user}</td>
                                    <td className="py-4 px-2">
                                        <StatusBadge status={task.status} />
                                    </td>
                                    <td className="py-4 px-2 text-[12.5px] text-gray-600">{task.customer}</td>
                                    <td className="py-4 px-2 text-[12.5px] text-gray-600">{task.category}</td>
                                    <td className="py-4 px-2 text-[12.5px] text-gray-600">{task.date}</td>
                                    <td className="py-4 px-2 text-right">
                                        <button className="text-gray-300 hover:text-gray-500 p-1">
                                            <MoreVertical size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
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
