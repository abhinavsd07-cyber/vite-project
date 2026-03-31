import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const CreateUser = () => {
  const [activeTab, setActiveTab] = useState('BASIC DETAILS');

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] w-full animate-fade-in relative pb-20">
      {/* Header */}
      <div className="px-6 py-5 shrink-0">
        <h1 className="text-xl font-bold text-slate-800">Create User</h1>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-6 overflow-y-auto">
        {/* Tabs container */}
        <div className="bg-white rounded-t-xl overflow-hidden border border-slate-200 border-b-0 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <div className="flex border-b border-slate-200">
             <button 
                onClick={() => setActiveTab('BASIC DETAILS')}
                className={`py-3 px-6 text-sm font-semibold relative transition-colors ${activeTab === 'BASIC DETAILS' ? 'text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
             >
                BASIC DETAILS
                {activeTab === 'BASIC DETAILS' && (
                   <div className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-800"></div>
                )}
             </button>
             <button 
                onClick={() => setActiveTab('ALLOCATE COMPANY')}
                className={`py-3 px-6 text-sm font-semibold relative transition-colors ${activeTab === 'ALLOCATE COMPANY' ? 'text-slate-400' : 'text-slate-300 hover:text-slate-600'}`}
             >
                ALLOCATE COMPANY
             </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white p-6 rounded-b-xl border border-slate-200 border-t-0 shadow-[0_2px_10px_rgba(0,0,0,0.02)] min-h-[400px]">
           {activeTab === 'BASIC DETAILS' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* User Name */}
                <div className="flex flex-col gap-1.5">
                   <label className="text-sm font-medium text-slate-600">
                      User Name <span className="text-red-500">*</span>
                   </label>
                   <input 
                      type="text" 
                      placeholder="Enter User Name"
                      className="w-full px-4 py-2 bg-[#fdfdfd] border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-300 text-sm placeholder:text-slate-300"
                   />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                   <label className="text-sm font-medium text-slate-600">
                      Email <span className="text-red-500">*</span>
                   </label>
                   <input 
                      type="email" 
                      placeholder="Enter Email"
                      className="w-full px-4 py-2 bg-[#fdfdfd] border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-300 text-sm placeholder:text-slate-300"
                   />
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-1.5">
                   <label className="text-sm font-medium text-slate-600">
                      Phone Number <span className="text-red-500">*</span>
                   </label>
                   <div className="flex gap-2 w-full">
                      <div className="relative w-24 flex-shrink-0">
                         <select className="appearance-none w-full px-3 py-2 bg-[#fdfdfd] border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-300 text-sm text-slate-500">
                            <option>Code</option>
                            <option>+1</option>
                            <option>+91</option>
                            <option>+44</option>
                         </select>
                         <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                      <input 
                         type="tel" 
                         placeholder="Enter Phone number"
                         className="flex-1 min-w-0 px-4 py-2 bg-[#fdfdfd] border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-300 text-sm placeholder:text-slate-300"
                      />
                   </div>
                </div>

                {/* User Group */}
                <div className="flex flex-col gap-1.5">
                   <label className="text-sm font-medium text-slate-600">
                      User Group <span className="text-red-500">*</span>
                   </label>
                   <div className="relative">
                      <select className="appearance-none w-full px-4 py-2 bg-[#fdfdfd] border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-300 text-sm text-slate-300">
                         <option value="" disabled selected>Choose user Group</option>
                         <option value="admin">Admin</option>
                         <option value="maker">Maker</option>
                         <option value="checker">Checker</option>
                         <option value="super_admin">Super Admin</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                   </div>
                </div>

              </div>
           )}

           {activeTab === 'ALLOCATE COMPANY' && (
              <div className="flex items-center justify-center h-48 text-slate-400 text-sm">
                 Company allocation interface goes here...
              </div>
           )}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-white border-t border-slate-200 flex items-center justify-end px-6 gap-3 shadow-[0_-4px_15px_rgba(0,0,0,0.02)]">
         <button className="px-5 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium text-sm transition-colors">
            Clear
         </button>
         <button className="px-5 py-2 rounded-lg bg-white border border-slate-800 hover:bg-slate-50 text-slate-800 font-medium text-sm transition-colors">
            Save and continue
         </button>
         <button className="px-8 py-2 rounded-lg bg-slate-900 hover:bg-black text-white font-medium text-sm transition-colors">
            Save
         </button>
      </div>
    </div>
  );
};
