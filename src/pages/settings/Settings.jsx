import { Briefcase, LayoutGrid, Flag, CalendarDays, Users, UserCog } from 'lucide-react';
import { useNavigate, Outlet } from 'react-router-dom';

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
    <div className="flex flex-col h-full bg-[#f8f9fa] w-full animate-fade-in">
      {/* Header */}
      <div className="px-6 py-4 shrink-0">
        <h1 className="text-xl font-bold text-slate-800">Master Settings</h1>
      </div>

      {/* Main Content Area */}
      <div className="px-6 flex-1">
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 min-h-[200px]">
           
           <div className="flex flex-wrap gap-x-6 gap-y-6">
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
                       className="group flex flex-col items-center justify-start w-[90px] outline-none"
                    >
                       {/* Icon Container box */}
                       <div className="w-[80px] h-[80px] rounded-lg border border-slate-200 bg-white flex items-center justify-center mb-2 group-hover:border-slate-300 group-hover:shadow-sm transition-all duration-200">
                          <Icon size={24} className="text-slate-500 group-hover:text-slate-700 transition-colors" strokeWidth={1.5} />
                       </div>
                       <span className="text-[12px] font-normal text-slate-600 text-center leading-tight group-hover:text-slate-800 transition-colors">
                          {item.label}
                       </span>
                    </button>
                 );
              })}
           </div>

        </div>
      </div>
      
      {/* Drawer Overlay Target */}
      <Outlet />
    </div>
  );
};
