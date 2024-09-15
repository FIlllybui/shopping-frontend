import React, { useState, useEffect } from 'react';

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/orders/history')
      .then(response => response.json())
      .then(data => setOrders(data));
  }, []);

  return (
    <div className="order-history">
      <h2>Order History</h2>
      {orders.map(order => (
        <div key={order.id} className="order">
          <h3>Order #{order.id}</h3>
          <p>Status: {order.status}</p>
          <p>Total: ${order.total_price}</p>
          <ul>
            {order.products.map(product => (
              <li key={product.id}>
                {product.name} - Quantity: {product.pivot.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default OrderHistory;