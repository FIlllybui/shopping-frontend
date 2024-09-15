import React, { useState, useEffect } from 'react';

function ProductList({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [pulsing, setPulsing] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setPulsing(product.id);
    setTimeout(() => setPulsing(null), 300);
  };

  return (
    <div className="product-list">
      <h2 className="bounce">Our Products</h2>
      <div className="product-grid">
        {products.map((product, index) => (
          <div 
            key={product.id} 
            className={`product-card fade-in ${pulsing === product.id ? 'pulse' : ''}`} 
            style={{animationDelay: `${index * 0.1}s`}}
          >
            <img src={product.image_url} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;