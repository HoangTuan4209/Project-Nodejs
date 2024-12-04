import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ROUTERS } from "../../utils/router"
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error details:', err.response?.data || err.message);
        setError('Error fetching products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Lọc sản phẩm theo category_id
  const iPhoneProducts = products.filter(product => product.category_id === 1);
  const iPadProducts = products.filter(product => product.category_id === 2);
  const macProducts = products.filter(product => product.category_id === 3);
  const watchProducts = products.filter(product => product.category_id === 4);
  const accessoryProducts = products.filter(product => product.category_id === 5);

  // Component để render một section sản phẩm
  const ProductSection = ({ title, products }) => {
    if (products.length === 0) return null;
    
    return (
      <div className="container px-4 my-14 mx-auto">
        <h2 className="text-center text-4xl font-semibold mb-8">
          {title}
        </h2>
        
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div 
                key={product.product_id}
                className="bg-zinc-800 flex flex-col items-center p-6 rounded-xl hover:bg-zinc-700 transition-all"
              >
                {/* Thay thẻ a bằng Link và truyền id vào URL */}
                <Link 
                  to={ROUTERS.CLIENT.PRODUCTS.PRODUCT_DETAIL.replace(':id', product.product_id)} 
                  className="w-full flex flex-col items-center"
                >
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full max-w-[200px] h-auto object-contain" 
                  />
                  <p className="text-center pt-4 font-bold text-lg line-clamp-2">
                    {product.name}
                  </p>
                  <div className="text-center pt-2">
                    <p className="font-semibold text-xl">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                      }).format(product.price)}
                    </p>
                    <p className="text-sm text-gray-400 line-through">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                      }).format(product.price * 1.2)}
                    </p>
                    <span className="text-sm text-red-500">-20%</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
};

  return (
    <div className="bg-zinc-900 min-h-screen text-white py-8">
      <ProductSection title={'iPhone'} products={iPhoneProducts} />
      <ProductSection title={'iPad'} products={iPadProducts} />
      <ProductSection title={'Mac'} products={macProducts} />
      <ProductSection title={'Watch'} products={watchProducts} />
      <ProductSection title={'Phụ Kiện'} products={accessoryProducts} />
    </div>
  );
};

export default Home;