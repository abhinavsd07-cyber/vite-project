import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000, expenses: 2400 },
  { name: 'Feb', revenue: 3000, expenses: 1398 },
  { name: 'Mar', revenue: 5000, expenses: 2800 },
  { name: 'Apr', revenue: 4500, expenses: 3908 },
  { name: 'May', revenue: 6000, expenses: 4800 },
  { name: 'Jun', revenue: 5500, expenses: 3800 },
  { name: 'Jul', revenue: 7000, expenses: 4300 },
  { name: 'Aug', revenue: 8000, expenses: 5100 },
  { name: 'Sep', revenue: 6800, expenses: 4800 },
  { name: 'Oct', revenue: 7500, expenses: 5300 },
  { name: 'Nov', revenue: 8500, expenses: 6000 },
  { name: 'Dec', revenue: 9500, expenses: 6800 },
];

export function RevenueChart() {
  return (
    <div className="interactive-card p-6 h-[400px]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Financial Overview</h2>
          <p className="text-sm text-slate-500 hidden sm:block">Revenue vs Expenses over time</p>
        </div>
        <select className="bg-slate-50 border border-slate-200 text-sm rounded-lg px-3 py-1.5 text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
          <option>This Year</option>
          <option>Last Year</option>
          <option>Last 6 Months</option>
        </select>
      </div>
      
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#64748b' }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
              tickFormatter={(value) => `$${value/1000}k`}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
              itemStyle={{ fontSize: '14px', fontWeight: 500 }}
            />
            <Area type="monotone" dataKey="expenses" stroke="#94a3b8" strokeWidth={2} fillOpacity={1} fill="url(#colorExpenses)" />
            <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
