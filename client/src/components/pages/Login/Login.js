import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState(''); // Đã đổi từ username thành email
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email, // Đã đổi từ username thành email
        password
      });

      // Lưu token vào localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Redirect theo URL từ response
      navigate(response.data.redirectUrl);

    } catch (error) {
      console.error('Login error:', error);
      alert(error.response?.data?.message || 'Đã có lỗi xảy ra');
    }
  };

  return (
    <div className="container min-h-auto my-10">
      <nav className="text-sm p-4">
        <ol className="flex space-x-2">
          <li><Link to="/" className="text-gray-600 hover:text-blue-600">Trang chủ</Link></li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-400">Đăng nhập</li>
        </ol>
      </nav>

      <div className="flex">
        <div className="hidden lg:flex lg:w-1/2 items-center">
          <img 
            src="/images/img_login.jpeg" 
            alt="Login illustration" 
            className="max-w-[80%] h-auto mix-blend-multiply"
          />
        </div>

        <div className="w-full lg:w-1/2 p-8 lg:p-12">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-8">Đăng nhập</h1>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Email:</label>
                <input
                  type="email"
                  value={email}  // Đã đổi từ username thành email
                  onChange={(e) => setEmail(e.target.value)}  // Đã đổi từ setUsername thành setEmail
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Mật khẩu:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Đăng nhập
              </button>
            </form>

            <div className="mt-8 text-center">
              <span className="text-gray-600">Bạn Chưa Có Tài Khoản? </span>
              <Link to="/register" className="text-blue-600 hover:underline">
                Tạo tài khoản ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;