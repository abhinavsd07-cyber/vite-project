import {
  Settings as SettingsLucide,
  ChevronDown,
  X,
  Menu,
  ClipboardCheck,
} from "lucide-react";
import { DashboardIcon, UsersIcon, VendorIcon, CustomersIcon } from "../icons/SidebarIcons";
import { cn, Toast } from "../../lib/utils";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const [expandedMenus, setExpandedMenus] = useState(() => {
    // Initialize expanded menus based on current path — runs once on mount
    const currentPath = window.location.pathname;
    const initial = {};
    navItems.forEach((item) => {
      if (item.subItems) {
        const isChildActive = item.subItems.some((sub) => currentPath === sub.path);
        if (isChildActive) initial[item.name] = true;
      }
    });
    return initial;
  });

  const location = useLocation();
  const navigate = useNavigate();

  const toggleSubMenu = (name) => {
    if (collapsed) return;
    setExpandedMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const isItemActive = (path) => location.pathname === path;

  const isParentActive = (item) => {
    if (item.path && isItemActive(item.path)) return true;
    if (item.subItems) return item.subItems.some((sub) => isItemActive(sub.path));
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

  return (
    <aside
      className={cn(
        "h-full flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
        collapsed ? "w-[72px]" : "w-[272px]"
      )}
    >
      {/* Logo area */}
      <div className={cn(
        "flex items-center border-b border-gray-100",
        collapsed ? "justify-center h-[81px]" : "justify-between px-5 py-5"
      )}>
        {!collapsed && (
          <div className="flex items-center gap-2 overflow-hidden min-w-0">
            <Logo collapsed={collapsed} />
          </div>
        )}
        {/* Desktop collapse button */}
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors shrink-0"
          aria-label="Toggle sidebar"
        >
          {collapsed ? <Menu size={20} /> : <X size={18} className="lg:hidden" />}
          {!collapsed && <Menu size={18} className="hidden lg:block" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5 scrollbar-thin">
        {navItems.map((item) => {
          const parentActive = isParentActive(item);
          const isExpanded = expandedMenus[item.name];

          return (
            <div key={item.name}>
              <button
                onClick={() => handleItemClick(item)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-[10px] rounded-lg transition-all duration-150 text-[14px] group",
                  collapsed ? "justify-center px-2" : "",
                  parentActive
                    ? "text-gray-900 font-medium"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                )}
                title={collapsed ? item.name : undefined}
              >
                <item.icon
                  size={19}
                  strokeWidth={parentActive ? 2 : 1.6}
                  className={cn(
                    "flex-shrink-0 transition-colors",
                    parentActive ? "text-gray-900" : "text-gray-400 group-hover:text-gray-600"
                  )}
                />
                {!collapsed && (
                  <span className="flex-1 text-left whitespace-nowrap leading-none">
                    {item.name}
                  </span>
                )}
                {!collapsed && item.subItems && (
                  <ChevronDown
                    size={15}
                    strokeWidth={2}
                    className={cn(
                      "transition-transform duration-200 text-gray-400",
                      isExpanded ? "rotate-180" : ""
                    )}
                  />
                )}
              </button>

              {/* Submenu */}
              {!collapsed && item.subItems && isExpanded && (
                <div className="mt-0.5 ml-[30px] pl-3 border-l border-gray-200 py-1 flex flex-col gap-0.5">
                  {item.subItems.map((subItem) => {
                    const active = isItemActive(subItem.path);
                    return (
                      <div key={subItem.name} className="relative flex items-center">
                        {/* dot indicator */}
                        <div
                          className={cn(
                            "absolute left-[-13px] top-1/2 -translate-y-1/2 w-[7px] h-[7px] rounded-full border-2",
                            active
                              ? "bg-gray-800 border-gray-800"
                              : "bg-white border-gray-300"
                          )}
                        />
                        <button
                          onClick={() => handleSubItemClick(subItem.path)}
                          className={cn(
                            "w-full text-left py-[8.5px] px-3.5 rounded-lg text-[13.5px] transition-colors duration-150 relative overflow-hidden",
                            active
                              ? "text-gray-900 font-medium bg-gray-100/80"
                              : "text-gray-500 hover:text-gray-700 hover:bg-gray-50/50"
                          )}
                        >
                          {subItem.name}
                        </button>
                      </div>
                    );
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
