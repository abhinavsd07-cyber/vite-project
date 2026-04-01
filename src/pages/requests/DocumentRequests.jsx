import { useState } from 'react';
import { Search, Plus, Check, ImageIcon, Download } from 'lucide-react';

const MOCK_REQUESTS = [
  { id: 1, title: 'Test doc req 2', creator: 'test Maker', date: '23/01/2026', file: 'white image.png', message: 'uploaded the white doc' },
  { id: 2, title: 'Test doc req', creator: 'Super Admin User', date: '22/01/2026', file: null, message: null },
];

export const DocumentRequests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReq, setSelectedReq] = useState(MOCK_REQUESTS[0]);

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] w-full animate-fade-in">
      {/* Header */}
      <div className="px-6 py-4 shrink-0">
        <h1 className="text-xl font-bold text-slate-800">Document Request</h1>
      </div>

      {/* Main Content Area */}
      <div className="px-6 flex-1 h-[calc(100vh-140px)] min-h-[500px]">
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm h-full flex overflow-hidden">
           
           {/* Left Sidebar (Requests List) */}
           <div className="w-[350px] shrink-0 border-r border-slate-100 flex flex-col bg-white">
              
              {/* Header & Search */}
              <div className="p-5 pb-3">
                 <div className="flex items-center justify-between mb-4">
                    <span className="text-[13px] font-bold tracking-wide text-slate-800">REQUESTS</span>
                    <div className="relative w-[180px]">
                       <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                       <input
                          type="text"
                          placeholder="Search..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-1 focus:ring-slate-300 placeholder:text-slate-400"
                       />
                    </div>
                 </div>
              </div>

              {/* Actions */}
              <div className="px-5 mb-4">
                 <div className="flex items-center justify-between py-2 border-b border-transparent group cursor-pointer">
                    <div>
                       <h3 className="font-semibold text-sm text-slate-800">Send Document</h3>
                       <p className="text-[13px] text-slate-500">Create new document request</p>
                    </div>
                    <button className="text-blue-500 hover:bg-blue-50 p-1.5 rounded-lg transition-colors">
                       <Plus size={20} />
                    </button>
                 </div>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto px-3 space-y-1 pb-4">
                 {MOCK_REQUESTS.map((req) => (
                    <div key={req.id}>
                       <div className="px-3 pt-3 pb-1 text-[11px] font-medium text-slate-400">
                          {req.date}
                       </div>
                       <button
                          onClick={() => setSelectedReq(req)}
                          className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                             selectedReq.id === req.id 
                                ? 'bg-slate-50 border border-slate-100 shadow-sm' 
                                : 'hover:bg-slate-50/50 border border-transparent'
                          }`}
                       >
                          <div className="text-left">
                             <div className="font-medium text-slate-800 text-[13px] mb-0.5">{req.title}</div>
                             <div className="text-[12px] text-slate-500">{req.creator}</div>
                          </div>
                          <div className="flex self-end">
                             {/* Double checkmark icon imitation */}
                             <div className="relative w-4 h-4 text-sky-500">
                                <Check size={14} className="absolute left-0 bottom-0" strokeWidth={3} />
                                <Check size={14} className="absolute left-1 bottom-1 opacity-70" strokeWidth={3} />
                             </div>
                          </div>
                       </button>
                    </div>
                 ))}
              </div>
           </div>

           {/* Right Payload (Details View) */}
           <div className="flex-1 flex flex-col bg-white overflow-hidden">
              {selectedReq ? (
                 <div className="h-full flex flex-col">
                    {/* Detail Header */}
                    <div className="p-6 pb-4 flex items-center justify-between border-b border-white">
                       <h2 className="text-lg font-semibold text-slate-800">{selectedReq.title}</h2>
                       <span className="text-sm font-medium text-slate-400">{selectedReq.date}</span>
                    </div>

                    {/* Detail Body */}
                    <div className="flex-1 p-6 pt-2">
                       {selectedReq.file && (
                          <div className="space-y-4 max-w-2xl">
                             
                             {/* Attachment Box */}
                             <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white">
                                <div className="flex items-center gap-3">
                                   <div className="p-2 bg-blue-50 rounded-lg text-blue-500">
                                      <ImageIcon size={20} />
                                   </div>
                                   <span className="text-sm font-medium text-slate-600">
                                      {selectedReq.file}
                                   </span>
                                </div>
                                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                                   <Download size={18} />
                                </button>
                             </div>

                             {/* Message/Remark Box */}
                             {selectedReq.message && (
                                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100/50 text-sm text-slate-600">
                                   {selectedReq.message}
                                </div>
                             )}

                          </div>
                       )}
                    </div>
                 </div>
              ) : (
                 <div className="flex-1 flex items-center justify-center text-slate-400">
                    Select a request to view details
                 </div>
              )}
           </div>

        </div>
      </div>
    </div>
  );
};
