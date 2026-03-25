import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const lineData = [
  { name: 'Jan', revenue: 4000, profit: 2400 },
  { name: 'Feb', revenue: 3000, profit: 1398 },
  { name: 'Mar', revenue: 5000, profit: 2800 },
  { name: 'Apr', revenue: 4500, profit: 3908 },
  { name: 'May', revenue: 6000, profit: 4800 },
  { name: 'Jun', revenue: 5500, profit: 3800 },
];

const barData = [
  { name: 'Q1', target: 4000, acheived: 3800 },
  { name: 'Q2', target: 3000, acheived: 3500 },
  { name: 'Q3', target: 5000, acheived: 4800 },
  { name: 'Q4', target: 4500, acheived: 5200 },
];

const pieData = [
  { name: 'Services', value: 400 },
  { name: 'Products', value: 300 },
  { name: 'Consulting', value: 300 },
  { name: 'Other', value: 100 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

export function MainLineChart() {
  return (
    <div className="interactive-card p-6 h-[350px]">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-800">Financial Growth (Line)</h2>
      </div>
      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={lineData} margin={{ top: 5, right: 30, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(value) => `$${value/1000}k`} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
            <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
            <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="profit" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function PerformanceBarChart() {
  return (
    <div className="interactive-card p-6 h-[350px]">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-800">Quarterly Targets (Bar)</h2>
      </div>
      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(value) => `$${value/1000}k`} />
            <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
            <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
            <Bar dataKey="target" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar dataKey="acheived" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function DistributionPieChart() {
  return (
    <div className="interactive-card p-6 h-[350px]">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-800">Revenue Distribution (Pie)</h2>
      </div>
      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
            <Legend iconType="circle" layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '12px' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
