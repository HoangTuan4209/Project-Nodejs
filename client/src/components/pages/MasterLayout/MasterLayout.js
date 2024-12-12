// src/components/pages/MasterLayout/MasterLayout.js
import React, { memo } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { ROUTERS } from "../../utils/router";
import { Toaster } from "react-hot-toast";
import Header from "../../Header.js";
import Carousel from "../../Carousel.js";
import CategoryList from "../../Categories.js";
import Footer from "../../Footer.js";

const MasterLayout = () => {
  const location = useLocation();

  // Kiểm tra các routes không cần hiển thị Carousel và CategoryList
  const shouldHideComponents = () => {
    const currentPath = location.pathname;
    return (
      currentPath.includes(ROUTERS.CLIENT.PRODUCTS.PRODUCT_DETAIL) ||
      currentPath === ROUTERS.CLIENT.AUTH.LOGIN ||
      currentPath === ROUTERS.CLIENT.AUTH.REGISTER ||
      currentPath === ROUTERS.CLIENT.CART ||
      currentPath === ROUTERS.CLIENT.PROFILE
    );
  };

  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          // Các tùy chọn mặc định cho toast
          duration: 2000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            style: {
              background: "green",
            },
          },
          error: {
            style: {
              background: "red",
            },
          },
        }}
      />
      <Header />
      {!shouldHideComponents() && (
        <>
          <Carousel />
          <CategoryList />
        </>
      )}
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default memo(MasterLayout);
