import React from "react";
import { LayoutGrid, Users, ShoppingCart, Package } from "lucide-react";

const Sidebar = ({ isSidebarOpen }) => {
  const menuItems = [
    // { icon: LayoutGrid, text: "Dashboard", path: "/admin/dashboard" },
    { icon: Users, text: "Quản lý người dùng", path: "/admin/users" },
    { icon: ShoppingCart, text: "Quản lý đơn hàng", path: "/admin/orders" },
    { icon: Package, text: "Quản lý sản phẩm", path: "/admin/products" },
  ];
  return (
    <div>
      <aside
        className={`fixed left-0 top-16 h-full bg-white shadow-lg transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex flex-col py-4">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.path}
              className="flex items-center gap-4 px-6 py-3 hover:bg-gray-100 transition-colors"
            >
              <item.icon className="w-6 h-6 text-gray-600" />
              <span
                className={`text-gray-800 ${
                  !isSidebarOpen ? "hidden" : "block"
                }`}
              >
                {item.text}
              </span>
            </a>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
