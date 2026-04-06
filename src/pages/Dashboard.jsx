import { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, Label, LabelList
} from 'recharts';
import { Toast } from '../lib/utils';
import {
  TrendingUp, TrendingDown, Coins, BarChart2, FileText, PieChart as LucidePieChart, Info, Download, Filter, MoreVertical, Search, Bell, Plus, Menu, Banknote, CreditCard, ChevronDown, ArrowDownLeft, ArrowUpRight, Wallet, Layers, Building2, CreditCard as CardIcon, Calculator
} from 'lucide-react';
import { useSearch } from '../context/SearchContext';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium text-gray-800 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-gray-600">{entry.name}:</span>
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
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium text-gray-800">{label} ({payload[0].value}%)</p>
        <p className="text-gray-500 mt-1">$ 123,456.78</p>
      </div>
    );
  }
  return null;
};

// Hook to reactively track viewport width for responsive chart radii
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
}

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Profit & Loss');
  const { searchQuery } = useSearch();
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 640;

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

  // Dummy data for Top Expenses Tab (Horizontal Bar)
  const allExpensesData = [
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
  const allRevenueData = [
    { name: 'Sales Of Physical Merchandise', value: 82 },
    { name: 'Royalty Income', value: 58 },
    { name: 'Commission Earnings', value: 43 },
    { name: 'Charges From Subscription-Based Services', value: 33 },
    { name: 'Fees From Professional Service Provision', value: 23 },
    { name: 'Earnings From Franchise Business Operations', value: 13 },
    { name: 'Fees From Licensing Intellectual Property Rights', value: 8 },
    { name: 'Charges From Subscription-Based Services (Other)', value: 3 },
  ];

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

  // Dummy data for Cash Reports Tab
  const cashAccountsData = [
    { name: 'Cash In Hand', balance: 20000.00, iconBg: '#ffffff', iconCol: '#475569', IconComp: Wallet },
    { name: 'State Bank Of India (SBI)', balance: 1200.00, iconBg: '#0ea5e9', iconCol: '#ffffff', IconComp: Building2 },
    { name: 'HDFC Bank', balance: 1150.00, iconBg: '#ef4444', iconCol: '#ffffff', IconComp: Building2 },
    { name: 'ICICI Bank', balance: 1180.00, iconBg: '#f97316', iconCol: '#ffffff', IconComp: Building2 },
  ];

  const creditCardsData = [
    { name: 'ICICI Bank Coral Credit Card', balance: 4000.00, iconBg: '#f97316', iconCol: '#ffffff', IconComp: CardIcon },
    { name: 'SBI Platinum Credit Card', balance: 3170.79, iconBg: '#f8fafc', iconCol: '#64748b', IconComp: CardIcon },
    { name: 'HDFC Millennia Card', balance: 4500.00, iconBg: '#1e3a8a', iconCol: '#ffffff', IconComp: CardIcon },
    { name: 'PNB Global Gold Credit Card', balance: 5000.00, iconBg: '#f8fafc', iconCol: '#64748b', IconComp: CardIcon },
  ];

  const cashFlowData = [
    { name: 'JAN', cashIn: 0, cashOut: 0 },
    { name: 'FEB', cashIn: 55000, cashOut: 60000 },
    { name: 'MAR', cashIn: 35000, cashOut: 20000 },
    { name: 'APR', cashIn: 90000, cashOut: 55000 },
    { name: 'MAY', cashIn: 80000, cashOut: 125000 },
    { name: 'JUN', cashIn: 130000, cashOut: 10000 },
    { name: 'JUL', cashIn: 160000, cashOut: 10000 },
    { name: 'AUG', cashIn: 155000, cashOut: 80000 },
    { name: 'SEP', cashIn: 145000, cashOut: 110000 },
    { name: 'OCT', cashIn: 165000, cashOut: 60000 },
    { name: 'NOV', cashIn: 185000, cashOut: 135000 },
    { name: 'DEC', cashIn: 200000, cashOut: 90000 },
  ];

  const topTransactionsData = [
    { id: '23426', date: '23/07/2020', amount: 1200.00, type: 'in' },
    { id: '23422', date: '19/07/2020', amount: 2500.00, type: 'out' },
    { id: '23420', date: '10/07/2020', amount: 7300.00, type: 'in' },
    { id: '23417', date: '17/07/2020', amount: 5600.00, type: 'in' },
    { id: '23402', date: '18/07/2020', amount: 7300.00, type: 'out' },
    { id: '23413', date: '21/07/2020', amount: 8950.00, type: 'in' },
    { id: '23412', date: '05/08/2020', amount: 9400.00, type: 'out' },
  ];

  const netCashPositionData = [
    { name: 'JAN', value: 125000 },
    { name: 'FEB', value: 25000 },
    { name: 'MAR', value: 185000 },
    { name: 'APR', value: 90000 },
    { name: 'MAY', value: 135000 },
    { name: 'JUN', value: 85000 },
    { name: 'JUL', value: 200000 },
    { name: 'AUG', value: 30000 },
    { name: 'SEP', value: 105000 },
    { name: 'OCT', value: 140000 },
    { name: 'NOV', value: 195000 },
    { name: 'DEC', value: 75000 },
  ];

  const filteredExpensesData = allExpensesData.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRevenueData = allRevenueData.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Dummy data for Account Receivable / Payable Tab
  const agingData = [
    { name: 'More Than 5 Years', value: 12000 },
    { name: '2 - 5 Years', value: 40000 },
    { name: 'Less Than 2 Years', value: 65000 },
    { name: 'More Than 1 Year', value: 105000 },
    { name: '180 - 365 Days', value: 155000 },
    { name: '90 - 180 Days', value: 215000 },
    { name: '30 - 90 Days', value: 235000 },
    { name: '0 - 30 Days', value: 350000 },
  ];

  const customerReceivableData = [
    { txId: '9232734', name: 'Bessie Cooper', date: '27/02/2020', amount: 1200.00 },
    { txId: '8656436', name: 'Eleanor Pena', date: '12/06/2020', amount: 2500.00 },
    { txId: '7372572', name: 'Annette Black', date: '14/02/2020', amount: 7300.00 },
    { txId: '3562756', name: 'Ronald Richards', date: '24/03/2020', amount: 5600.00 },
    { txId: '5227365', name: 'Dianne Russell', date: '22/08/2020', amount: 4800.00 },
    { txId: '3342756', name: 'Cody Fisher', date: '08/04/2020', amount: 9200.00 },
  ];

  const vendorPayableData = [
    { txId: '5637657', name: 'Marvin McKinney', date: '25/01/2020', amount: 1200.00 },
    { txId: '5262261', name: 'Dianne Russell', date: '03/03/2020', amount: 2500.00 },
    { txId: '7372572', name: 'Kristin Watson', date: '16/06/2020', amount: 7300.00 },
    { txId: '7632785', name: 'Eleanor Pena', date: '30/07/2020', amount: 5600.00 },
    { txId: '3342756', name: 'Ronald Richards', date: '09/04/2020', amount: 7300.00 },
    { txId: '9232734', name: 'Darrell Steward', date: '30/04/2020', amount: 8950.00 },
  ];

  const handleCardClick = (title) => {
    Toast.fire({
      icon: 'success',
      title: `Generating ${title} Detail Report...`,
    });
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6 animate-slide-up p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Dashboard</h2>
          {searchQuery && (
            <p className="text-sm text-gray-500">
              Showing results for: <span className="text-gray-900 font-medium">"{searchQuery}"</span>
            </p>
          )}
        </div>
      </div>

      {/* Tabs - horizontally scrollable on mobile */}
      <div className="flex overflow-x-auto scrollbar-hide gap-1 sm:gap-2 border-b border-gray-200 pb-3 -mx-4 px-4 sm:mx-0 sm:px-0">
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
                ? 'bg-[#6366f1] text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <TabIcon className="w-4 h-4" />
            <span className="text-xs sm:text-sm">{tab}</span>
          </button>
        ))}
      </div>

      {/* Top Value Cards - visible only on specific tabs */}
      {(activeTab === 'Profit & Loss' || activeTab === 'Top Expenses') && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          <div 
            onClick={() => handleCardClick('Revenue')}
            className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow active:scale-[0.98] group overflow-hidden"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#ecfdf5] flex items-center justify-center shrink-0 group-hover:bg-[#d1fae5] transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="14" width="3" height="7" rx="1" fill="#10b981"/>
                  <rect x="8" y="10" width="3" height="11" rx="1" fill="#10b981"/>
                  <rect x="13" y="6" width="3" height="15" rx="1" fill="#10b981"/>
                  <rect x="18" y="12" width="3" height="9" rx="1" fill="#10b981"/>
                  <path d="M3 12C5 8 8 4 12 6C16 8 19 5 21 3" stroke="#10b981" strokeWidth="2" strokeLinecap="round" fill="none"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Revenue</p>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">$16,670.79</h3>
              </div>
            </div>
            <div className="w-16 h-10 sm:w-24 sm:h-12 shrink-0 overflow-hidden">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparklineData1} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <defs>
                    <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#22c55e" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke="#22c55e" strokeWidth={2} fill="url(#greenGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div 
            onClick={() => handleCardClick('Expense')}
            className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow active:scale-[0.98] group overflow-hidden"
          >
             <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#fef2f2] flex items-center justify-center shrink-0 group-hover:bg-[#fee2e2] transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="5" width="18" height="15" rx="3" stroke="#f87171" strokeWidth="2" fill="none"/>
                  <path d="M2 9H20" stroke="#f87171" strokeWidth="2"/>
                  <rect x="15" y="12" width="5" height="4" rx="1" stroke="#f87171" strokeWidth="2" fill="none"/>
                  <path d="M6 5V3C6 2.45 6.45 2 7 2H15C15.55 2 16 2.45 16 3V5" stroke="#f87171" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Expense</p>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">$623,516.96</h3>
              </div>
            </div>
            <div className="w-16 h-10 sm:w-24 sm:h-12 shrink-0 overflow-hidden">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparklineData2} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <defs>
                    <linearGradient id="redGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke="#ef4444" strokeWidth={2} fill="url(#redGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div 
            onClick={() => handleCardClick('Profit')}
            className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow active:scale-[0.98] group overflow-hidden"
          >
             <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 group-hover:bg-gray-200 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="9" cy="9" rx="7" ry="3" stroke="#312e81" strokeWidth="2" fill="none"/>
                  <path d="M2 9V13C2 14.66 5.13 16 9 16C12.87 16 16 14.66 16 13V9" stroke="#312e81" strokeWidth="2" fill="none"/>
                  <path d="M16 11C19.31 11.28 22 12.56 22 14C22 15.66 18.87 17 15 17" stroke="#312e81" strokeWidth="2" strokeLinecap="round" fill="none"/>
                  <path d="M22 14V18C22 19.66 18.87 21 15 21C12.07 21 9.56 20.17 8.5 19" stroke="#312e81" strokeWidth="2" strokeLinecap="round" fill="none"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Net Profit</p>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">$623,516.96</h3>
              </div>
            </div>
            <div className="w-16 h-10 sm:w-24 sm:h-12 shrink-0 overflow-hidden">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparklineData3} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <defs>
                    <linearGradient id="indigoGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#312e81" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#312e81" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke="#312e81" strokeWidth={2} fill="url(#indigoGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Profit & Loss' && (
        <>
          {/* Performance Overview */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex flex-col mb-8 gap-4">
              <h3 className="text-lg font-semibold text-gray-800">Performance Overview</h3>
              <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></div>
                  <span className="text-gray-500">Total Revenue</span>
                </div>
                <span className="text-gray-300">|</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#f87171]"></div>
                  <span className="text-gray-500">Total Expenses</span>
                </div>
                <span className="text-gray-300">|</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#312e81]"></div>
                  <span className="text-gray-500">Profit</span>
                </div>
                <span className="text-gray-300">|</span>
                <span className="text-gray-600 border-b-2 border-gray-300 px-1 hover:text-gray-900 cursor-pointer">All</span>
              </div>
            </div>
            <div className="h-[220px] sm:h-[280px] lg:h-[350px] 2xl:h-[500px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }} barGap={1} barCategoryGap="20%" barSize={12}>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(value) => `$${value/1000} K`} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="revenue" name="Total Revenue" fill="#22c769ff" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="expenses" name="Total Expenses" fill="#f87171" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="profit" name="Profit" fill="#312e81" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bottom Grid: Top Expenses & Top Revenue */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            
            {/* Top Expenses (Gauge) */}
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Top Expenses</h3>
              <div className="flex-1 flex flex-col items-center justify-center relative min-h-[300px] 2xl:min-h-[450px]">
                <div className="h-[200px] 2xl:h-[300px] w-full relative flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={topExpensesData}
                        cx="50%"
                        cy="100%"
                        startAngle={180}
                        endAngle={0}
                        innerRadius={isMobile ? 60 : 90}
                        outerRadius={isMobile ? 80 : 120}
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
                    <span className="text-sm font-medium text-gray-500">Total Expenses</span>
                    <span className="text-2xl sm:text-3xl font-bold text-gray-800 mt-1">$4,652.42</span>
                  </div>
                </div>

                {/* Legend */}
                <div className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-8 w-full border-t border-gray-100 pt-6">
                  {topExpensesData.map((item, i) => (
                    <div key={i} className="flex flex-col items-center text-center">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-xs font-semibold text-gray-600">{item.name}</span>
                      </div>
                      <span className="text-sm font-bold text-gray-800">${item.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Revenue (Doughnut) */}
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Top Revenue</h3>
              <div className="flex-1 flex flex-col relative min-h-[300px] 2xl:min-h-[450px]">
                <div className="h-[220px] 2xl:h-[350px] w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={topRevenueData}
                        cx="50%"
                        cy="50%"
                        innerRadius={isMobile ? 50 : 70}
                        outerRadius={isMobile ? 70 : 100}
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
                      <span className="text-xs font-medium text-gray-500 truncate">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Row: Summary & Expenses */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            
            {/* Summary Line Chart */}
            <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-semibold text-gray-800">Summary</h3>
                <div className="relative">
                  <select className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500">
                    <option>Expense</option>
                    <option>Revenue</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-black">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 lg:gap-12 flex-1">
                {/* Left stats */}
                <div className="flex flex-col justify-center">
                  <p className="text-sm font-medium text-gray-500 mb-1">Total Spend</p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">$4,652.42</h3>
                  
                  <div className="flex flex-col gap-2">
                    <div className="bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full inline-flex items-center w-fit gap-1">
                      Increased By 20 %
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                    </div>
                    <span className="text-xs text-gray-400">Compared To Last Year</span>
                  </div>
                </div>

                {/* Right Chart */}
                <div className="flex-1 h-[250px] 2xl:h-[400px] min-w-0">
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
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full items-center text-center">
              <h3 className="text-lg font-semibold text-gray-800 w-full text-left mb-4">Expenses</h3>
              <div className="flex-1 flex flex-col items-center justify-center relative w-full mt-4 min-h-[250px] 2xl:min-h-[400px]">
                
                <div className="h-[200px] 2xl:h-[300px] w-full relative flex items-center justify-center">
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
                        innerRadius={isMobile ? 65 : 85}
                        outerRadius={isMobile ? 75 : 95}
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
                    <span className="text-3xl sm:text-4xl font-semibold text-gray-800 tracking-tight">78%</span>
                  </div>
                </div>

                {/* Subtext */}
                <div className="mt-8 flex flex-col">
                  <span className="text-2xl sm:text-3xl font-semibold text-gray-800 tracking-tight">82.5k</span>
                  <span className="text-xs text-gray-400 max-w-[140px] mt-1 mx-auto leading-relaxed">$21k Expenses More Than Last Month</span>
                </div>
              </div>
            </div>

          </div>
        </>
      )}

      {activeTab === 'Top Expenses' && (
        <div className="flex flex-col gap-6">
          {/* Detailed Top Expenses Bar Chart */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Top Expenses</h3>
            <div className="h-[300px] sm:h-[400px] 2xl:h-[600px] w-full">
              {filteredExpensesData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={filteredExpensesData}
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
                      tick={{ fill: '#475569', fontSize: 10, fontWeight: 500 }}
                      width={isMobile ? 80 : 110}
                    />
                    <Tooltip cursor={{ fill: '#f8fafc' }} content={<HorizontalBarTooltip />} />
                    <Bar dataKey="value" fill="#58508d" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-3">
                  <Search size={48} strokeWidth={1} className="text-black opacity-20" />
                  <p className="text-sm font-medium">No results match your search query</p>
                </div>
              )}
            </div>
          </div>

          {/* Detailed Revenue Bar Chart */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Revenue</h3>
            <div className="h-[350px] sm:h-[450px] 2xl:h-[750px] w-full">
              {filteredRevenueData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={filteredRevenueData}
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
                      tick={{ fill: '#475569', fontSize: 10, fontWeight: 500 }} 
                      width={isMobile ? 120 : 175}
                    />
                    <Tooltip cursor={{ fill: '#f8fafc' }} content={<HorizontalBarTooltip />} />
                    <Bar dataKey="value" fill="#6a82af" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-3">
                  <Search size={48} strokeWidth={1} className="text-black opacity-20" />
                  <p className="text-sm font-medium">No results match your search query</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Cash Reports' && (
        <div className="flex flex-col gap-6 w-full min-w-0">
          {/* Top Section: Summary Cards */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 w-full min-w-0">
            
            {/* Bank Accounts */}
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row w-full h-full min-w-0">
              {/* Left Side */}
              <div className="md:w-[35%] flex flex-col md:border-r border-gray-100 pr-0 md:pr-6 gap-4 sm:gap-5 min-w-0 shrink-0">
                <div className="w-24 shrink-0">
                  <div className="relative border border-gray-200 rounded-lg px-3 py-1.5 flex items-center justify-between cursor-pointer bg-white">
                    <span className="text-sm font-medium text-gray-700 truncate">All</span>
                    <ChevronDown size={14} className="text-gray-400 shrink-0" />
                  </div>
                </div>
                
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#e0f2fe] flex items-center justify-center text-[#0ea5e9] shrink-0">
                  <Coins size={24} />
                </div>
                
                <div className="flex flex-col mt-auto md:mt-2 min-w-0">
                  <p className="text-sm font-medium text-gray-500 truncate">Total Balance</p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight mt-1 truncate">$4,652.42</h3>
                  <div className="flex flex-col gap-1.5 mt-3 sm:mt-4 min-w-0">
                    <div className="bg-emerald-500 text-white text-[11px] font-bold px-2 py-0.5 rounded inline-flex items-center w-fit gap-1 shadow-sm whitespace-nowrap shrink-0">
                      Increased By 20 %
                      <ArrowUpRight size={12} strokeWidth={3} className="shrink-0" />
                    </div>
                    <span className="text-xs text-gray-400 font-medium truncate mt-0.5">Compared To Last Year</span>
                  </div>
                </div>
              </div>
              
              {/* Right Side List */}
              <div className="md:w-[65%] flex flex-col pl-0 md:pl-6 mt-6 md:mt-0 justify-between gap-3 h-full min-w-0">
                {cashAccountsData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between border border-gray-100 p-2.5 sm:p-3 rounded-xl bg-white shadow-sm flex-1 min-w-0 gap-2">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-gray-50" style={{ backgroundColor: item.iconBg, color: item.iconCol }}>
                        <item.IconComp size={16} className="shrink-0" />
                      </div>
                      <span className="text-[12px] sm:text-[13px] font-medium text-gray-600 truncate" title={item.name}>{item.name}</span>
                    </div>
                    <span className="text-[12px] sm:text-[13px] font-bold text-gray-800 whitespace-nowrap pl-1 sm:pl-2 shrink-0">${item.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Credit Cards Card */}
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row w-full h-full min-w-0">
              {/* Left Side */}
              <div className="md:w-[35%] flex flex-col md:border-r border-gray-100 pr-0 md:pr-6 gap-4 sm:gap-5 min-w-0 shrink-0">
                 <div className="w-24 shrink-0">
                  <div className="relative border border-gray-200 rounded-lg px-3 py-1.5 flex items-center justify-between cursor-pointer bg-white">
                    <span className="text-sm font-medium text-gray-700 truncate">All</span>
                    <ChevronDown size={14} className="text-gray-400 shrink-0" />
                  </div>
                </div>
                
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#f3e8ff] flex items-center justify-center text-[#a855f7] shrink-0">
                  <Layers size={24} />
                </div>
                
                <div className="flex flex-col mt-auto md:mt-2 min-w-0">
                  <p className="text-sm font-medium text-gray-500 truncate">Total Balance</p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight mt-1 truncate">$16,670.79</h3>
                  <div className="flex flex-col gap-1.5 mt-3 sm:mt-4 min-w-0">
                    <div className="bg-emerald-500 text-white text-[11px] font-bold px-2 py-0.5 rounded inline-flex items-center w-fit gap-1 shadow-sm whitespace-nowrap shrink-0">
                      Increased By 20 %
                      <ArrowUpRight size={12} strokeWidth={3} className="shrink-0" />
                    </div>
                    <span className="text-xs text-gray-400 font-medium truncate mt-0.5">Compared To Last Year</span>
                  </div>
                </div>
              </div>

              {/* Right Side List */}
              <div className="md:w-[65%] flex flex-col pl-0 md:pl-6 mt-6 md:mt-0 justify-between gap-3 h-full min-w-0">
                {creditCardsData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between border border-gray-100 p-2.5 sm:p-3 rounded-xl bg-white shadow-sm flex-1 min-w-0 gap-2">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-8 h-6 rounded flex items-center justify-center shrink-0 border border-gray-100 shadow-sm" style={{ backgroundColor: item.iconBg, color: item.iconCol }}>
                         <item.IconComp size={12} className="shrink-0" />
                      </div>
                      <span className="text-[12px] sm:text-[13px] font-medium text-gray-600 truncate" title={item.name}>{item.name}</span>
                    </div>
                    <span className="text-[12px] sm:text-[13px] font-bold text-gray-800 whitespace-nowrap pl-1 sm:pl-2 shrink-0">${item.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Middle Section: Line Chart & Top Transactions */}
          <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-4 sm:gap-6 min-w-0">
            
            {/* Cash In, Cash Out Chart */}
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-[450px] min-w-0">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Cash In, Cash Out</h3>
              <div className="flex items-center gap-6 mb-8 px-2">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#312e81]"></div>
                  <span className="text-[13px] font-medium text-gray-500">Cash In</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#d97706]"></div>
                  <span className="text-[13px] font-medium text-gray-500">Cash Out</span>
                </div>
              </div>
              <div className="flex-1 min-h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={cashFlowData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 500 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 500 }} tickFormatter={(val) => `$${val/1000} K`} domain={[0, 200000]} ticks={[0, 50000, 100000, 150000, 200000]} dx={-10} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="cashIn" name="Cash In" stroke="#312e81" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
                    <Line type="monotone" dataKey="cashOut" name="Cash Out" stroke="#d97706" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Transactions Table */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-[450px]">
              <h3 className="text-lg font-bold text-gray-800 mb-6">Top Transactions</h3>
              <div className="flex-1 overflow-auto pr-2 scrollbar-hide">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="pb-4 text-[13px] font-semibold text-gray-800 w-8"></th>
                      <th className="pb-4 text-[13px] font-semibold text-gray-800">Transaction ID</th>
                      <th className="pb-4 text-[13px] font-semibold text-gray-800">Date</th>
                      <th className="pb-4 text-[13px] font-semibold text-gray-800 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topTransactionsData.map((tx, idx) => (
                      <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                        <td className="py-4">
                          {tx.type === 'in' ? (
                            <ArrowDownLeft size={16} strokeWidth={2.5} className="text-emerald-500" />
                          ) : (
                            <ArrowUpRight size={16} strokeWidth={2.5} className="text-red-500" />
                          )}
                        </td>
                        <td className="py-4 text-sm font-medium text-gray-600">{tx.id}</td>
                        <td className="py-4 text-[13px] font-medium text-gray-500">{tx.date}</td>
                        <td className="py-4 text-[13px] font-medium text-gray-800 text-right">${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Bottom Section: Net Cash Position */}
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-[380px] flex flex-col">
            <h3 className="text-lg font-bold text-gray-800 mb-8">Net Cash Position</h3>
            <div className="flex-1 min-h-0 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={netCashPositionData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }} barSize={20}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 500 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 500 }} tickFormatter={(val) => `$${val/1000} K`} domain={[0, 200000]} ticks={[0, 50000, 100000, 150000, 200000]} dx={-10} />
                  <Tooltip cursor={{ fill: '#f8fafc' }} content={<CustomTooltip />} />
                  <Bar dataKey="value" name="Net Cash" fill="#312e81" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Account Receivable / Payable Tab */}
      {activeTab === 'Account Receivable / Payable' && (
        <div className="flex flex-col gap-6 w-full min-w-0">
          
          {/* Top Value Cards (3 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full min-w-0">
            {/* Amount Receivable */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
               <div className="w-12 h-12 rounded-xl bg-[#e0f2fe] flex items-center justify-center shrink-0 border border-[#bae6fd]">
                <FileText size={20} className="text-[#0284c7]" />
               </div>
               <div className="flex flex-col min-w-0">
                 <p className="text-sm font-medium text-gray-500 mb-0.5 truncate">Amount Receivable</p>
                 <h3 className="text-2xl font-bold text-gray-800 truncate">$623,516.96</h3>
               </div>
            </div>

            {/* Amount Payable */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
               <div className="w-12 h-12 rounded-xl bg-[#fee2e2] flex items-center justify-center shrink-0 border border-[#fecaca]">
                <ArrowUpRight size={22} className="text-[#dc2626]" strokeWidth={2.5} />
               </div>
               <div className="flex flex-col min-w-0">
                 <p className="text-sm font-medium text-gray-500 mb-0.5 truncate">Amount Payable</p>
                 <h3 className="text-2xl font-bold text-gray-800 truncate">$16,670.79</h3>
               </div>
            </div>

            {/* Difference */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
               <div className="w-12 h-12 rounded-xl bg-[#ffedd5] flex items-center justify-center shrink-0 border border-[#fed7aa]">
                <Banknote size={22} className="text-[#ea580c]" />
               </div>
               <div className="flex flex-col min-w-0">
                 <p className="text-sm font-medium text-gray-500 mb-0.5 truncate">Difference</p>
                 <h3 className="text-2xl font-bold text-gray-800 truncate">$606,846.17</h3>
               </div>
            </div>
          </div>

          {/* Account Receivable Horizontal Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-[500px] min-w-0">
            <h3 className="text-lg font-bold text-gray-800 mb-8">Account Receivable</h3>
            <div className="flex-1 w-full min-h-0 pl-16 sm:pl-24 pr-4 sm:pr-12">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={agingData} layout="vertical" margin={{ top: 20, right: 30, left: 10, bottom: 5 }} barSize={12}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis 
                    type="number" 
                    orientation="top" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 500 }} 
                    tickFormatter={(val) => `$${val/1000} K`} 
                    domain={[0, 400000]} 
                    ticks={[0, 50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000]}
                    dy={-10}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }} 
                    width={100}
                    dx={-15}
                  />
                  <Tooltip cursor={{ fill: '#f8fafc' }} content={<CustomTooltip />} />
                  <Bar dataKey="value" name="Amount" fill="#5b92aa" radius={[0, 2, 2, 0]}>
                    <LabelList dataKey="value" position="right" formatter={(val) => `$${val.toLocaleString()}`} fill="#475569" fontSize={11} fontWeight={600} style={{ paddingLeft: '8px' }} offset={8} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Account Payable Horizontal Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-[500px] min-w-0">
            <h3 className="text-lg font-bold text-gray-800 mb-8">Account Payable</h3>
            <div className="flex-1 w-full min-h-0 pl-16 sm:pl-24 pr-4 sm:pr-12">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={agingData} layout="vertical" margin={{ top: 20, right: 30, left: 10, bottom: 5 }} barSize={12}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis 
                    type="number" 
                    orientation="top" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 500 }} 
                    tickFormatter={(val) => `$${val/1000} K`} 
                    domain={[0, 400000]} 
                    ticks={[0, 50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000]}
                    dy={-10}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }} 
                    width={100}
                    dx={-15}
                  />
                  <Tooltip cursor={{ fill: '#f8fafc' }} content={<CustomTooltip />} />
                  <Bar dataKey="value" name="Amount" fill="#8fbcab" radius={[0, 2, 2, 0]}>
                    <LabelList dataKey="value" position="right" formatter={(val) => `$${val.toLocaleString()}`} fill="#475569" fontSize={11} fontWeight={600} offset={8} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bottom Grid Tables */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 w-full min-w-0">
            
            {/* Customer Receivable Balance */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col min-w-0">
              <h3 className="text-[15px] font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">Customer Receivable Balance</h3>
              <div className="overflow-x-auto scrollbar-hide">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="pb-3 text-xs font-semibold text-gray-800 w-[20%]">Transaction ID</th>
                      <th className="pb-3 text-xs font-semibold text-gray-800 w-[35%]">Customer name</th>
                      <th className="pb-3 text-xs font-semibold text-gray-800 w-[25%] text-center">Date</th>
                      <th className="pb-3 text-xs font-semibold text-gray-800 w-[20%] text-right pr-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerReceivableData.map((row, idx) => (
                      <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 text-xs font-medium text-gray-600 truncate">{row.txId}</td>
                        <td className="py-4 text-[13px] font-medium text-gray-600 truncate">{row.name}</td>
                        <td className="py-4 text-xs font-medium text-gray-500 text-center truncate">{row.date}</td>
                        <td className="py-4 text-[13px] font-medium text-gray-800 text-right pr-2">${row.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Vendor Payable Balance */}
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col min-w-0">
              <h3 className="text-[15px] font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">Vendor Payable Balance</h3>
              <div className="overflow-x-auto scrollbar-hide">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="pb-3 text-xs font-semibold text-gray-800 w-[20%]">Transaction ID</th>
                      <th className="pb-3 text-xs font-semibold text-gray-800 w-[35%]">Vendor name</th>
                      <th className="pb-3 text-xs font-semibold text-gray-800 w-[25%] text-center">Date</th>
                      <th className="pb-3 text-xs font-semibold text-gray-800 w-[20%] text-right pr-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendorPayableData.map((row, idx) => (
                      <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 text-xs font-medium text-gray-600 truncate">{row.txId}</td>
                        <td className="py-4 text-[13px] font-medium text-gray-600 truncate">{row.name}</td>
                        <td className="py-4 text-xs font-medium text-gray-500 text-center truncate">{row.date}</td>
                        <td className="py-4 text-[13px] font-medium text-gray-800 text-right pr-2">${row.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Put placeholders for other tabs if they click on them */}
      {activeTab !== 'Profit & Loss' && activeTab !== 'Top Expenses' && activeTab !== 'Cash Reports' && activeTab !== 'Account Receivable / Payable' && (
        <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
           <p className="text-gray-500 text-lg">No data available for {activeTab}</p>
        </div>
      )}
    </div>
  );
}

