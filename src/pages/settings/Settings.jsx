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
        <div className="bg-white rounded-[20px] border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-8 min-h-[500px]">
           
           <div className="flex flex-wrap gap-6">
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
                       className="group flex flex-col items-center justify-center p-5 w-[140px] rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
                    >
                       {/* Icon Container box */}
                       <div className="w-16 h-16 rounded-[14px] border border-slate-200 bg-white flex items-center justify-center mb-4 group-hover:shadow-sm transition-shadow">
                          <Icon size={24} className="text-slate-600 group-hover:text-slate-900 transition-colors" strokeWidth={1.5} />
                       </div>
                       <span className="text-[13px] font-medium text-slate-700 text-center leading-tight min-h-[32px]">
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
