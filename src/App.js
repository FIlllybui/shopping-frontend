import React, { useState, useEffect } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import OrderSummary from './components/OrderSummary';
import OrderHistory from './components/OrderHistory';

function App() {
  const [view, setView] = useState('products');
  const [cart, setCart] = useState([]);
  const [themeColor, setThemeColor] = useState('#4CAF50');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHolding, setIsHolding] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsHolding(true);
    const handleMouseUp = () => setIsHolding(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      clearInterval(timer);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const renderView = () => {
    switch(view) {
      case 'products':
        return <ProductList addToCart={addToCart} />;
      case 'cart':
        return <Cart items={cart} removeFromCart={removeFromCart} setView={setView} />;
      case 'orderSummary':
        return <OrderSummary items={cart} setCart={setCart} setView={setView} />;
      case 'orderHistory':
        return <OrderHistory />;
      default:
        return <ProductList addToCart={addToCart} />;
    }
  };

  return (
    <div className="App" style={{ backgroundColor: themeColor }}>
      <div className="rainbow-background"></div>
      <div className={`cursor-follower ${isHolding ? 'holding' : ''}`} style={{ left: cursorPos.x, top: cursorPos.y }}></div>
      <header className="App-header">
        <h1>Rainbow E-Commerce Store</h1>
        <div className="time-display">{currentTime.toLocaleTimeString()}</div>
        <nav>
          <button onClick={() => setView('products')}>Products</button>
          <button onClick={() => setView('cart')}>Cart ({cart.length})</button>
          <button onClick={() => setView('orderHistory')}>Order History</button>
        </nav>
        <div>
          <label htmlFor="themeColor">Theme Color: </label>
          <input
            type="color"
            id="themeColor"
            value={themeColor}
            onChange={(e) => setThemeColor(e.target.value)}
          />
        </div>
      </header>
      <main>
        {renderView()}
      </main>
    </div>
  );
}

export default App;
