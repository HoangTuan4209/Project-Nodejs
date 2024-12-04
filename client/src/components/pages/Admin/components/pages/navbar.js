import React, {useState} from "react";
import { LogOut, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate(); // Khởi tạo navigate

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    // Xóa token và thông tin user từ localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Chuyển hướng về trang chủ
    navigate('/');
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 fixed w-full top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {isSidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            <span className="text-xl font-bold ml-4">Admin Panel</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm">Admin User</span>
            <button 
              onClick={handleLogout} // Thêm sự kiện onClick
              className="flex items-center gap-2 text-red-600 hover:text-red-700"
            >
              <LogOut className="w-5 h-5" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;