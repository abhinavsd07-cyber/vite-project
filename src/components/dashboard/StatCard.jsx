import { cn } from '../../lib/utils';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export function StatCard({ title, value, change, changeText, trend, icon: Icon, colorClass }) {
  const isPositive = trend === 'up';

  return (
    <div className="interactive-card p-5 lg:p-6 group cursor-pointer hover:shadow-blue-500/5">
      <div className="flex items-start justify-between">
        <div className="space-y-4">
          <p className="text-sm font-medium text-slate-500 group-hover:text-slate-700 transition-colors uppercase tracking-wider">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-display font-semibold text-slate-900 tracking-tight">{value}</h3>
          </div>
        </div>
        
        <div className={cn("p-2.5 rounded-xl transition-transform group-hover:scale-110", colorClass)}>
          <Icon size={22} />
        </div>
      </div>
      
      <div className="mt-4 flex items-center gap-2 text-sm">
        <span className={cn(
          "flex items-center gap-1 font-medium px-2 py-0.5 rounded-full text-xs",
          isPositive ? "text-emerald-700 bg-emerald-50" : "text-rose-700 bg-rose-50"
        )}>
          {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {change}
        </span>
        <span className="text-slate-400">{changeText}</span>
      </div>
    </div>
  );
}
