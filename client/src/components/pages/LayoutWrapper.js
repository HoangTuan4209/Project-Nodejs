import React from 'react';
import { useLocation } from 'react-router-dom';
import MasterLayout from './MasterLayout/MasterLayout';
import AdminLayout from './Admin/AdminDashboard';

const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  
  // Kiểm tra nếu đang ở trang admin
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return <AdminLayout>{children}</AdminLayout>;
  }

  return <MasterLayout>{children}</MasterLayout>;
};

export default LayoutWrapper;