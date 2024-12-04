import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "iPhone",
    image: "/images/category_IP.png",
    path: "iphone"
  },
  {
    name: "Mac",
    image: "/images/category_mac.png",
    path: "mac"
  },
  {
    name: "iPad",
    image: "/images/category_ipad.png",
    path: "ipad"
  },
  {
    name: "Watch",
    image: "/images/category_watch.png",
    path: "watch"
  },
  {
    name: "Phụ kiện",
    image: "/images/category_phukien.png",
    path: "phukien"
  },
];

const CategoryCard = ({ name, image, onClick }) => (
  <div 
    className="flex flex-col items-center justify-center bg-gray-800 rounded-lg p-4 w-48 h-56 cursor-pointer hover:bg-gray-700 transition-colors duration-200"
    onClick={onClick}
  >
    <img src={image} alt={name} className="h-32 mb-4 object-contain" />
    <p className="text-white text-center">{name}</p>
  </div>
);

const CategoryList = () => {
  const navigate = useNavigate();

  const handleCategoryClick = async (path) => {
    try {
      const response = await fetch(`/api/categories/${path}/products`);
      const products = await response.json();
      // Lưu trữ hoặc hiển thị danh sách sản phẩm ở đây
      console.log(products);
    } catch (error) {
      console.error('Error:', error);
    }
    navigate(`/products/${path}`);
  };

  return (
    <div className="w-full bg-gray-900 p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((category, index) => (
            <CategoryCard 
              key={index} 
              name={category.name} 
              image={category.image}
              onClick={() => handleCategoryClick(category.path)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;