import { Briefcase, LayoutGrid, Flag, CalendarDays, Users, UserCog } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SETTING_ITEMS = [
  { id: 'business-domain', label: 'Business Domain', icon: Briefcase },
  { id: 'category', label: 'Category', icon: LayoutGrid },
  { id: 'country', label: 'Country', icon: Flag },
  { id: 'financial-year', label: 'Financial Year', icon: CalendarDays },
  { id: 'user-group', label: 'User Group', icon: Users },
  { id: 'vendor', label: 'Vendor', icon: UserCog },
];

export const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] w-full animate-fade-in pb-12">
      {/* Header */}
      <div className="px-6 py-5 shrink-0 flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800">Master Settings</h1>
      </div>

      {/* Main Content Area */}
      <div className="px-6 flex-1">
        <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm p-8 min-h-[500px]">
           
           <div className="flex flex-wrap gap-x-8 gap-y-10">
              {SETTING_ITEMS.map((item) => {
                 const Icon = item.icon;
                 return (
                    <button 
                       key={item.id}
                       onClick={() => {
                          if (item.id === 'vendor') {
                             navigate('/vendor');
                          } else {
                             navigate(`/settings/${item.id}`);
                          }
                       }}
                       className="group flex flex-col items-center justify-start w-[100px] outline-none"
                    >
                       {/* Icon Container box */}
                       <div className="w-[84px] h-[84px] rounded-[16px] border border-slate-200/80 bg-[#fbfcfd] flex items-center justify-center mb-3 group-hover:border-blue-400 group-hover:shadow-md group-hover:-translate-y-0.5 transition-all duration-200">
                          <Icon size={26} className="text-slate-500 group-hover:text-blue-600 transition-colors" strokeWidth={1.5} />
                       </div>
                       <span className="text-[12px] font-medium text-slate-700 text-center leading-tight group-hover:text-blue-700 transition-colors">
                          {item.label}
                       </span>
                    </button>
                 );
              })}
           </div>

        </div>
      </div>
    </div>
  );
};
