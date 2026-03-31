import { ChevronDown, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CreateCustomer = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] w-full animate-fade-in">
      {/* Header */}
      <div className="px-6 py-5 shrink-0 flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800">Create Customer</h1>
        <button 
           onClick={() => navigate(-1)}
           className="p-1.5 rounded-full border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors"
        >
           <ArrowLeft size={20} />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="px-6 pb-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] min-h-[250px] flex flex-col">
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
              {/* Customer Name */}
              <div className="flex flex-col gap-1.5">
                 <label className="text-sm font-medium text-slate-500">
                    Customer Name <span className="text-red-500">*</span>
                 </label>
                 <input 
                    type="text" 
                    placeholder="Enter Customer Name"
                    className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-300 text-sm placeholder:text-slate-300"
                 />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                 <label className="text-sm font-medium text-slate-500">
                    Email <span className="text-red-500">*</span>
                 </label>
                 <input 
                    type="email" 
                    placeholder="Enter Email"
                    className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-300 text-sm placeholder:text-slate-300"
                 />
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-1.5">
                 <label className="text-sm font-medium text-slate-500">
                    Phone Number <span className="text-red-500">*</span>
                 </label>
                 <div className="flex gap-2 w-full">
                    <div className="relative w-24 flex-shrink-0">
                       <select className="appearance-none w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-300 text-sm text-slate-500 cursor-pointer">
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
                       className="flex-1 min-w-0 px-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-300 text-sm placeholder:text-slate-300"
                    />
                 </div>
              </div>
           </div>

           {/* Actions */}
           <div className="flex items-center justify-end gap-3 mt-8 pt-4 border-t border-slate-50 border-hidden">
               <button className="px-5 py-2 rounded-lg bg-slate-200/60 hover:bg-slate-300/80 text-slate-600 font-medium text-sm transition-colors">
                  Clear
               </button>
               <button className="px-6 py-2 rounded-lg bg-[#222327] hover:bg-black text-white font-medium text-sm transition-colors">
                  Create Customer
               </button>
           </div>
        </div>
      </div>
    </div>
  );
};
