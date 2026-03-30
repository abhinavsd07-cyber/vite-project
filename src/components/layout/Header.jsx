import { Bell, Plus, Search, ChevronDown, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useSearch } from '../../context/SearchContext';
import { Toast } from '../../lib/utils';

export const Header = ({ setMobileMenuOpen }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const { searchQuery, setSearchQuery } = useSearch();
  const navigate = useNavigate();

  // Get logged-in user info from sessionStorage
  const userName = sessionStorage.getItem('userName') || (() => {
    try { return JSON.parse(sessionStorage.getItem('authToken'))?.userInfo?.[0]?.userName; } catch { return null; }
  })() || 'User';
  const userEmail = sessionStorage.getItem('userEmail') || (() => {
    try { return JSON.parse(sessionStorage.getItem('authToken'))?.userInfo?.[0]?.userEmail; } catch { return null; }
  })() || '';
  const avatarInitials = userName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

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
    <header className="h-16 bg-white/80 backdrop-blur-md flex items-center px-3 sm:px-4 md:px-6 sticky top-0 z-30 flex-shrink-0">
      
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileMenuOpen(prev => !prev)}
        className="p-2 text-black hover:bg-slate-100 rounded-lg transition-colors lg:hidden mr-2"
        aria-label="Open sidebar"
      >
        <Menu size={20} />
      </button>

      {/* Single unified bar: Search + Actions + Profile */}
      <div className="flex-1 flex items-center bg-white border border-slate-100 rounded-xl px-4 h-11 shadow-sm">
        
        {/* Search section */}
        <Search size={16} className="text-slate-400 flex-shrink-0" />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search here..." 
          className="flex-1 pl-3 pr-4 py-2 bg-transparent text-sm focus:outline-none placeholder-slate-400"
        />

        {/* Right side: +, Bell, Profile — all inside the same bar */}
        <div className="flex items-center gap-4 sm:gap-5 ml-auto pl-4 border-l border-slate-100">
          <button 
            onClick={() => handleAction('Create New')}
            className="text-slate-500 hover:text-black transition-colors hidden sm:block"
          >
            <Plus size={20} />
          </button>
          <button 
            onClick={() => handleAction('Notifications')}
            className="relative text-slate-500 hover:text-black transition-colors"
          >
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>

          {/* Divider */}
          <div className="w-px h-5 bg-slate-200"></div>

          {/* User Profile */}
          <div className="relative flex items-center gap-2">
            <button 
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 hover:bg-slate-50 p-1 pr-2 rounded-full transition-colors"
            >
              <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=cbd5e1&color=ffffff&bold=true`}
                  alt="UserAvatar"
                  className="h-full w-full object-cover"
                />
              </div>
              <ChevronDown size={14} className="text-black hidden sm:block" />
            </button>

            {/* Profile Popover */}
            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 sm:w-72 bg-white rounded-xl shadow-lg border border-slate-100 py-6 px-4 z-50 animate-slide-up">
                <div className="flex flex-col items-center text-center">
                   <div className="h-20 w-20 rounded-full bg-slate-200 mb-3 flex items-center justify-center overflow-hidden">
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
      </div>
    </header>
  );
}
