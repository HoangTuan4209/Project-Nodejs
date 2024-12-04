import { ROUTERS } from "./components/utils/router";
import { Route, Routes } from "react-router-dom";
import MasterLayout from "./components/pages/MasterLayout/MasterLayout.js";

// Client page
import Home from "./components/pages/Home/Home.js";
import Iphone from "./components/pages/iPhone/Iphone.js";
import Mac from "./components/pages/Mac/Mac.js";
import Phukien from "./components/pages/Phukien/Phukien.js";
import Watch from "./components/pages/Watch/Watch.js";
import Ipad from "./components/pages/iPad/Ipad.js";
import ProductDetail from "./components/pages/ProductDetail/ProductDetail.js";
import Login from "./components/pages/Login/Login.js";
import Register from "./components/pages/Register/Register.js";
import Cart from "./components/pages/Cart/Cart.js";

// Admin page
import AdminDashboard from "./components/pages/Admin/AdminDashboard.js";
import Users from "../src/components/pages/Admin/components/pages/user.js"
import Orders from "../src/components/pages/Admin/components/pages/Oders.js"
import Products from "../src/components/pages/Admin/components/pages/Products.js"

const RouterCustom = () => {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route path={ROUTERS.ADMIN.DASHBOARD} element={<AdminDashboard />}>
        {/* <Route index element={<Dashboard />} /> */}
        <Route path="users" element={<Users />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} />
      </Route>

      {/* Client Routes */}
      <Route path="/" element={<MasterLayout />}>
        <Route index element={<Home />} />
        <Route path={ROUTERS.CLIENT.PRODUCTS.IPHONE} element={<Iphone />} />
        <Route path={ROUTERS.CLIENT.PRODUCTS.IPAD} element={<Ipad />} />
        <Route path={ROUTERS.CLIENT.PRODUCTS.MAC} element={<Mac />} />
        <Route path={ROUTERS.CLIENT.PRODUCTS.WATCH} element={<Watch />} />
        <Route path={ROUTERS.CLIENT.PRODUCTS.PHUKIEN} element={<Phukien />} />
        <Route path={ROUTERS.CLIENT.PRODUCTS.PRODUCT_DETAIL} element={<ProductDetail />} />
        <Route path={ROUTERS.CLIENT.AUTH.LOGIN} element={<Login />} />
        <Route path={ROUTERS.CLIENT.AUTH.REGISTER} element={<Register />} />
        <Route path={ROUTERS.CLIENT.CART} element={<Cart />} />
      </Route>
    </Routes>
  );
};

export default RouterCustom;
