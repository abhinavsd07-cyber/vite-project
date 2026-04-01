import { useState } from 'react';
import { ChevronDown, Search, Trash2 } from 'lucide-react';

const SEARCH_RESULTS = [
  { id: 1, name: "Willard Perez", contact: "Luis Martinez", country: "India", phone: "+91 (115) 649-2635", email: "willard_perez@gmail.com", domain: "Retail and E-commerce", date: "18/5/2013", checked: true },
  { id: 2, name: "Rebecca Taylor", contact: "José Sánchez", country: "India", phone: "+91 (115) 649-2635", email: "crapulous_unicorn_94@gmail.com", domain: "Technology and IT Services", date: "22/7/2018", checked: false },
  { id: 3, name: "Daniel Garcia", contact: "Lalita Hattari", country: "India", phone: "+91 (794) 611-8747", email: "paulos.adimbola@gmail.com", domain: "Healthcare and Pharmaceuticals", date: "26/9/2018", checked: true },
  { id: 4, name: "Emily Clark", contact: "Aisha Ahmad", country: "India", phone: "+91 (478) 739-4324", email: "ali.rashid@gmail.com", domain: "Telecommunications", date: "8/10/2015", checked: true },
];

const ADDED_COMPANIES = [
  { id: 1, name: "Willard Perez", contact: "Carlos Garcia", country: "Canada", phone: "+91 (115) 649-2635", email: "willard_perez@gmail.com", domain: "Travel and Hospitality", date: "7/12/2022" },
  { id: 2, name: "Rebecca Taylor", contact: "Tawanna Keita", country: "Brazil", phone: "+91 (115) 649-2635", email: "crapulous_unicorn_94@gmail.com", domain: "Consumer Goods and Services", date: "4/10/2020" },
  { id: 3, name: "Daniel Garcia", contact: "Carlota Borg", country: "Germany", phone: "+91 (794) 611-8747", email: "paulos.adimbola@gmail.com", domain: "Telecommunications", date: "28/3/2018" },
  { id: 4, name: "Emily Clark", contact: "Artsiom Hzaha", country: "Japan", phone: "+91 (478) 739-4324", email: "ali.rashid@gmail.com", domain: "Energy and Utilities", date: "13/9/2006" },
  { id: 5, name: "Léa Petrović", contact: "Lukas Dimitrov", country: "Australia", phone: "+91 (583) 108-4311", email: "risible_inker_71@gmail.com", domain: "Real Estate and Construction", date: "26/6/2007" },
  { id: 6, name: "Trung Thái Thương", contact: "Léia Bérzinji", country: "South Africa", phone: "+91 (992) 609-2790", email: "judicious_gnomes_43@gmail.com", domain: "Manufacturing and Industrial", date: "25/12/2010" },
  { id: 7, name: "Raekwon Mostafa", contact: "Salma Rashid", country: "India", phone: "+91 (340) 976-2718", email: "rebarbative_senor_74@gmail.com", domain: "Retail and E-commerce", date: "17/1/2014" },
  { id: 8, name: "Sharon Lee", contact: "Amira Khoury", country: "Mexico", phone: "+91 (480) 199-7240", email: "sara.chizimu@gmail.com", domain: "Technology and IT Services", date: "7/1/2021" },
  { id: 9, name: "Daniel Jones", contact: "Margaret Anderson", country: "Egypt", phone: "+91 (948) 960-9392", email: "quiescent_cookies_92@gmail.com", domain: "Healthcare and Pharmaceuticals", date: "27/2/2016" },
];

const SortIcon = () => (
   <svg className="w-[10px] h-[10px] text-slate-400 opacity-60 ml-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
     <path d="m5 15 7-7 7 7" />
     <path d="m19 9-7 7-7-7" className="translate-y-6" />
   </svg>
);

export const CreateUser = () => {
  const [activeTab, setActiveTab] = useState('ALLOCATE COMPANY');

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] w-full animate-fade-in relative pb-[80px]">
      {/* Header */}
      <div className="px-6 py-4 shrink-0">
        <h1 className="text-[17px] font-bold text-slate-800">Create User</h1>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-6 pb-6 overflow-y-auto">
        
        {/* Tabs Bar */}
        <div className="bg-white rounded-[10px] border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)] mb-4 overflow-hidden">
          <div className="flex items-center px-2">
             <button 
                onClick={() => setActiveTab('BASIC DETAIL')}
                className={`py-3.5 px-6 text-[12px] uppercase font-bold tracking-wide relative transition-colors ${activeTab === 'BASIC DETAIL' ? 'text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
             >
                BASIC DETAIL
                {activeTab === 'BASIC DETAIL' && (
                   <div className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-800"></div>
                )}
             </button>
             <button 
                onClick={() => setActiveTab('ALLOCATE COMPANY')}
                className={`py-3.5 px-6 text-[12px] uppercase font-bold tracking-wide relative transition-colors ${activeTab === 'ALLOCATE COMPANY' ? 'text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
             >
                ALLOCATE COMPANY
                {activeTab === 'ALLOCATE COMPANY' && (
                   <div className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-800"></div>
                )}
             </button>
          </div>
        </div>

        {/* Dynamic Content */}
        {activeTab === 'BASIC DETAIL' && (
           <div className="bg-white p-6 rounded-[10px] border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)] min-h-[400px]">
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
                         <option value="super_admin">Super Admin</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                   </div>
                </div>

              </div>
           </div>
        )}

        {/* ALLOCATE COMPANY TAB CONTENTS */}
        {activeTab === 'ALLOCATE COMPANY' && (
           <div className="flex flex-col gap-4">
              
              {/* Top Search Card */}
              <div className="bg-white p-5 md:p-6 rounded-[10px] border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-6">
                 
                 {/* Filters */}
                 <div className="flex flex-col md:flex-row gap-4 md:items-end">
                    <div className="flex flex-col gap-1.5 w-full md:w-[280px]">
                       <label className="text-[12px] font-bold text-slate-300 uppercase tracking-wide">Country</label>
                       <div className="relative">
                          <select className="appearance-none w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-[8px] text-[13px] focus:outline-none text-slate-500 shadow-sm cursor-pointer">
                             <option>Choose Country</option>
                          </select>
                          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                       </div>
                    </div>
                    
                    <div className="flex flex-col gap-1.5 w-full md:w-[320px]">
                       <label className="text-[12px] font-bold text-slate-300 uppercase tracking-wide">Business Domain</label>
                       <div className="relative">
                          <select className="appearance-none w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-[8px] text-[13px] focus:outline-none text-slate-500 shadow-sm cursor-pointer">
                             <option>Choose business domain</option>
                          </select>
                          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                       </div>
                    </div>

                    <button className="flex items-center gap-2 bg-[#212529] hover:bg-black text-white px-6 py-2.5 rounded-[8px] text-[13px] font-medium transition-colors md:ml-2 shadow-sm whitespace-nowrap justify-center">
                       <Search size={14} /> Search
                    </button>
                 </div>

                 {/* Results Header */}
                 <div className="flex justify-between items-end mt-2 px-1">
                    <h3 className="text-[14px] font-bold text-slate-800">Search result</h3>
                    <span className="text-[11px] text-slate-400 font-medium">16 results found</span>
                 </div>

                 {/* Search Results Table */}
                 <div className="overflow-x-auto border-t border-slate-100/80 pt-1 -mx-2 px-2">
                    <table className="w-full text-left border-collapse min-w-[950px]">
                       <thead>
                          <tr className="border-b border-slate-100/80">
                             <th className="py-3.5 px-3 w-10">
                               <input type="checkbox" className="w-3.5 h-3.5 rounded border-slate-300 text-slate-800 transition-colors focus:ring-slate-800" />
                             </th>
                             <th className="py-3.5 px-3 text-[11.5px] font-bold text-slate-700 whitespace-nowrap">Customer Name</th>
                             <th className="py-3.5 px-3 text-[11.5px] font-bold text-slate-700 whitespace-nowrap"><div className="flex justify-between items-center">Contact person <SortIcon/></div></th>
                             <th className="py-3.5 px-3 text-[11.5px] font-bold text-slate-700 whitespace-nowrap">Country</th>
                             <th className="py-3.5 px-3 text-[11.5px] font-bold text-slate-700 whitespace-nowrap"><div className="flex justify-between items-center">Phone <SortIcon/></div></th>
                             <th className="py-3.5 px-3 text-[11.5px] font-bold text-slate-700 whitespace-nowrap">Email</th>
                             <th className="py-3.5 px-3 text-[11.5px] font-bold text-slate-700 whitespace-nowrap"><div className="flex justify-between items-center">Business domain <SortIcon/></div></th>
                             <th className="py-3.5 px-3 text-[11.5px] font-bold text-slate-700 whitespace-nowrap"><div className="flex justify-between items-center">Registered date <SortIcon/></div></th>
                          </tr>
                       </thead>
                       <tbody>
                          {SEARCH_RESULTS.map((row) => (
                             <tr key={row.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                <td className="py-4 px-3">
                                  <input type="checkbox" checked={row.checked} readOnly className="w-3.5 h-3.5 rounded border-slate-300 text-slate-800 accent-[#212529]" />
                                </td>
                                <td className="py-4 px-3 text-[12px] text-slate-600 font-medium">{row.name}</td>
                                <td className="py-4 px-3 text-[12px] text-slate-600">{row.contact}</td>
                                <td className="py-4 px-3 text-[12px] text-slate-600">{row.country}</td>
                                <td className="py-4 px-3 text-[12px] text-slate-600 font-medium whitespace-nowrap">{row.phone}</td>
                                <td className="py-4 px-3 text-[12px] text-slate-500">{row.email}</td>
                                <td className="py-4 px-3 text-[12px] text-slate-600">{row.domain}</td>
                                <td className="py-4 px-3 text-[12px] text-slate-600">{row.date}</td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>

                 {/* Results Footer Actions */}
                 <div className="flex justify-between items-center mt-2 px-1">
                    <span className="text-[11px] text-slate-400 font-medium">3 items choose</span>
                    <div className="flex gap-2.5">
                       <button className="px-6 py-2 bg-[#e2e4e7] hover:bg-slate-300 text-slate-600 rounded-[8px] text-[12.5px] font-medium transition-colors shadow-sm">
                          Clear
                       </button>
                       <button className="px-5 py-2 bg-[#212529] hover:bg-black text-white rounded-[8px] text-[12.5px] font-medium transition-colors shadow-sm">
                          Add to list
                       </button>
                    </div>
                 </div>
              </div>

              {/* Bottom Added List Card */}
              <div className="bg-white p-5 md:p-6 rounded-[10px] border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-6">
                 <h3 className="text-[14px] font-bold text-slate-800 px-1">Added Company List</h3>
                 
                 <div className="overflow-x-auto border-t border-slate-100/80 pt-1 -mx-2 px-2">
                    <table className="w-full text-left border-collapse min-w-[950px]">
                       <thead>
                          <tr className="border-b border-slate-100/80">
                             <th className="py-3.5 px-3 w-12 text-[11.5px] font-bold text-slate-700 whitespace-nowrap">SL No</th>
                             <th className="py-3.5 px-3 text-[11.5px] font-bold text-slate-700 whitespace-nowrap">Customer Name</th>
                             <th className="py-3.5 px-3 text-[11.5px] font-bold text-slate-700 whitespace-nowrap"><div className="flex justify-between items-center">Contact person <SortIcon/></div></th>
                             <th className="py-3.5 px-3 text-[11.5px] font-bold text-slate-700 whitespace-nowrap">Country</th>
                             <th className="py-3.5 px-3 text-[11.5px] font-bold text-slate-700 whitespace-nowrap"><div className="flex justify-between items-center">Phone <SortIcon/></div></th>
                             <th className="py-3.5 px-3 text-[11.5px] font-bold text-slate-700 whitespace-nowrap"><div className="flex justify-between items-center">Email <SortIcon/></div></th>
                             <th className="py-3.5 px-3 text-[11.5px] font-bold text-slate-700 whitespace-nowrap"><div className="flex justify-between items-center">Business domain <SortIcon/></div></th>
                             <th className="py-3.5 px-3 text-[11.5px] font-bold text-slate-700 whitespace-nowrap"><div className="flex justify-between items-center">Registered date <SortIcon/></div></th>
                             <th className="py-3.5 px-3 text-[11.5px] font-bold text-slate-700 whitespace-nowrap text-center">Actions</th>
                          </tr>
                       </thead>
                       <tbody>
                          {ADDED_COMPANIES.map((row, index) => (
                             <tr key={row.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                <td className="py-4 px-3 text-[12px] text-slate-500">{index + 1}</td>
                                <td className="py-4 px-3 text-[12px] text-slate-600 font-medium">{row.name}</td>
                                <td className="py-4 px-3 text-[12px] text-slate-600">{row.contact}</td>
                                <td className="py-4 px-3 text-[12px] text-slate-600">{row.country}</td>
                                <td className="py-4 px-3 text-[12px] text-slate-600 font-medium whitespace-nowrap">{row.phone}</td>
                                <td className="py-4 px-3 text-[12px] text-slate-500">{row.email}</td>
                                <td className="py-4 px-3 text-[12px] text-slate-600">{row.domain}</td>
                                <td className="py-4 px-3 text-[12px] text-slate-600">{row.date}</td>
                                <td className="py-4 px-3 flex justify-center items-center">
                                   {index === 2 ? (
                                     <button className="text-red-500 hover:text-red-600 transition-colors bg-red-50 p-1.5 rounded-full mt-1">
                                        <Trash2 size={13} strokeWidth={2.5} />
                                     </button>
                                   ) : (
                                      <span className="w-5 h-5 block"></span>
                                   )}
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>

           </div>
        )}
      </div>

      {/* Global Bottom Sticky Action Bar */}
      <div className="absolute bottom-0 left-0 w-full h-[70px] bg-white border-t border-slate-100 flex items-center justify-end px-8 gap-3 z-50">
         <button className="px-7 py-2.5 rounded-[8px] bg-[#e2e4e7] hover:bg-slate-300 text-slate-600 font-medium text-[13px] transition-colors shadow-sm">
            Cancel
         </button>
         <button className="px-8 py-2.5 rounded-[8px] bg-[#212529] hover:bg-black text-white font-medium text-[13px] transition-colors shadow-sm">
            Save
         </button>
      </div>
    </div>
  );
};
