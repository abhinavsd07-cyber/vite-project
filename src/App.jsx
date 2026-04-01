import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/auth/Login";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { VerifyOTP } from "./pages/auth/VerifyOTP";
import { ResetPassword } from "./pages/auth/ResetPassword";
import { Logo } from "./components/auth/Logo";

import { UserList } from "./pages/users/UserList";
import { CreateUser } from "./pages/users/CreateUser";
import { VendorList } from "./pages/vendor/VendorList";
import { CustomerList } from "./pages/customers/CustomerList";
import { CreateCustomer } from "./pages/customers/CreateCustomer";
import { CompanyList } from "./pages/customers/CompanyList";
import { DocList } from "./pages/docs/DocList";
import { UploadDoc } from "./pages/docs/UploadDoc";
import { ArchivedDocs } from "./pages/docs/ArchivedDocs";
import { Settings } from "./pages/settings/Settings";
import { BusinessDomainList } from "./pages/settings/BusinessDomainList";
import { CategoryList } from "./pages/settings/CategoryList";
import { CountryList } from "./pages/settings/CountryList";
import { FinancialYearList } from "./pages/settings/FinancialYearList";
import { UserGroupList } from "./pages/settings/UserGroupList";
import { Meetings } from "./pages/meetings/Meetings";
import { DocumentRequests } from "./pages/requests/DocumentRequests";

import { SearchProvider } from "./context/SearchContext";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Hide splash screen after 2.2 seconds to allow the final zoom out to finish
    const timer = setTimeout(() => setShowSplash(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div className="h-screen w-screen bg-white flex items-center justify-center overflow-hidden">
        <div className="animate-zoom-in">
          <div className="scale-[1.75] origin-center">
            <Logo />
          </div>
        </div>
      </div>
    );
  }

  // A wrapper for dashboard pages to keep code DRY
  const DashboardRoute = ({ children }) => (
    <SearchProvider>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </SearchProvider>
  );

  return (
    <Router>
      <Routes>
        {/* Authentication Flow */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* ERP Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardRoute><Dashboard /></DashboardRoute>} />
        
        {/* Users */}
        <Route path="/users" element={<Navigate to="/users/list" />} />
        <Route path="/users/list" element={<DashboardRoute><UserList /></DashboardRoute>} />
        <Route path="/users/create" element={<DashboardRoute><CreateUser /></DashboardRoute>} />

        {/* Vendors */}
        <Route path="/vendor" element={<DashboardRoute><VendorList /></DashboardRoute>} />
        
        {/* Customers */}
        <Route path="/customers" element={<Navigate to="/customers/list" />} />
        <Route path="/customers/list" element={<DashboardRoute><CustomerList /></DashboardRoute>} />
        <Route path="/customers/create" element={<DashboardRoute><CreateCustomer /></DashboardRoute>} />
        <Route path="/customers/companies" element={<DashboardRoute><CompanyList /></DashboardRoute>} />

        {/* Doc Management */}
        <Route path="/docs" element={<Navigate to="/docs/list" />} />
        <Route path="/docs/list" element={<DashboardRoute><DocList /></DashboardRoute>} />
        <Route path="/docs/upload" element={<DashboardRoute><UploadDoc /></DashboardRoute>} />
        <Route path="/docs/archived" element={<DashboardRoute><ArchivedDocs /></DashboardRoute>} />

        {/* Settings Module with nested routes for modals */}
        <Route path="/settings" element={<DashboardRoute><Settings /></DashboardRoute>}>
           <Route path="business-domain" element={<BusinessDomainList />} />
           <Route path="category" element={<CategoryList />} />
           <Route path="country" element={<CountryList />} />
           <Route path="financial-year" element={<FinancialYearList />} />
           <Route path="user-group" element={<UserGroupList />} />
        </Route>
        
        <Route path="/meetings" element={<DashboardRoute><Meetings /></DashboardRoute>} />
        <Route path="/document-requests" element={<DashboardRoute><DocumentRequests /></DashboardRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
