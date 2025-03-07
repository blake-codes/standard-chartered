import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStyles } from "./styles/globalStyles";
import { AuthProvider } from "./AuthContext";
import Home from "./pages/ Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import CustomerService from "./pages/CustomerService";
import AccountDetails from "./pages/AccountDetails";
import OpenAccount from "./pages/OpenAccount";
import Transactions from "./pages/Transactions";
import AdminDashboard from "./pages/AdminDashboard";
import TransferMoney from "./pages/TransferMoney";
import PayBills from "./pages/PayBills";
import Settings from "./pages/Settings";
import Cards from "./pages/Cards";
import LoanServices from "./pages/LoanServices";
import Messages from "./pages/Messages";
import AboutUs from "./pages/AboutUs";
import OurBusinesses from "./pages/OurBusinesses";
import Investors from "./pages/Investors";
import Insights from "./pages/Insights";
import Careers from "./pages/Careers";

const App = () => {
  return (
    <AuthProvider>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/help" element={<CustomerService />} />
          <Route path="/register" element={<OpenAccount />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/business" element={<OurBusinesses />} />
          <Route path="/investors" element={<Investors />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/careers" element={<Careers />} />
          <Route element={<ProtectedRoute redirectTo="/login" />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/account/:userId" element={<AccountDetails />} />
            <Route path="/transactions/:userId" element={<Transactions />} />
            <Route path="/accounts" element={<AdminDashboard />} />
            <Route path="/transfer" element={<TransferMoney />} />
            <Route path="/pay-bills" element={<PayBills />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/cards" element={<Cards />} />
            <Route path="/loan-services" element={<LoanServices />} />
            <Route path="/messages" element={<Messages />} />
          </Route>
          <Route
            element={<ProtectedRoute redirectTo="/" requireAdmin />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
