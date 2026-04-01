import {
  FileText,
  Video,
  FileSearch,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  ChevronRight,
  X,
  Circle,
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
    name: "Doc Management",
    icon: FileText,
    subItems: [
      { name: "Doc List", path: "/docs/list" },
      { name: "Upload Doc", path: "/docs/upload" },
      { name: "Archived", path: "/docs/archived" },
    ],
  },
  { name: "Settings", icon: Settings, path: "/settings" },
  { name: "Meetings", icon: Video, path: "/meetings" },
  { name: "Document Request", icon: FileSearch, path: "/document-requests" },
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
   style={{width:"300px"}} >
      {/* Logo + Controls */}
      <div className="flex h-16 items-center flex-shrink-0 px-4 justify-between border-b border-slate-200 bg-white">
        <div className="flex items-center gap-2 overflow-hidden min-w-0">
          <Logo collapsed={collapsed} />
        </div>

        <button
          onClick={onClose}
          className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors lg:hidden shrink-0"
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 bg-white">
        {navItems.map((item) => {
          const parentActive = isParentActive(item);
          
          return (
            <div key={item.name} className="flex flex-col">
              <button
                onClick={() => handleItemClick(item)}
                className={cn(
                  "w-full flex items-center gap-3 py-3 px-3 rounded-lg transition-all duration-200 group relative text-sm font-medium",
                  collapsed ? "justify-center px-0" : "",
                  parentActive && !item.subItems
                    ? "text-[#ce2a2a] bg-[#fff5f5]" // Theme red color from screenshot
                    : "text-slate-700 hover:bg-slate-50",
                )}
                title={collapsed ? item.name : undefined}
              >
                <item.icon
                  size={20}
                  strokeWidth={parentActive ? 2 : 1.5}
                  className={cn(
                    "flex-shrink-0 transition-colors duration-200",
                    parentActive && !item.subItems ? "text-[#ce2a2a]" : "text-slate-500",
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
                    className={cn(
                      "transition-transform",
                      expandedMenus[item.name] ? "rotate-180 text-slate-700" : "text-slate-400"
                    )}
                  />
                )}
              </button>
              
              {/* Nested submenu */}
              {!collapsed && item.subItems && expandedMenus[item.name] && (
                <div className="mt-1 ml-4 border-l border-slate-200 pl-4 py-1 space-y-1">
                  {item.subItems.map(subItem => {
                    const active = isItemActive(subItem.path);
                    return (
                      <button
                        key={subItem.name}
                        onClick={() => handleSubItemClick(subItem.path)}
                        className={cn(
                          "w-full flex items-center gap-3 py-2 px-3 rounded-lg transition-all duration-200 text-sm",
                          active
                            ? "bg-slate-100 text-black font-semibold"
                            : "text-slate-600 hover:text-black hover:bg-slate-50"
                        )}
                      >
                        <Circle size={8} className={cn(
                            "fill-current",
                            active ? "text-slate-800" : "text-slate-300"
                        )}/>
                        <span>{subItem.name}</span>
                      </button>
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
