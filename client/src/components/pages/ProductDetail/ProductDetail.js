import React, { useState, useEffect } from "react";
import { Star, Gift, Check } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../Cart/CartContext";
import { toast } from "react-hot-toast";

const ProductDetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productResponse = await axios.get(
          `http://localhost:8000/api/product/${id}`
        );
        const productData = {
          ...productResponse.data,
          id: parseInt(productResponse.data.id, 10),
          price: parseFloat(productResponse.data.price),
        };
        setProduct(productData); // Sửa thành productData đã parse đúng
        setSelectedStorage(productData.storage || "");
        setSelectedColor(productData.color || "");
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProductData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  // Format price to VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleAddToCart = () => {
    // Kiểm tra user đã đăng nhập chưa
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;

    if (!user) {
      // Nếu chưa đăng nhập, chuyển đến trang login
      toast.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
      navigate("/login");
      return;
    }

    // Nếu đã đăng nhập, thực hiện thêm vào giỏ hàng
    if (product) {
      addToCart(product);
      toast.success("Đã thêm sản phẩm vào giỏ hàng!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-4 p-4">
      {/* Breadcrumb */}
      <nav className="text-sm mb-4">
        <ol className="flex space-x-2">
          <li>
            <a href="/" className="text-blue-600">
              Trang chủ
            </a>
          </li>
          <li className="text-gray-500">/</li>
          <li>
            <a href="/iphone" className="text-blue-600">
              {product.category_id === 1
                ? "iPhone"
                : product.category_id === 2
                ? "iPad"
                : product.category_id === 3
                ? "Mac"
                : product.category_id === 4
                ? "Watch"
                : "Phụ kiện"}
            </a>
          </li>
          <li className="text-gray-500">/</li>
          <li className="text-gray-600">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden flex justify-center items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-4/5 h-4/5 object-contain" // Thay object-cover bằng object-contain để ảnh không bị cắt
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-blue-600">1 đánh giá</span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <span className="text-2xl font-bold text-blue-600">
              {formatPrice(product.price)}
            </span>
            <span className="ml-2 text-gray-500 line-through">
              {formatPrice(product.price * 1.2)}
            </span>
            <span className="text-sm text-gray-600 block">
              (Đã bao gồm VAT)
            </span>
          </div>

          {/* Storage Options - chỉ hiện khi có storage */}
          {product.storage && (
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Dung lượng</h3>
              <div className="flex gap-2">
                <button
                  className={`px-4 py-2 border rounded ${
                    selectedStorage === product.storage
                      ? "border-blue-500 text-blue-600"
                      : "border-gray-300"
                  }`}
                >
                  {product.storage}
                </button>
              </div>
            </div>
          )}

          {/* Color Options - chỉ hiện khi có color */}
          {product.color && (
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">
                Màu sắc: {product.color}
              </h3>
              <div className="flex gap-2">
                <button
                  className={`w-8 h-8 rounded-full bg-gray-800 ${
                    selectedColor === product.color
                      ? "ring-2 ring-blue-500 ring-offset-2"
                      : ""
                  }`}
                  title={product.color}
                />
              </div>
            </div>
          )}

          {/* Stock Quantity */}
          <div className="mb-6">
            <span className="text-sm text-gray-600">
              Số lượng còn lại: {product.stock_quantity}
            </span>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Mô tả sản phẩm</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>

          {/* Promotions */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-lg font-medium mb-4">
              <Gift className="w-5 h-5 text-red-500" />
              <span>Ưu đãi</span>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-red-500 mb-2">
                  I. Ưu đãi thanh toán
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Hỗ trợ trả góp 0% qua thẻ tín dụng Sacombank</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Giảm 500.000đ khi thanh toán qua QR-ZALOPAY</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-red-500 mb-2">
                  II. Ưu đãi mua kèm
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>
                      Ốp chính hãng Apple iPhone 15 series giảm 300.000đ
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Giảm đến 20% khi mua các gói bảo hành</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Buy Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-red-600 text-white py-4 rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
