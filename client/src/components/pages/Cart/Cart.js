import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  // Lấy thông tin người dùng từ localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.user_id : null; // Lấy userId nếu người dùng đã đăng nhập

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleQuantityChange = (productId, currentQuantity, change) => {
    const newQuantity = Math.max(1, currentQuantity + change);
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      removeFromCart(productId);
    }
  };

  const handleCheckout = async () => {
    if (!userId) {
      alert("Vui lòng đăng nhập để đặt hàng.");
      return;
    }

    try {
      const cartItems = cart.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      }));

      const response = await fetch("http://localhost:8000/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ userId, cartItems }),
      });

      if (!response.ok) {
        throw new Error("Không thể tạo đơn hàng");
      }
      alert("Đơn hàng đã được đặt thành công!");
      clearCart();
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
      alert("Đặt hàng thất bại!");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto my-8 px-4">
        <div className="text-center py-12">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-semibold mb-2">Giỏ hàng trống</h2>
          <p className="text-gray-600 mb-4">
            Bạn chưa có sản phẩm nào trong giỏ hàng
          </p>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto my-8 px-4">
      <h1 className="text-2xl font-bold mb-8">Giỏ hàng của bạn</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            {cart.map((item) => (
              <div
                key={item.product_id}
                className="flex items-center gap-4 p-4 border-b last:border-b-0"
              >
                <div className="aspect-square w-24 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  {item.color && (
                    <p className="text-sm text-gray-600">Màu: {item.color}</p>
                  )}
                  {item.storage && (
                    <p className="text-sm text-gray-600">
                      Dung lượng: {item.storage}
                    </p>
                  )}
                  <div className="text-blue-600 font-medium mt-1">
                    {formatPrice(item.price)}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.product_id, item.quantity, -1)
                    }
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.product_id, item.quantity, 1)
                    }
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => handleRemoveItem(item.product_id)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Tóm tắt đơn hàng</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Tạm tính</span>
                <span>{formatPrice(getCartTotal())}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Phí vận chuyển</span>
                <span>Miễn phí</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-semibold">
                <span>Tổng cộng</span>
                <span className="text-blue-600">
                  {formatPrice(getCartTotal())}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Đặt hàng
            </button>

            <Link
              to="/"
              className="block w-full text-center mt-4 text-blue-600 hover:text-blue-700"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
