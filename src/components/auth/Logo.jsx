import { cn } from "../../lib/utils";

export function Logo({ collapsed = false, className = "" }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("flex items-start shrink-0", collapsed && "mx-auto")}>
        <svg
          width="32"
          height="40"
          viewBox="0 0 32 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Recreating the Finbook symbol: 3 upright bars, the last one has a bottom horizontal crossing */}
          <rect x="0" y="8" width="6" height="12" fill="#222" />
          <rect x="10" y="8" width="6" height="12" fill="#222" />
          <rect x="20" y="8" width="6" height="32" fill="#222" />
          <rect x="10" y="24" width="16" height="6" fill="#222" />
        </svg>
      </div>
      {!collapsed && (
        <div className="flex flex-col">
          <span
            className="text-2xl leading-none text-[#222]"
            style={{ fontFamily: "Georgia, serif", letterSpacing: "0.05em" }}
          >
            finbook
          </span>
          <span
            className="text-xl leading-none text-[#888]"
            style={{
              fontFamily: "Georgia, serif",
              letterSpacing: "0.08em",
              marginLeft: "1.25rem",
            }}
          >
            globa<span style={{ color: "#E53E3E" }}>l</span>
          </span>
        </div>
      )}
    </div>
  );
}
