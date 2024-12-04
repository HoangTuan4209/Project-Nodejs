import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/pages/navbar';
import Sidebar from './components/pages/sidebar';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="pt-20 pl-72 transition-all duration-300 overflow-x-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;