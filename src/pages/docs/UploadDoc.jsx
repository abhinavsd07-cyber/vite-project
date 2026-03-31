import { useState } from 'react';
import { ArrowLeft, ChevronDown, Calendar, UploadCloud, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MOCK_TABLE_DOCS = [
  { id: 1, docId: "DOC-0009", title: "landAdvance.jpg", status: "Pending", customer: "Aabasoft customer", category: "-", due: "-" },
];

export const UploadDoc = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('SINGLE FILE UPLOAD');

  const StatusBadge = ({ status }) => (
    <div className="px-3 py-1 rounded-full bg-orange-50 text-orange-500 text-xs font-semibold inline-block border border-orange-100">
      {status}
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] w-full animate-fade-in pb-12">
      {/* Header */}
      <div className="px-6 py-5 shrink-0 flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800">Create Document</h1>
        <button 
           onClick={() => navigate(-1)}
           className="p-1.5 rounded-full border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors"
        >
           <ArrowLeft size={20} />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="px-6 space-y-6">
        
        {/* Top Form Card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
           {/* Tabs */}
           <div className="flex border-b border-slate-200">
              <button 
                onClick={() => setActiveTab('SINGLE FILE UPLOAD')}
                className={`py-3 px-6 text-sm font-semibold relative transition-colors ${activeTab === 'SINGLE FILE UPLOAD' ? 'text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
              >
                SINGLE FILE UPLOAD
                {activeTab === 'SINGLE FILE UPLOAD' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-800"></div>}
              </button>
              <button 
                onClick={() => setActiveTab('MULTIFILE UPLOAD')}
                className={`py-3 px-6 text-sm font-semibold relative transition-colors ${activeTab === 'MULTIFILE UPLOAD' ? 'text-slate-400' : 'text-slate-300 hover:text-slate-600'}`}
              >
                MULTIFILE UPLOAD
              </button>
           </div>

           {/* Form Content */}
           <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column Fields */}
              <div className="space-y-5">
                 <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-slate-500">Title</label>
                    <input type="text" placeholder="Enter title" className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-300 text-sm placeholder:text-slate-300" />
                 </div>
                 <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-slate-500">Company</label>
                    <input type="text" value="Aabasoft" readOnly className="w-full px-4 py-2 bg-slate-50 text-slate-700 border border-slate-200 rounded-lg focus:outline-none text-sm" />
                 </div>
                 <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-slate-500">Category</label>
                    <div className="relative">
                       <select className="appearance-none w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-300 text-sm text-slate-400 cursor-pointer">
                          <option>Choose category</option>
                       </select>
                       <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                 </div>
                 <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-slate-500">Doc Due Date</label>
                    <div className="relative">
                       <input type="text" placeholder="Select Doc due date" className="w-full px-4 py-2 pr-10 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-300 text-sm placeholder:text-slate-300" />
                       <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 cursor-pointer" />
                    </div>
                 </div>
              </div>

              {/* Middle Column Fields */}
              <div className="space-y-5">
                 <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-slate-500">Vendor</label>
                    <div className="relative">
                       <select className="appearance-none w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-300 text-sm text-slate-400 cursor-pointer">
                          <option>Choose Vendor</option>
                       </select>
                       <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                 </div>
                 <div className="flex flex-col gap-1.5 h-full">
                    <label className="text-sm font-medium text-slate-500">Remarks</label>
                    <textarea 
                       placeholder="Enter Remarks" 
                       className="w-full flex-1 min-h-[140px] px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-300 text-sm placeholder:text-slate-300 resize-none"
                    ></textarea>
                 </div>
              </div>

              {/* Right Column Upload Area */}
              <div className="flex flex-col h-full">
                 <label className="text-sm font-medium text-slate-500 mb-1.5">
                    Document Upload <span className="text-red-500">*</span>
                 </label>
                 <div className="flex flex-col items-center justify-center flex-1 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors p-6 text-center cursor-pointer min-h-[200px]">
                    <UploadCloud size={24} className="text-slate-800 mb-3" />
                    <p className="text-sm font-medium text-slate-700 mb-1">
                       Drop file here from your device or click to upload
                    </p>
                    <p className="text-xs text-slate-400">
                       (Support format: pdf, .png, .jpeg, .jpg, .doc, .xlsx, .PPT)
                    </p>
                 </div>
              </div>
           </div>

           {/* Form Actions */}
           <div className="p-6 pt-2 flex items-center justify-end gap-3">
              <button className="px-6 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-600 font-medium text-sm transition-colors">
                 Clear
              </button>
              <button className="px-6 py-2 rounded-lg bg-[#222327] hover:bg-black text-white font-medium text-sm transition-colors">
                 Create Document
              </button>
           </div>
        </div>

        {/* Bottom List Table Card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
           <div className="p-5 border-b border-slate-100">
              <h2 className="text-[13px] font-bold tracking-wide text-slate-600">ALL DOCUMENTS</h2>
           </div>
           
           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                 <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/50">
                       <th className="py-4 px-6 text-[12px] font-semibold text-slate-600 whitespace-nowrap">SL No</th>
                       <th className="py-4 px-6 text-[12px] font-semibold text-slate-600 whitespace-nowrap">Doc ID</th>
                       <th className="py-4 px-6 text-[12px] font-semibold text-slate-600 whitespace-nowrap">Title</th>
                       <th className="py-4 px-6 text-[12px] font-semibold text-slate-600 whitespace-nowrap">Status</th>
                       <th className="py-4 px-6 text-[12px] font-semibold text-slate-600 whitespace-nowrap">Customer Name</th>
                       <th className="py-4 px-6 text-[12px] font-semibold text-slate-600 whitespace-nowrap">Category</th>
                       <th className="py-4 px-6 text-[12px] font-semibold text-slate-600 whitespace-nowrap">Doc Due Date</th>
                       <th className="py-4 px-6 text-[12px] font-semibold text-slate-600 whitespace-nowrap text-right">Action</th>
                    </tr>
                 </thead>
                 <tbody>
                    {MOCK_TABLE_DOCS.map((doc, i) => (
                       <tr key={doc.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 px-6 text-[13px] text-slate-500">{i + 1}</td>
                          <td className="py-4 px-6 text-[13px] font-medium text-slate-700">{doc.docId}</td>
                          <td className="py-4 px-6 text-[13px] text-slate-600">{doc.title}</td>
                          <td className="py-4 px-6 text-[13px]">
                             <StatusBadge status={doc.status} />
                          </td>
                          <td className="py-4 px-6 text-[13px] text-slate-600">{doc.customer}</td>
                          <td className="py-4 px-6 text-[13px] text-slate-500">{doc.category}</td>
                          <td className="py-4 px-6 text-[13px] text-slate-500">{doc.due}</td>
                          <td className="py-4 px-6 flex justify-end">
                             <button className="text-slate-400 hover:text-slate-600 p-1 rounded">
                                <MoreVertical size={16} />
                             </button>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

      </div>
    </div>
  );
};
