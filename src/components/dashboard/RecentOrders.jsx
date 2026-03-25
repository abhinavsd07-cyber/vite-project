import { MoreHorizontal } from 'lucide-react';

const orders = [
  { id: '#ORD-7832', customer: 'Acme Corp', amount: '$4,280.00', status: 'Completed', date: 'Oct 24, 2023', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: '#ORD-7831', customer: 'Globex Inc', amount: '$1,920.00', status: 'Processing', date: 'Oct 24, 2023', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: '#ORD-7830', customer: 'Soylent Corp', amount: '$850.50', status: 'Completed', date: 'Oct 23, 2023', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: '#ORD-7829', customer: 'Initech', amount: '$12,400.00', status: 'Pending', date: 'Oct 23, 2023', avatar: 'https://i.pravatar.cc/150?u=4' },
  { id: '#ORD-7828', customer: 'Umbrella Corp', amount: '$3,100.00', status: 'Completed', date: 'Oct 22, 2023', avatar: 'https://i.pravatar.cc/150?u=5' },
];

const statusStyles = {
  Completed: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20',
  Processing: 'bg-blue-50 text-blue-700 ring-1 ring-blue-700/10',
  Pending: 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20',
};

export function RecentOrders() {
  return (
    <div className="interactive-card p-0 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Recent Transactions</h2>
          <p className="text-sm text-slate-500">Latest business orders</p>
        </div>
        <button className="text-sm text-blue-600 font-medium hover:text-blue-700">View All</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-slate-50/50 text-slate-500 font-medium">
            <tr>
              <th className="px-6 py-4 font-medium tracking-wider">Order ID</th>
              <th className="px-6 py-4 font-medium tracking-wider">Customer</th>
              <th className="px-6 py-4 font-medium tracking-wider">Amount</th>
              <th className="px-6 py-4 font-medium tracking-wider">Date</th>
              <th className="px-6 py-4 font-medium tracking-wider">Status</th>
              <th className="px-6 py-4 font-medium tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4 font-medium text-slate-700">{order.id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={order.avatar} alt="" className="w-8 h-8 rounded-full shadow-sm" />
                    <span className="font-medium text-slate-700">{order.customer}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-slate-700">{order.amount}</td>
                <td className="px-6 py-4 text-slate-500">{order.date}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
