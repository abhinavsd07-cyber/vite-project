import {
  LayoutDashboard,
  User,
  FileText,
  Video,
  FileSearch,
  HelpCircle,
  LogOut,
  Settings,
  Menu,
  ChevronDown,
  X,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useState } from "react";
import { Logo } from "../auth/Logo";

const navItems = [
  { name: "Finsights", icon: LayoutDashboard, href: "#" },
  { name: "Vendor", icon: User, href: "#", hasDropdown: true },
  { name: "Task Uploads", icon: FileText, href: "#" },
  { name: "Request Document", icon: FileSearch, href: "#" },
  { name: "Meetings", icon: Video, href: "#" },
];

export function Sidebar({ collapsed, setCollapsed, onClose }) {
  const [activeItem, setActiveItem] = useState("Finsights");

  return (
    <aside
      className={cn(
        "h-full flex flex-col bg-white border-r border-slate-200 transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-64",
      )}
    >
      {/* Logo + Controls */}
      <div className="flex h-16 items-center flex-shrink-0 px-4 justify-between border-b border-slate-100">
        <div className="flex items-center gap-2 overflow-hidden min-w-0">
          <Logo collapsed={collapsed} />
        </div>

        {/* Desktop collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors hidden lg:block shrink-0"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Menu size={18} />
        </button>

        {/* Mobile close button */}
        <button
          onClick={onClose}
          className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors lg:hidden shrink-0"
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => {
              setActiveItem(item.name);
              if (onClose) onClose();
            }}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
              activeItem === item.name
                ? "bg-[#514d9b] text-white font-medium"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
            )}
            title={collapsed ? item.name : undefined}
          >
            <item.icon
              size={20}
              strokeWidth={1.5}
              className={cn(
                "flex-shrink-0 transition-colors duration-200",
                activeItem === item.name
                  ? "text-white"
                  : "text-slate-500 group-hover:text-slate-800",
              )}
            />
            {!collapsed && (
              <span className="flex-1 text-left whitespace-nowrap text-sm">
                {item.name}
              </span>
            )}
            {!collapsed && item.hasDropdown && (
              <ChevronDown
                size={16}
                className={cn(
                  activeItem === item.name ? "text-white/70" : "text-slate-400",
                )}
              />
            )}
          </button>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="relative overflow-hidden shrink-0">
        <div className="absolute inset-0 z-0 bg-blue-50/50">
          <svg
            className="absolute bottom-0 left-0 w-full text-blue-100/50"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ height: "150%" }}
          >
            <path
              d="M0,100 C30,80 50,60 100,70 L100,100 Z"
              fill="currentColor"
            />
            <path
              d="M0,80 C40,90 60,50 100,60 L100,100 L0,100 Z"
              fill="currentColor"
              opacity="0.5"
            />
          </svg>
        </div>

        <div className="relative z-10 p-3 space-y-1.5">
          {[
            { ItemIcon: HelpCircle, label: "Help" },
            { ItemIcon: Settings, label: "Settings" },
          ].map(({ ItemIcon, label }) => (
            <button
              key={label}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm text-slate-700 hover:bg-white transition-colors border border-white/40 text-sm font-medium",
                collapsed && "justify-center px-0",
              )}
            >
              <ItemIcon size={18} className="text-slate-800 shrink-0" />
              {!collapsed && <span>{label}</span>}
            </button>
          ))}

          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to log out?")) {
                window.location.href = "/";
              }
            }}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm text-slate-700 hover:bg-white transition-colors border border-white/40 text-sm font-medium",
              collapsed && "justify-center px-0",
            )}
          >
            <LogOut size={18} className="text-slate-800 shrink-0" />
            {!collapsed && <span>Log Out</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
