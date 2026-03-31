import { useState } from 'react';
import { Search, Filter, FileText, SearchX } from 'lucide-react';

export const Meetings = () => {
  const [activeTab, setActiveTab] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const EmptyStateGraphic = () => (
    <div className="flex flex-col items-center justify-center p-12 lg:p-24 2xl:p-32 space-y-6 animate-zoom-in">
       {/* Illustration container */}
       <div className="relative w-28 h-28 flex items-center justify-center bg-slate-50 rounded-full border border-slate-100 shadow-sm">
          {/* Base Document Icon */}
          <FileText size={56} className="text-slate-300 transform -translate-x-2 -translate-y-2" strokeWidth={1.5} />
          {/* Stylized accents on document */}
          <div className="absolute top-[35%] left-[30%] w-8 h-1 bg-red-400/80 rounded-full"></div>
          <div className="absolute top-[45%] left-[30%] w-12 h-1 bg-red-400/80 rounded-full"></div>
          <div className="absolute top-[55%] left-[30%] w-10 h-1 bg-amber-400/80 rounded-full"></div>
          
          {/* Overlay Magnifying Glass */}
          <div className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow-md scale-110">
             <div className="bg-sky-500 rounded-full p-2 relative">
                <SearchX size={24} className="text-white" strokeWidth={2.5} />
             </div>
          </div>
       </div>

       {/* Text */}
       <h2 className="text-lg font-bold text-slate-700 tracking-wide">
          No Meeting Requests
       </h2>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] w-full animate-fade-in pb-12">
      {/* Header */}
      <div className="px-6 py-5 shrink-0">
        <h1 className="text-xl font-bold text-slate-800">Meetings</h1>
      </div>

      {/* Main Content Area */}
      <div className="px-6 flex-1">
        <div className="bg-white rounded-[20px] border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] min-h-[500px] flex flex-col overflow-hidden">
           
           {/* Top Tabs */}
           <div className="flex border-b border-slate-200 px-6 pt-2">
              {['ALL', 'PENDING', 'UPCOMING', 'CLOSED', 'CANCELLED'].map(tab => (
                 <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-3 px-5 text-xs font-bold tracking-wide relative transition-colors ${activeTab === tab ? 'text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
                 >
                    {tab}
                    {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-slate-800 rounded-t-sm"></div>}
                 </button>
              ))}
           </div>

           <div className="p-6 flex-1 flex flex-col">
              {/* Toolbar */}
              <div className="flex items-center gap-3 w-full md:max-w-md mb-8">
                 {/* Search */}
                 <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                       type="text"
                       placeholder="Search..."
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}
                       className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-slate-300 placeholder:text-slate-400 bg-white"
                    />
                 </div>
                 {/* Filter */}
                 <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-500 shrink-0">
                    <Filter size={18} />
                 </button>
              </div>

              {/* Empty State Canvas */}
              <div className="flex-1 flex items-center justify-center border border-slate-100/50 rounded-2xl bg-white shadow-sm mt-4 min-h-[400px]">
                 <EmptyStateGraphic />
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};
