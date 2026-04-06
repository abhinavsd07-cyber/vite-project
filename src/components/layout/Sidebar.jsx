import {
  FileText,
  Settings as SettingsLucide,
  ChevronDown,
  X,
  Menu,
  ClipboardCheck,
  Calendar,
  Briefcase,
  Flag,
  Users as UsersLucide,
  LayoutGrid,
  Mail,
  Video,
} from "lucide-react";
import { DashboardIcon, UsersIcon, VendorIcon, CustomersIcon } from "../icons/SidebarIcons";
import { cn, Toast } from "../../lib/utils";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Logo } from "../auth/Logo";

const navItems = [
  { name: "Dashboard", icon: DashboardIcon, path: "/dashboard" },
  {
    name: "Users",
    icon: UsersIcon,
    subItems: [
      { name: "User List", path: "/users/list" },
      { name: "Create User", path: "/users/create" },
    ],
  },
  { name: "Vendor", icon: VendorIcon, path: "/vendor" },
  {
    name: "Customers",
    icon: CustomersIcon,
    subItems: [
      { name: "Customers List", path: "/customers/list" },
      { name: "Create Customers", path: "/customers/create" },
      { name: "Company List", path: "/customers/companies" },
    ],
  },
  {
    name: "Tasks",
    icon: ClipboardCheck,
    subItems: [
      { name: "Task List", path: "/tasks/list" },
      { name: "Create Task", path: "/tasks/create" },
      { name: "Archived", path: "/tasks/archived" },
    ],
  },
  {
    name: "Settings",
    icon: SettingsLucide,
    subItems: [
      { name: "Master Settings", path: "/settings/master" },
      { name: "Account Settings", path: "/settings/account" },
    ],
  },
];

export const Sidebar = ({ collapsed, onClose }) => {
  const [expandedMenus, setExpandedMenus] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize active expanded menu based on path
  useEffect(() => {
    const currentPath = location.pathname;
    const newExpanded = { ...expandedMenus };
    
    navItems.forEach(item => {
      if (item.subItems) {
        const isChildActive = item.subItems.some(sub => currentPath === sub.path);
        if (isChildActive) {
          newExpanded[item.name] = true;
        }
      }
    });
    
    setExpandedMenus(newExpanded);
  }, []);

  const toggleSubMenu = (name) => {
    if (collapsed) return;
    setExpandedMenus(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const isItemActive = (path) => {
    return location.pathname === path;
  };

  const isParentActive = (item) => {
    if (item.path && isItemActive(item.path)) return true;
    if (item.subItems) {
      return item.subItems.some(sub => isItemActive(sub.path));
    }
    return false;
  };

  const handleItemClick = (item) => {
    if (item.subItems) {
      toggleSubMenu(item.name);
    } else {
      if (onClose && window.innerWidth < 1024) onClose();
      navigate(item.path);
    }
  };

  const handleSubItemClick = (path) => {
    if (onClose && window.innerWidth < 1024) onClose();
    navigate(path);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Logout Confirmation",
      text: "Are you sure you want to exit?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0f172a",
      cancelButtonColor: "#94a3b8",
      confirmButtonText: "Yes, logout",
      background: "#ffffff",
      borderRadius: "1rem",
      customClass: {
        popup: "rounded-2xl border border-slate-100 shadow-xl font-sans",
        title: "text-slate-800 font-bold",
        cancelButton: "rounded-xl px-6",
        confirmButton: "rounded-xl px-6",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear();
        localStorage.clear();
        navigate("/");
      }
    });
  };

  const handlePlaceholderClick = (label) => {
    Toast.fire({
      icon: "info",
      title: `${label} module under development`,
    });
  };

  return (
    <aside
      className={cn(
        "h-full  flex flex-col bg-slate-50 border-r border-slate-200 transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-64",
      )}
   >
      {/* Logo + Controls */}
      <div className="flex pt-6 pb-4 items-center flex-shrink-0 px-6 justify-between bg-white relative">
        <div className="flex items-center gap-2 overflow-hidden min-w-0 whitespace-nowrap">
          <Logo collapsed={collapsed} />
        </div>

        {/* Mobile Close Button (X) */}
        {!collapsed && (
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors shrink-0"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        )}

        {/* Desktop Toggle Button (only when collapsed) */}
        {collapsed && (
          <button
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors shrink-0"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto pt-6 pb-12 px-4 space-y-1 bg-white scrollbar-thin">
        {navItems.map((item) => {
          const parentActive = isParentActive(item);
          
          return (
            <div key={item.name} className="flex flex-col mb-1 group">
              <button
                onClick={() => handleItemClick(item)}
                className={cn(
                  "w-full flex items-center gap-3 py-2.5 px-3 rounded-lg transition-all duration-200 relative text-[15px]",
                  collapsed ? "justify-center px-0" : "",
                  parentActive
                    ? "text-slate-800 font-semibold"
                    : "text-slate-400 font-medium hover:text-slate-600 hover:bg-slate-50/50",
                )}
                title={collapsed ? item.name : undefined}
              >
                <item.icon
                  size={20}
                  strokeWidth={parentActive ? 2 : 1.75}
                  className={cn(
                    "flex-shrink-0 transition-colors duration-200",
                    parentActive ? "text-slate-800" : "text-slate-400 group-hover:text-slate-600",
                  )}
                />
                {!collapsed && (
                  <span className="flex-1 text-left whitespace-nowrap">
                    {item.name}
                  </span>
                )}
                {!collapsed && item.subItems && (
                  <ChevronDown
                    size={16}
                    strokeWidth={2}
                    className={cn(
                      "transition-transform",
                      expandedMenus[item.name] ? "rotate-180 text-slate-600" : "text-slate-400 group-hover:text-slate-500"
                    )}
                  />
                )}
              </button>
              
              {/* Nested submenu */}
              {!collapsed && item.subItems && item.subItems.length > 0 && expandedMenus[item.name] && (
                <div className="mt-1 ml-[22px] border-l-[1.5px] border-slate-200 py-1 flex flex-col gap-1 relative">
                  {item.subItems.map(subItem => {
                    const active = isItemActive(subItem.path);
                    return (
                      <div key={subItem.name} className="relative flex items-center">
                        <div className={cn(
                          "absolute left-[-4.5px] top-1/2 -translate-y-1/2 w-[8px] h-[8px] rounded-full",
                          active ? "bg-slate-800" : "bg-slate-200"
                        )} />
                        
                        <button
                          onClick={() => handleSubItemClick(subItem.path)}
                          className={cn(
                            "w-full flex items-center py-2 px-3 ml-3 rounded-md transition-all duration-200 text-[14px]",
                            active
                              ? "text-slate-900 font-semibold"
                              : "text-slate-500 hover:text-slate-700 hover:bg-slate-50/50"
                          )}
                        >
                          {subItem.name}
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      
    </aside>
  );
};
