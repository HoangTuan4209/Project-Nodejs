export const ROUTERS = {
  CLIENT: {
    HOME: "/",
    PRODUCTS: {
      IPHONE: "/products/iphone",
      IPAD: "/products/iPad",
      MAC: "/products/Mac",
      WATCH: "/products/Watch",
      PHUKIEN: "/products/Phukien",
      PRODUCT_DETAIL: "/product/:id",
    },
    AUTH: {
      LOGIN: "/login",
      REGISTER: "/register",
    },
    CART: "/Cart",
  },
  ADMIN: {
    DASHBOARD: "/admin", // Main admin route
    USERS: "/admin/users", // User management
    DONHANG: "/admin/orders", // Order management
    SANPHAM: "/admin/products", // Product management
  },
};
