import { useState, useEffect } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { Toggle } from '../../components/ui/Toggle';
import { Pagination } from '../../components/ui/Pagination';
import { getCustomersAPI } from '../../services/allApis';

const MOCK_CUSTOMERS = [
  { id: 1, name: "Aabasoft customer", email: "sanjay.jayan@aabasoft.com", phone: "+91 9874651111", company: "4", date: "25/04/2025", active: true },
  { id: 2, name: "aabasofttest", email: "aabasofttest@yopmail.com", phone: "+91 1234567890", company: "0", date: "29/10/2025", active: true },
  { id: 3, name: "Alen T Jose", email: "alentjose@finbookglobal.com", phone: "+91 9400104307", company: "0", date: "28/10/2025", active: true },
  { id: 4, name: "Allen Jose", email: "allenjose99a@gmail.com", phone: "+91 08971738660", company: "4", date: "28/04/2025", active: true },
  { id: 5, name: "Allen jose", email: "allenjoseca@gmail.com", phone: "+91 08971738660", company: "0", date: "05/05/2025", active: false },
  { id: 6, name: "Customer 1", email: "customer1@gmail.com", phone: "+91 1234567890", company: "1", date: "23/01/2026", active: true },
  { id: 7, name: "Dane Kurian", email: "dane@senecavalleyproperties.com", phone: "+1 6033388055", company: "0", date: "07/06/2025", active: true },
  { id: 8, name: "Emil", email: "emileby16@gmail.com", phone: "+44 7388571676", company: "1", date: "21/01/2026", active: true },
  { id: 9, name: "Finbook User", email: "finbookuser@yopmail.com", phone: "+91 8138080143", company: "1", date: "24/04/2025", active: true },
  { id: 10, name: "George James", email: "dipinjames@gmail.com", phone: "+44 7411389177", company: "1", date: "08/01/2026", active: true },
];

export const CustomerList = () => {
  const [customers, setCustomers] = useState(MOCK_CUSTOMERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setIsLoading(true);
        const res = await getCustomersAPI();
        if (res && res.statusCode === "SB000" && res.data) {
           setCustomers(Array.isArray(res.data) ? res.data : (res.data.data || res.data));
        } else if (res && Array.isArray(res)) {
           setCustomers(res);
        }
      } catch (err) {
        console.error("Failed to fetch customers:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const handleToggle = (id, newState) => {
    setCustomers(customers.map(c => c.id === id ? { ...c, active: newState } : c));
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] w-full animate-fade-in">
      {/* Header */}
      <div className="px-6 py-4 shrink-0">
        <h1 className="text-xl font-bold text-slate-800">Customer List</h1>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-6 pb-6 overflow-hidden flex flex-col">
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex-1 flex flex-col overflow-hidden">
          
          {/* Top Actions */}
          <div className="px-5 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-100">
             <div className="flex items-center gap-2 w-full sm:w-auto">
                {/* Search */}
                <div className="relative w-full sm:w-80">
                   <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                   <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-slate-300 placeholder:text-slate-400"
                   />
                </div>
                {/* Filter */}
                <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-500">
                   <Filter size={18} />
                </button>
             </div>

             <button className="flex items-center gap-2 bg-[#212529] hover:bg-black text-white px-4 py-1.5 rounded text-sm font-medium transition-colors md:ml-auto w-full sm:w-auto justify-center">
                <Plus size={14} />
                Create customer
             </button>
          </div>

          {/* Table Container */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                 <tr className="border-b border-slate-100">
                   <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 whitespace-nowrap">SL No</th>
                   <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 whitespace-nowrap">Customer name</th>
                   <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 whitespace-nowrap">Email</th>
                   <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 whitespace-nowrap">Phone</th>
                   <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 whitespace-nowrap flex items-center justify-center">Company</th>
                   <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 whitespace-nowrap text-center">Registered Date</th>
                   <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 whitespace-nowrap text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <tr key={customer.id || customer.CustomerID || index} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                     <td className="py-4 px-4 text-[13px] text-slate-500 whitespace-nowrap">{index + 1}</td>
                     <td className="py-4 px-4 text-[13px] text-slate-800 whitespace-nowrap">{customer.name || customer.CustomerName || customer.Name || 'N/A'}</td>
                     <td className="py-4 px-4 text-[13px] text-slate-500 whitespace-nowrap">{customer.email || customer.EmailID || customer.Email || 'N/A'}</td>
                     <td className="py-4 px-4 text-[13px] text-slate-500 whitespace-nowrap">{customer.phone || customer.PhoneNumber || customer.Phone || 'N/A'}</td>
                     <td className="py-4 px-4 text-[13px] text-slate-500 text-center whitespace-nowrap">{customer.company || customer.Company || customer.BusinessUID || '0'}</td>
                     <td className="py-4 px-4 text-[13px] text-slate-500 text-center whitespace-nowrap">{customer.date || customer.CreatedDate || customer.Date || 'N/A'}</td>
                     <td className="py-4 px-4 flex items-center justify-end">
                        <Toggle 
                           initialState={customer.active ?? customer.IsActive ?? true} 
                           onChange={(newState) => handleToggle(customer.id || customer.CustomerID, newState)} 
                        />
                     </td>
                   </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <Pagination 
             currentPage={currentPage}
             totalPages={1}
             rowsPerPage={rowsPerPage}
             onPageChange={setCurrentPage}
             onRowsChange={setRowsPerPage}
          />
        </div>
      </div>
    </div>
  );
};
