import React from 'react';
import {Routes, Route, HashRouter} from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyOTP from './pages/VerifyOTP';
import Dashboard from './pages/Dashboard';
import Trades from './pages/Trades';
import Deposits from './pages/Deposits';
import Withdraw from './pages/Withdraw';
import Packages from './pages/Packages';
import Users from './pages/Users';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/trades" element={<Trades />} />
        <Route path="/deposits" element={<Deposits />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </HashRouter>
  );
}

export default App;