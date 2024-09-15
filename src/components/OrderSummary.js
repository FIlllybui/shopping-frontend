import React from 'react';

function OrderSummary({ items, setCart, setView }) {
  const total = items.reduce((sum, item) => sum + parseFloat(item.price), 0);

  const handleConfirmOrder = () => {
    const currentTime = new Date().toLocaleString();
    fetch('http://localhost:8000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        products: items.map(item => ({ id: item.id, quantity: 1 })),
        order_time: currentTime
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Order confirmed:', data);
      alert(`Order confirmed at ${currentTime}!`);
      setCart([]);
      setView('products');
    })
    .catch(error => {
      console.error('Error:', error);
      alert('There was an error confirming your order. Please try again.');
    });
  };

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <img src={item.image_url} alt={item.name} style={{width: '50px', height: '50px', marginRight: '10px'}} />
            <span>{item.name} - ${item.price}</span>
          </li>
        ))}
      </ul>
      <p>Total: ${total.toFixed(2)}</p>
      <button onClick={handleConfirmOrder}>Confirm Order</button>
    </div>
  );
}

export default OrderSummary;