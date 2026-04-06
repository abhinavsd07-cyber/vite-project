import { ChevronDown, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CreateCustomer = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <div className="px-6 py-4 shrink-0 flex items-center justify-between">
        <h1 className="text-[20px] font-semibold text-gray-800">Create Customer</h1>
        <button 
           onClick={() => navigate(-1)}
           className="p-1.5 rounded-full border border-gray-300 hover:bg-gray-100 text-gray-700 transition-colors"
        >
           <ArrowLeft size={20} />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="px-6 pb-6">
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm min-h-[250px] flex flex-col">
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
              {/* Customer Name */}
              <div className="flex flex-col gap-1.5">
                 <label className="text-sm font-medium text-gray-500">
                    Customer Name <span className="text-red-500">*</span>
                 </label>
                 <input 
                    type="text" 
                    placeholder="Enter Customer Name"
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 text-sm placeholder:text-gray-300"
                 />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                 <label className="text-sm font-medium text-gray-500">
                    Email <span className="text-red-500">*</span>
                 </label>
                 <input 
                    type="email" 
                    placeholder="Enter Email"
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 text-sm placeholder:text-gray-300"
                 />
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-1.5">
                 <label className="text-sm font-medium text-gray-500">
                    Phone Number <span className="text-red-500">*</span>
                 </label>
                 <div className="flex gap-2 w-full">
                    <div className="relative w-24 flex-shrink-0">
                       <select className="appearance-none w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 text-sm text-gray-500 cursor-pointer">
                          <option>Code</option>
                          <option>+1</option>
                          <option>+91</option>
                          <option>+44</option>
                       </select>
                       <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                    <input 
                       type="tel" 
                       placeholder="Enter Phone number"
                       className="flex-1 min-w-0 px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 text-sm placeholder:text-gray-300"
                    />
                 </div>
              </div>
           </div>

           {/* Actions */}
           <div className="flex items-center justify-end gap-3 mt-8 pt-4 border-t border-gray-50 border-hidden">
               <button className="px-5 py-2 rounded-lg bg-gray-200/60 hover:bg-gray-300/80 text-gray-600 font-medium text-sm transition-colors">
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
