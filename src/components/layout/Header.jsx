import { Bell, Plus, Search, ChevronDown, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Header({ setMobileMenuOpen }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md flex items-center px-3 sm:px-4 md:px-6 justify-between sticky top-0 z-30 flex-shrink-0 border-b border-slate-100">
      
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileMenuOpen(prev => !prev)}
        className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors lg:hidden mr-2"
        aria-label="Open sidebar"
      >
        <Menu size={20} />
      </button>

      {/* Search Bar */}
      <div className="flex-1 max-w-2xl hidden sm:flex">
        <div className="relative w-full max-w-xl">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search here..." 
            className="w-full pl-11 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 transition-shadow"
          />
        </div>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-2 sm:gap-4 ml-auto">
        
        {/* Action Icons */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors hidden sm:block">
            <Plus size={20} strokeWidth={1.5} />
          </button>
          <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
            <Bell size={20} strokeWidth={1.5} />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>

        {/* User Profile */}
        <div className="relative ml-1 sm:ml-2">
          <button 
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 hover:bg-slate-50 p-1 pr-2 rounded-full transition-colors"
          >
            <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
              <img
                src="https://ui-avatars.com/api/?name=User&background=cbd5e1&color=ffffff&bold=true"
                alt="UserAvatar"
                className="h-full w-full object-cover"
              />
            </div>
            <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
          </button>

          {/* Profile Popover */}
          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-lg border border-slate-100 py-6 px-4 z-50 animate-slide-up">
              <div className="flex flex-col items-center text-center">
                 <div className="h-20 w-20 rounded-full bg-slate-200 mb-3 flex items-center justify-center overflow-hidden">
                    <img
                      src="https://ui-avatars.com/api/?name=User&background=cbd5e1&color=ffffff&bold=true&size=128"
                      alt="Avatar Large"
                      className="h-full w-full object-cover"
                    />
                 </div>
                 <h4 className="font-semibold text-slate-900 text-base">Finbook User</h4>
                 <p className="text-sm text-slate-500 mb-6">user@finbook.com</p>
                 
                 <div className="flex gap-3 w-full">
                    <button className="flex-1 py-2 px-3 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors h-10 flex items-center justify-center">
                      Change password
                    </button>
                    <button 
                      onClick={() => navigate('/')}
                      className="flex-shrink-0 flex items-center gap-2 py-2 px-4 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-sm font-medium transition-colors h-10"
                    >
                      <LogOut size={16} />
                      Log out
                    </button>
                 </div>
              </div>
            </div>
          )}
        </div>
        
      </div>
    </header>
  );
}
