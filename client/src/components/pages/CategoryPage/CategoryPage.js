import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  
  const handleProductClick = () => {
    navigate(`/product/${product.product_id}`);
  };
  
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer p-10"
      onClick={handleProductClick}
    >
      <div className="aspect-w-1 aspect-h-1">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 text-center">{product.name}</h3>
        <p className="text-gray-600 mt-2 text-center font-semibold">
          {new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
          }).format(product.price)}
        </p>
      </div>
    </div>
  );
};

const CategoryPage = ({ categoryId, title }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/api/categories/${categoryId}/products`);
        setProducts(response.data);
        setError(null);
      } catch (err) {
        setError(`Failed to fetch products`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl text-center font-bold mb-8">{title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product.product_id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;