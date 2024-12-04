import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from '../../AdminDashboard';
import Users from "../pages/user";
import Oders from "../pages/Oders";
import Products from "../pages/Products";
const routerAdmin = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<Oders />} />
          <Route path="products" element={<Products />} />
        </Route>
        {/* Add other routes here */}
      </Routes>
    </Router>
  )
}

export default routerAdmin
