import React from 'react';

function Cart({ items, removeFromCart, setView }) {
  const total = items.reduce((sum, item) => sum + parseFloat(item.price), 0);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {items.map(item => (
              <li key={item.id}>
                <img src={item.image_url} alt={item.name} style={{width: '50px', height: '50px', marginRight: '10px'}} />
                {item.name} - ${item.price}
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <p>Total: ${total.toFixed(2)}</p>
          <button onClick={() => setView('orderSummary')}>Proceed to Checkout</button>
        </>
      )}
    </div>
  );
}

export default Cart;