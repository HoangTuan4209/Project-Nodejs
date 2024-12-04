import React, { useState } from "react";
import { dataHeader } from "./dataHeader";
import { GoSearch } from "react-icons/go";
import { FiShoppingBag } from "react-icons/fi";
import { CiUser } from "react-icons/ci";
import { RiMenu3Line } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import { ROUTERS } from "./utils/router";
import { useCart } from "../components/pages/Cart/CartContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { getCartCount } = useCart();
  const cartItemsCount = getCartCount();

  // Hàm kiểm tra route active
  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  // Map router path cho từng menu item
  const getRoutePath = (title) => {
    switch (title) {
      case "iPhone":
        return ROUTERS.CLIENT.PRODUCTS.IPHONE;
      case "iPad":
        return ROUTERS.CLIENT.PRODUCTS.IPAD;
      case "Mac":
        return ROUTERS.CLIENT.PRODUCTS.MAC;
      case "Watch":
        return ROUTERS.CLIENT.PRODUCTS.WATCH;
      case "Phụ kiện":
        return ROUTERS.CLIENT.PRODUCTS.PHUKIEN;
      default:
        return ROUTERS.CLIENT.HOME;
    }
  };

  const HeaderIcon = ({
    icon: Icon,
    to,
    onClick,
    children,
    className = "",
  }) => (
    <Link
      to={to}
      onClick={onClick}
      className={`px-3 text-xl relative hover:text-gray-300 transition-colors duration-200 ${className}`}
    >
      <Icon />
      {children}
    </Link>
  );

  const CartIcon = () => (
    <HeaderIcon to={ROUTERS.CLIENT.CART} icon={FiShoppingBag}>
      {cartItemsCount > 0 && (
        <span className="absolute -top-2 -right-1 bg-blue-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-medium animate-pulse">
          {cartItemsCount > 99 ? "99+" : cartItemsCount}
        </span>
      )}
    </HeaderIcon>
  );

  return (
    <div className="bg-zinc-900 text-white">
      <div className="container px-4">
        {/* Desktop & Mobile Header */}
        <div className="flex justify-between items-center py-2">
          {/* Left Section */}
          <div className="flex items-center">
            {/* Hamburger Menu - Show only on mobile */}
            <button
              className="hidden max-lg:block mr-4 text-2xl hover:text-gray-300 transition-colors duration-200"
              onClick={() => setIsOpen(!isOpen)}
            >
              <RiMenu3Line />
            </button>

            {/* Logo */}
            <Link
              to={ROUTERS.CLIENT.HOME}
              className="w-44 h-12 hover:opacity-90 transition-opacity duration-200"
            >
              <img src="/images/logo-shopdunk.png" alt="logo" />
            </Link>
          </div>

          {/* Center Navigation - Hide on mobile */}
          <div className="max-lg:hidden ml-4">
            <ul className="flex items-center gap-6 space-x-6">
              {dataHeader.map((item) => (
                <li key={item.id}>
                  <Link
                    to={getRoutePath(item.title)}
                    className={`px-6 text-lg transition-colors duration-200 ${
                      isActiveRoute(getRoutePath(item.title))
                        ? "text-blue-500"
                        : "hover:text-gray-300"
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-1">
            <HeaderIcon
              to="#"
              icon={GoSearch}
              onClick={(e) => e.preventDefault()}
            />
            <CartIcon />
            <HeaderIcon
              to={ROUTERS.CLIENT.AUTH.LOGIN}
              icon={CiUser}
              className="max-lg:hidden"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden ${isOpen ? "block" : "hidden"}`}>
          <div className="py-2">
            <ul className="space-y-2">
              {dataHeader.map((item) => (
                <li key={item.id}>
                  <Link
                    to={getRoutePath(item.title)}
                    className={`block px-4 py-2 rounded-md transition-colors duration-200 ${
                      isActiveRoute(getRoutePath(item.title))
                        ? "bg-gray-700"
                        : "hover:bg-gray-700"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/account"
                  className="block px-4 py-2 hover:bg-gray-700 rounded-md transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Tài khoản
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
