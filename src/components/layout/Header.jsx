import { Bell, Plus, ChevronDown, LogOut, Menu, User } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Toast } from '../../lib/utils';

export const Header = ({ setMobileMenuOpen }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const userName = sessionStorage.getItem('userName') || (() => {
    try { return JSON.parse(sessionStorage.getItem('authToken'))?.userInfo?.[0]?.userName; } catch { return null; }
  })() || 'Admin';
  const userEmail = sessionStorage.getItem('userEmail') || (() => {
    try { return JSON.parse(sessionStorage.getItem('authToken'))?.userInfo?.[0]?.userEmail; } catch { return null; }
  })() || '';

  const handleAction = (label) => {
    Toast.fire({ icon: 'info', title: `${label} module under development` });
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Logout Confirmation',
      text: 'Are you sure you want to exit?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#212529',
      cancelButtonColor: '#adb5bd',
      confirmButtonText: 'Yes, logout',
      background: '#ffffff',
      customClass: {
        popup: 'rounded-xl border border-gray-100 shadow-xl font-sans',
        title: 'text-gray-900 font-semibold',
        cancelButton: 'rounded-lg px-5',
        confirmButton: 'rounded-lg px-5',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear();
        localStorage.clear();
        navigate('/');
      }
    });
  };

  return (
    <header className="h-[64px] bg-white border-b border-gray-200 flex flex-shrink-0 items-center justify-between gap-4 px-5 sticky top-0 z-30">
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileMenuOpen((prev) => !prev)}
        className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
        aria-label="Open sidebar"
      >
        <Menu size={20} />
      </button>

      {/* Right side */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Company dropdown */}
        <div className="relative">
          <select
            className="appearance-none pl-3 pr-8 py-[7px] border border-gray-200 bg-white text-gray-700 rounded-lg text-[13px] font-medium focus:outline-none focus:ring-1 focus:ring-gray-300 cursor-pointer min-w-[130px]"
            defaultValue="Aabasoft"
            onChange={(e) => handleAction(`Selected: ${e.target.value}`)}
          >
            <option value="Aabasoft">Aabasoft</option>
            <option value="Fin-Face">Fin-Face</option>
            <option value="Demo Inc">Demo Inc</option>
          </select>
          <ChevronDown size={13} className="text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Year dropdown */}
        <div className="relative hidden sm:block">
          <select
            className="appearance-none pl-3 pr-8 py-[7px] border border-gray-200 bg-white text-gray-700 rounded-lg text-[13px] font-medium focus:outline-none focus:ring-1 focus:ring-gray-300 cursor-pointer min-w-[110px]"
            defaultValue="2023-2024"
            onChange={(e) => handleAction(`Year: ${e.target.value}`)}
          >
            <option value="2023-2024">2023-2024</option>
            <option value="2024-2025">2024-2025</option>
          </select>
          <ChevronDown size={13} className="text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-gray-200" />

        {/* Plus */}
        <button
          onClick={() => handleAction('Create New')}
          className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Plus size={19} />
        </button>

        {/* Bell */}
        <button
          onClick={() => handleAction('Notifications')}
          className="relative p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Bell size={19} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        {/* Avatar */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-8 h-8 rounded-full bg-gray-200 border border-gray-200 overflow-hidden hover:opacity-90 transition-opacity"
          >
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=343a40&color=ffffff&bold=true`}
              alt="Avatar"
              className="h-full w-full object-cover"
            />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-5 px-4 z-50">
              <div className="flex flex-col items-center text-center gap-1 mb-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden border-2 border-gray-100 mb-2">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=343a40&color=ffffff&bold=true&size=128`}
                    alt="Avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="font-semibold text-gray-900 text-[15px]">{userName}</p>
                <p className="text-[12px] text-gray-400">{userEmail || 'No email'}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleAction('Settings')}
                  className="flex-1 py-2 px-3 border border-gray-200 rounded-lg text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 py-2 px-4 bg-[#212529] hover:bg-black text-white rounded-lg text-[13px] font-medium transition-colors"
                >
                  <LogOut size={14} />
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
