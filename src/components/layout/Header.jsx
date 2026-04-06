import { Bell, Plus, ChevronDown, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Toast } from '../../lib/utils';

export const Header = ({ setMobileMenuOpen }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  // Get logged-in user info from sessionStorage
  const userName = sessionStorage.getItem('userName') || (() => {
    try { return JSON.parse(sessionStorage.getItem('authToken'))?.userInfo?.[0]?.userName; } catch { return null; }
  })() || 'User';
  const userEmail = sessionStorage.getItem('userEmail') || (() => {
    try { return JSON.parse(sessionStorage.getItem('authToken'))?.userInfo?.[0]?.userEmail; } catch { return null; }
  })() || '';

  const handleAction = (label) => {
    Toast.fire({
      icon: 'info',
      title: `${label} module under development`,
    });
  };

  const handleLogout = () => {
    Swal.fire({
        title: 'Logout Confirmation',
        text: "Are you sure you want to exit?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0f172a',
        cancelButtonColor: '#94a3b8',
        confirmButtonText: 'Yes, logout',
        background: '#ffffff',
        borderRadius: '1rem',
        customClass: {
            popup: 'rounded-2xl border border-slate-100 shadow-xl font-sans',
            title: 'text-slate-800 font-bold',
            cancelButton: 'rounded-xl px-6',
            confirmButton: 'rounded-xl px-6'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Clear session data
            sessionStorage.clear();
            localStorage.clear();
            navigate('/');
        }
    });
  };

  return (
    <header className="h-16 bg-white flex flex-shrink-0 items-center justify-between gap-4 px-4 sticky top-0 z-30 sm:px-6 lg:justify-end">
      
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileMenuOpen(prev => !prev)}
        className="p-2 text-black hover:bg-slate-100 rounded-lg transition-colors lg:hidden"
        aria-label="Open sidebar"
      >
        <Menu size={20} />
      </button>

      {/* Right side Actions */}
      <div className="flex items-center gap-4 ml-auto">
        
        {/* Dropdowns (Responsive) */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Dropdown 1: Company */}
          <div className="relative">
            <select 
              className="appearance-none w-24 sm:w-32 px-2 sm:px-3 py-1.5 border border-slate-200 text-slate-700 bg-white shadow-sm rounded-md hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors text-xs sm:text-sm font-medium cursor-pointer pr-6 sm:pr-8"
              defaultValue="Aabasoft"
              onChange={(e) => handleAction(`Selected Company: ${e.target.value}`)}
            >
              <option value="Aabasoft">Aabasoft</option>
              <option value="Fin-Face">Fin-Face</option>
              <option value="Demo Inc">Demo Inc</option>
            </select>
            <ChevronDown size={14} className="text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Dropdown 2: Year */}
          <div className="relative hidden sm:block">
            <select 
              className="appearance-none w-28 px-2 py-1.5 border border-slate-200 text-slate-700 bg-white shadow-sm rounded-md hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors text-sm font-medium cursor-pointer pr-8"
              defaultValue="2023-2024"
              onChange={(e) => handleAction(`Selected Year: ${e.target.value}`)}
            >
              <option value="2023-2024">2023-2024</option>
              <option value="2024-2025">2024-2025</option>
            </select>
            <ChevronDown size={14} className="text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-slate-200 mx-0.5 sm:mx-1"></div>

        <button 
          onClick={() => handleAction('Create New')}
          className="text-slate-400 hover:text-black transition-colors"
        >
          <Plus size={20} />
        </button>
        
        <button 
          onClick={() => handleAction('Notifications')}
          className="relative text-slate-400 hover:text-black transition-colors"
        >
          <Bell size={20} />
          <span className="absolute top-0.5 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        {/* User Profile */}
        <div className="relative flex items-center gap-2 ml-2">
            <button 
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-1 hover:bg-slate-50 p-1 pr-1.5 rounded-full transition-colors"
            >
              <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=cbd5e1&color=ffffff&bold=true`}
                  alt="UserAvatar"
                  className="h-full w-full object-cover"
                />
              </div>
              <ChevronDown size={14} className="text-slate-400 hidden sm:block ml-1" />
            </button>

            {/* Profile Popover */}
            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 sm:w-72 bg-white rounded-xl shadow-lg border border-slate-100 py-6 px-4 z-50">
                <div className="flex flex-col items-center text-center">
                   <div className="h-20 w-20 rounded-full bg-slate-200 mb-3 flex items-center justify-center overflow-hidden border-2 border-slate-50">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=cbd5e1&color=ffffff&bold=true&size=128`}
                        alt="Avatar Large"
                        className="h-full w-full object-cover"
                      />
                   </div>
                   <h4 className="font-semibold text-slate-900 text-base">{userName}</h4>
                   <p className="text-sm text-slate-500 mb-6">{userEmail || 'No email available'}</p>
                   
                   <div className="flex gap-3 w-full">
                      <button 
                        onClick={() => handleAction('Profile Settings')}
                        className="flex-1 py-2 px-3 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors h-10 flex items-center justify-center"
                      >
                        Settings
                      </button>
                      <button 
                        onClick={handleLogout}
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
