import { useState } from 'react';
import { Search, Filter, MoreVertical, Plus, FileText, LayoutGrid, List, RotateCw, Check, CheckCircle2, CircleDashed } from 'lucide-react';
import { Pagination } from '../../components/ui/Pagination';

const MOCK_DOCS = [
  { id: 1, docId: "DOC-0009", title: "landAdvance.jpg", due: "-", created: "30/03/2026", completed: "-", verified: "-", status: "Pending" },
  { id: 2, docId: "DOC-0008", title: "Task 1", due: "-", created: "28/01/2026", completed: "-", verified: "-", status: "Pending" },
  { id: 3, docId: "DOC-0007", title: "landAdvance.jpg", due: "-", created: "27/01/2026", completed: "-", verified: "-", status: "Pending" },
  { id: 4, docId: "DOC-0006", title: "Black_colour.jpg", due: "-", created: "23/01/2026", completed: "23/01/2026", verified: "23/01/2026", status: "Verified" },
  { id: 5, docId: "DOC-0005", title: "Black_colour.jpg", due: "-", created: "23/01/2026", completed: "23/01/2026", verified: "-", status: "Completed" },
  { id: 6, docId: "DOC-0003", title: "Black_colour.jpg", due: "23-01-2026", created: "23/01/2026", completed: "-", verified: "-", status: "Processing" },
  { id: 7, docId: "DOC-0002", title: "awardCertfctnPic03.jpg", due: "-", created: "19/01/2026", completed: "19/01/2026", verified: "-", status: "Completed" },
  { id: 8, docId: "TSK-0001", title: "NoData.png", due: "11-11-2025", created: "29/04/2025", completed: "-", verified: "-", status: "Processing" },
];

export const DocList = () => {
  const [docs, setDocs] = useState(MOCK_DOCS);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [mainTab, setMainTab] = useState('ALL DOCS');
  const [filterTab, setFilterTab] = useState('ALL');

  const StatusBadge = ({ status }) => {
    switch(status) {
       case 'Pending':
          return (
             <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-500 text-xs font-semibold border border-orange-100">
                <CircleDashed size={14} /> Pending
             </div>
          );
       case 'Completed':
          return (
             <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-500 text-xs font-semibold border border-emerald-100">
                <Check size={14} /> Completed
             </div>
          );
       case 'Processing':
          return (
             <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-500 text-xs font-semibold border border-sky-100">
                <RotateCw size={14} /> Processing
             </div>
          );
       case 'Verified':
          return (
             <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-green-600 text-white text-xs font-semibold border border-green-700">
                <CheckCircle2 size={14} /> Verified
             </div>
          );
       default:
          return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] w-full animate-fade-in relative pb-16">
      
      {/* Top Main Tabs Layout */}
      <div className="bg-white border-b border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] pt-2 px-6">
         <div className="flex gap-6">
            <button 
               onClick={() => setMainTab('ALL DOCS')}
               className={`py-3 text-[13px] font-bold tracking-wide relative ${mainTab === 'ALL DOCS' ? 'text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
            >
               ALL DOCS
               {mainTab === 'ALL DOCS' && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-slate-800 rounded-t-sm"></div>}
            </button>
            <button 
               onClick={() => setMainTab('MY DOCS')}
               className={`py-3 text-[13px] font-bold tracking-wide relative ${mainTab === 'MY DOCS' ? 'text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
            >
               MY DOCS
               {mainTab === 'MY DOCS' && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-slate-800 rounded-t-sm"></div>}
            </button>
         </div>
      </div>

      <div className="flex-1 px-6 pt-4 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 min-h-full flex flex-col p-4 md:p-5 pb-2">
           
           {/* Filters Row */}
           <div className="flex flex-wrap items-center gap-6 border-b border-slate-100 pb-4 mb-4">
              {['ALL', 'PENDING', 'PROCESSING', 'COMPLETED', 'VERIFIED', 'DELETE REQUESTS'].map(tab => (
                 <button 
                    key={tab}
                    onClick={() => setFilterTab(tab)}
                    className={`text-xs font-bold tracking-wide transition-colors ${filterTab === tab ? 'text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
                 >
                    {tab}
                 </button>
              ))}
           </div>

           {/* Toolbar Row */}
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3 w-full md:w-auto">
                 {/* Search */}
                 <div className="relative flex-1 md:w-80">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                       type="text"
                       placeholder="Search..."
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}
                       className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-slate-300 placeholder:text-slate-400"
                    />
                 </div>
                 {/* Filter */}
                 <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-500 shrink-0">
                    <Filter size={18} />
                 </button>
              </div>

              <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 bg-[#212529] hover:bg-black text-white px-4 py-1.5 rounded text-sm font-medium transition-colors w-full sm:w-auto justify-center">
                     <Plus size={14} />
                     Upload Document
                  </button>
                 
                 {/* View Toggles */}
                 <div className="hidden sm:flex items-center border border-slate-200 rounded-lg p-1 bg-slate-50">
                    <button className="p-1.5 rounded-md bg-white shadow-sm border border-slate-200 text-slate-800">
                       <LayoutGrid size={18} />
                    </button>
                    <button className="p-1.5 rounded-md text-slate-400 hover:text-slate-600">
                       <List size={18} />
                    </button>
                 </div>
              </div>
           </div>

           {/* Grid Layout */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {docs.map(doc => (
                 <div key={doc.id} className="border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all rounded-xl p-4 flex flex-col bg-white">
                    {/* Card Header */}
                    <div className="flex items-start justify-between mb-4">
                       <div className="flex items-center gap-2">
                          <FileText size={18} className="text-slate-400" />
                          <span className="text-sm font-medium text-slate-500">{doc.docId}</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <StatusBadge status={doc.status} />
                          <button className="text-slate-400 hover:text-slate-600">
                             <MoreVertical size={16} />
                          </button>
                       </div>
                    </div>

                    {/* Card Body */}
                    <div className="flex-1 mb-6">
                       <h3 className="font-semibold text-slate-800 text-base mb-1 truncate">{doc.title}</h3>
                       <div className="text-xs text-slate-500">
                          Doc due date <br/>
                          <span className={doc.due !== '-' ? 'text-red-500 font-medium' : ''}>{doc.due}</span>
                       </div>
                    </div>

                    {/* Card Footer */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-1 text-[10px] sm:text-[11px] text-slate-400">
                       <div>
                          <p>Created on</p>
                          <p className="font-medium text-slate-600">{doc.created}</p>
                       </div>
                       {doc.completed !== '-' && (
                         <div>
                            <p>Completed on</p>
                            <p className="font-medium text-slate-600">{doc.completed}</p>
                         </div>
                       )}
                       {doc.verified !== '-' && (
                         <div>
                            <p>Verified on</p>
                            <p className="font-medium text-slate-600">{doc.verified}</p>
                         </div>
                       )}
                    </div>
                 </div>
              ))}
           </div>

           <div className="mt-8 shrink-0">
             <Pagination 
                currentPage={currentPage}
                totalPages={4}
                rowsPerPage={rowsPerPage}
                onPageChange={setCurrentPage}
                onRowsChange={setRowsPerPage}
             />
           </div>
           
        </div>
      </div>
    </div>
  );
};
