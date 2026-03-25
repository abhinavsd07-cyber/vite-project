import { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';
import { 
  BarChart2, FileText, Banknote, CreditCard, 
  TrendingUp, TrendingDown, Coins 
} from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-lg">
        <p className="font-medium text-slate-800 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-slate-600">{entry.name}:</span>
            <span className="font-medium">${entry.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const HorizontalBarTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-lg">
        <p className="font-medium text-slate-800">{label} ({payload[0].value}%)</p>
        <p className="text-slate-500 mt-1">$ 123,456.78</p>
      </div>
    );
  }
  return null;
};

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('Profit & Loss');

  // Dummy data for Performance Overview
  const performanceData = [
    { name: 'JAN', revenue: 130000, expenses: 110000, profit: 50000 },
    { name: 'FEB', revenue: 30000, expenses: 25000, profit: 15000 },
    { name: 'MAR', revenue: 180000, expenses: 160000, profit: 80000 },
    { name: 'APR', revenue: 90000, expenses: 80000, profit: 40000 },
    { name: 'MAY', revenue: 140000, expenses: 120000, profit: 60000 },
    { name: 'JUN', revenue: 90000, expenses: 80000, profit: 40000 },
    { name: 'JUL', revenue: 200000, expenses: 170000, profit: 90000 },
    { name: 'AUG', revenue: 30000, expenses: 25000, profit: 15000 },
    { name: 'SEP', revenue: 110000, expenses: 90000, profit: 45000 },
    { name: 'OCT', revenue: 140000, expenses: 120000, profit: 60000 },
    { name: 'NOV', revenue: 200000, expenses: 170000, profit: 90000 },
    { name: 'DEC', revenue: 80000, expenses: 70000, profit: 30000 },
  ];

  // Dummy data for mini sparklines
  const sparklineData1 = [{ v: 0 }, { v: 10 }, { v: 5 }, { v: 20 }, { v: 15 }, { v: 30 }];
  const sparklineData2 = [{ v: 30 }, { v: 20 }, { v: 25 }, { v: 10 }, { v: 15 }, { v: 0 }];
  const sparklineData3 = [{ v: 5 }, { v: 10 }, { v: 15 }, { v: 20 }, { v: 25 }, { v: 30 }];

  // Dummy data for Top Expenses (Semi-circle)
  const topExpensesData = [
    { name: 'Taxes Paid (61%)', value: 200210.00, color: '#3b82f6' },
    { name: 'Interest Paid (10%)', value: 200210.00, color: '#f87171' },
    { name: 'Utilities (29%)', value: 200210.00, color: '#f59e0b' },
  ];

  // Dummy data for Top Revenue (Doughnut)
  const topRevenueData = [
    { name: 'Service Fee Income', value: 30, color: '#ef4444' },
    { name: 'Rental Income', value: 20, color: '#fef08a' },
    { name: 'Commission Income', value: 25, color: '#e879f9' },
    { name: 'Consulting Fees', value: 15, color: '#ede9fe' },
    { name: 'Royalties', value: 10, color: '#93c5fd' },
  ];

  // Dummy data for Top Expenses Tab (Horizontal Bar)
  const horizontalExpensesData = [
    { name: 'Taxes Paid', value: 95 },
    { name: 'Interest Paid', value: 80 },
    { name: 'Utilities', value: 42 },
    { name: 'Repair Maintenance', value: 40 },
    { name: 'Supplies Materials', value: 35 },
    { name: 'Payroll Expenses', value: 25 },
    { name: 'Travel', value: 20 },
    { name: 'Travel Meals', value: 15 },
  ];

  // Dummy data for Revenue Tab (Horizontal Bar)
  const horizontalRevenueData = [
    { name: 'Sales Of Physical Merchandise', value: 82 },
    { name: 'Royalty Income', value: 58 },
    { name: 'Commission Earnings', value: 43 },
    { name: 'Charges From Subscription-Based Services', value: 33 },
    { name: 'Fees From Professional Service Provision', value: 23 },
    { name: 'Earnings From Franchise Business Operations', value: 13 },
    { name: 'Fees From Licensing Intellectual Property Rights', value: 8 },
    { name: 'Charges From Subscription-Based Services (Other)', value: 3 },
  ];

  return (
    <div className="flex flex-col gap-4 sm:gap-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-800">Dashboard</h2>
      </div>

      {/* Tabs - horizontally scrollable on mobile */}
      <div className="flex overflow-x-auto scrollbar-hide gap-1 sm:gap-2 border-b border-slate-200 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        {[
          { tab: 'Profit & Loss', TabIcon: BarChart2 },
          { tab: 'Top Expenses', TabIcon: FileText },
          { tab: 'Cash Reports', TabIcon: Banknote },
          { tab: 'Account Receivable / Payable', TabIcon: CreditCard },
        ].map(({ tab, TabIcon }) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap shrink-0 ${
              activeTab === tab
                ? 'bg-[#7c3aed] text-white shadow-sm'
                : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            <TabIcon className="w-4 h-4" />
            <span className="text-xs sm:text-sm">{tab}</span>
          </button>
        ))}
      </div>

      {/* Top Value Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-500 shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Total Revenue</p>
              <h3 className="text-2xl font-bold text-slate-800">$16,670.79</h3>
            </div>
          </div>
          <div className="w-24 h-12 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineData1}>
                <Line type="monotone" dataKey="v" stroke="#22c55e" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
           <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-500 shrink-0">
              <TrendingDown className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Total Expense</p>
              <h3 className="text-2xl font-bold text-slate-800">$623,516.96</h3>
            </div>
          </div>
          <div className="w-24 h-12 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineData2}>
                <Line type="monotone" dataKey="v" stroke="#ef4444" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
           <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
              <Coins className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Net Profit</p>
              <h3 className="text-2xl font-bold text-slate-800">$623,516.96</h3>
            </div>
          </div>
          <div className="w-24 h-12 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineData3}>
                <Line type="monotone" dataKey="v" stroke="#94a3b8" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {activeTab === 'Profit & Loss' && (
        <>
          {/* Performance Overview */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <h3 className="text-lg font-semibold text-slate-800">Performance Overview</h3>
              <div className="flex items-center gap-4 text-sm font-medium">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#10b981]"></div>
                  <span className="text-slate-500">Total Revenue</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#f87171]"></div>
                  <span className="text-slate-500">Total Expenses</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#312e81]"></div>
                  <span className="text-slate-500">Profit</span>
                </div>
                <span className="text-[#7c3aed] ml-2 cursor-pointer hover:underline border-b-2 border-[#7c3aed]">All</span>
              </div>
            </div>
            <div className="h-[220px] sm:h-[280px] lg:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={2} barSize={8}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(value) => `$${value/1000} K`} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="revenue" name="Total Revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" name="Total Expenses" fill="#f87171" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="profit" name="Profit" fill="#312e81" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bottom Grid: Top Expenses & Top Revenue */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            
            {/* Top Expenses (Gauge) */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full">
              <h3 className="text-lg font-semibold text-slate-800 mb-6">Top Expenses</h3>
              <div className="flex-1 flex flex-col items-center justify-center relative min-h-[250px]">
                <div className="h-[200px] w-full relative flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={topExpensesData}
                        cx="50%"
                        cy="100%"
                        startAngle={180}
                        endAngle={0}
                        innerRadius={90}
                        outerRadius={120}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                      >
                        {topExpensesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  
                  {/* Gauge Text Center */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-center">
                    <span className="text-sm font-medium text-slate-500">Total Expenses</span>
                    <span className="text-3xl font-bold text-slate-800 mt-1">$4,652.42</span>
                  </div>
                </div>

                {/* Legend */}
                <div className="mt-8 flex justify-center gap-8 w-full border-t border-slate-100 pt-6">
                  {topExpensesData.map((item, i) => (
                    <div key={i} className="flex flex-col items-center text-center">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-xs font-semibold text-slate-600">{item.name}</span>
                      </div>
                      <span className="text-sm font-bold text-slate-800">${item.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Revenue (Doughnut) */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full">
              <h3 className="text-lg font-semibold text-slate-800 mb-6">Top Revenue</h3>
              <div className="flex-1 flex flex-col relative min-h-[250px]">
                <div className="h-[220px] w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={topRevenueData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={100}
                        paddingAngle={1}
                        dataKey="value"
                        stroke="none"
                      >
                        {topRevenueData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Legend */}
                <div className="mt-6 grid grid-cols-2 gap-y-4 gap-x-2 w-full max-w-sm mx-auto">
                  {topRevenueData.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }}></div>
                      <span className="text-xs font-medium text-slate-500 truncate">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Row: Summary & Expenses */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            
            {/* Summary Line Chart */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-semibold text-slate-800">Summary</h3>
                <div className="relative">
                  <select className="appearance-none bg-white border border-slate-200 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500">
                    <option>Expense</option>
                    <option>Revenue</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 lg:gap-12 flex-1">
                {/* Left stats */}
                <div className="flex flex-col justify-center">
                  <p className="text-sm font-medium text-slate-500 mb-1">Total Spend</p>
                  <h3 className="text-3xl font-bold text-slate-900 mb-3">$4,652.42</h3>
                  
                  <div className="flex flex-col gap-2">
                    <div className="bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full inline-flex items-center w-fit gap-1">
                      Increased By 20 %
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                    </div>
                    <span className="text-xs text-slate-400">Compared To Last Year</span>
                  </div>
                </div>

                {/* Right Chart */}
                <div className="flex-1 h-[250px] min-w-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { name: 'JAN', value: 100 },
                      { name: 'FEB', value: 320 },
                      { name: 'MAR', value: 150 },
                      { name: 'APR', value: 250 },
                      { name: 'MAY', value: 380 },
                      { name: 'JUN', value: 250 },
                      { name: 'JUL', value: 480 },
                      { name: 'AUG', value: 200 },
                      { name: 'SEP', value: 90 },
                      { name: 'OCT', value: 300 },
                      { name: 'NOV', value: 450 },
                      { name: 'DEC', value: 180 },
                    ]} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={(val) => `$ ${val}`} domain={[0, 600]} ticks={[0, 100, 300, 600]} />
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-[#2a2a2a] text-white text-xs font-semibold px-2 py-1.5 rounded transform -translate-y-2 relative">
                                ${payload[0].value.toFixed(2)}
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#2a2a2a] rotate-45"></div>
                              </div>
                            );
                          }
                          return null;
                        }} 
                        cursor={{ stroke: '#f1f5f9', strokeWidth: 1, strokeDasharray: '3 3' }}
                      />
                      <Line type="linear" dataKey="value" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 3 }} activeDot={{ r: 6, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 2 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Expenses Donut Indicator */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full items-center text-center">
              <h3 className="text-lg font-semibold text-slate-800 w-full text-left mb-4">Expenses</h3>
              <div className="flex-1 flex flex-col items-center justify-center relative w-full mt-4">
                
                <div className="h-[200px] w-full relative flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Value', value: 78, color: '#f59e0b' },
                          { name: 'Empty', value: 22, color: '#f1f5f9' },
                        ]}
                        cx="50%"
                        cy="100%"
                        startAngle={180}
                        endAngle={0}
                        innerRadius={85}
                        outerRadius={95}
                        dataKey="value"
                        stroke="none"
                        cornerRadius={10}
                      >
                        {[
                          { name: 'Value', value: 78, color: '#d97706' },
                          { name: 'Empty', value: 22, color: '#e2e8f0' },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  
                  {/* Center Text inside gauge */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <span className="text-4xl font-semibold text-slate-800 tracking-tight">78%</span>
                  </div>
                </div>

                {/* Subtext */}
                <div className="mt-8 flex flex-col">
                  <span className="text-3xl font-semibold text-slate-800 tracking-tight">82.5k</span>
                  <span className="text-xs text-slate-400 max-w-[140px] mt-1 mx-auto leading-relaxed">$21k Expenses More Than Last Month</span>
                </div>
              </div>
            </div>

          </div>
        </>
      )}

      {activeTab === 'Top Expenses' && (
        <div className="flex flex-col gap-6">
          {/* Detailed Top Expenses Bar Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">Top Expenses</h3>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={horizontalExpensesData}
                  layout="vertical"
                  margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
                  barSize={12}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis 
                    type="number" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12 }} 
                    domain={[0, 100]} 
                    tickFormatter={(val) => `${val}%`}
                    position="top"
                    orientation="top"
                  />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#475569', fontSize: 12, fontWeight: 500 }}
                    width={110}
                  />
                  <Tooltip cursor={{ fill: '#f8fafc' }} content={<HorizontalBarTooltip />} />
                  <Bar dataKey="value" fill="#58508d" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Detailed Revenue Bar Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">Revenue</h3>
            <div className="h-[450px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={horizontalRevenueData}
                  layout="vertical"
                  margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
                  barSize={12}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis 
                    type="number" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12 }} 
                    domain={[0, 100]} 
                    tickFormatter={(val) => `${val}%`}
                    position="top"
                    orientation="top"
                  />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#475569', fontSize: 11, fontWeight: 500 }} 
                    width={175}
                  />
                  <Tooltip cursor={{ fill: '#f8fafc' }} content={<HorizontalBarTooltip />} />
                  <Bar dataKey="value" fill="#6a82af" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Put placeholders for other tabs if they click on them */}
      {activeTab !== 'Profit & Loss' && activeTab !== 'Top Expenses' && (
        <div className="bg-white p-12 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
           <p className="text-slate-500 text-lg">No data available for {activeTab}</p>
        </div>
      )}
    </div>
  );
}

