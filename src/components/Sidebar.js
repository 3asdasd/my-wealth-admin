import React from 'react';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import PeopleIcon from '@mui/icons-material/People';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white">
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <h1 className="text-2xl font-bold">MyWealth Admin</h1>
      </div>
      <nav className="mt-10">
        <Link to="/dashboard" className="flex items-center py-2 px-4 hover:bg-gray-700">
          <DashboardIcon className="mr-3" />
          Dashboard
        </Link>
        <Link to="/trades" className="flex items-center py-2 px-4 hover:bg-gray-700">
          <SwapVertIcon className="mr-3" />
          Trades
        </Link>
        <Link to="/deposits" className="flex items-center py-2 px-4 hover:bg-gray-700">
          <AccountBalanceIcon className="mr-3" />
          Deposits
        </Link>
        <Link to="/withdraw" className="flex items-center py-2 px-4 hover:bg-gray-700">
          <AttachMoneyIcon className="mr-3" />
          Withdraw
        </Link>
        <Link to="/packages" className="flex items-center py-2 px-4 hover:bg-gray-700">
          <ViewModuleIcon className="mr-3" />
          Packages
        </Link>
        <Link to="/users" className="flex items-center py-2 px-4 hover:bg-gray-700">
          <PeopleIcon className="mr-3" />
          Users
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;