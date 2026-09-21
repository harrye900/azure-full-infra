import React, { useEffect, useState } from 'react';

const PRODUCT_API = process.env.REACT_APP_PRODUCT_API || 'http://localhost:5001';
const ORDER_API   = process.env.REACT_APP_ORDER_API   || 'http://localhost:5002';

export default function App() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders]     = useState([]);
  const [customer, setCustomer] = useState('');
  const [message, setMessage]   = useState('');

  useEffect(() => {
    fetch(`${PRODUCT_API}/products`).then(r => r.json()).then(setProducts);
    fetch(`${ORDER_API}/orders`).then(r => r.json()).then(setOrders);
  }, []);

  const placeOrder = async (productId) => {
    if (!customer) return setMessage('Please enter your name first');
    const res = await fetch(`${ORDER_API}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity: 1, customerName: customer }),
    });
    const order = await res.json();
    setOrders(prev => [...prev, order]);
    setMessage(`Order #${order.id} placed!`);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <h1>🛒 E-Commerce Store</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Your name"
          value={customer}
          onChange={e => setCustomer(e.target.value)}
          style={{ padding: 8, marginRight: 10, borderRadius: 4, border: '1px solid #ccc' }}
        />
        {message && <span style={{ color: 'green' }}>{message}</span>}
      </div>

      <h2>Products</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {products.map(p => (
          <div key={p.id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16 }}>
            <h3>{p.name}</h3>
            <p>${p.price} — {p.stock} in stock</p>
            <button onClick={() => placeOrder(p.id)} style={{ padding: '8px 16px', cursor: 'pointer' }}>
              Buy
            </button>
          </div>
        ))}
      </div>

      <h2>Your Orders</h2>
      {orders.length === 0 ? <p>No orders yet</p> : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>{['ID', 'Product', 'Qty', 'Customer', 'Status'].map(h => (
              <th key={h} style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td style={{ padding: 8 }}>{o.id}</td>
                <td style={{ padding: 8 }}>{o.productId}</td>
                <td style={{ padding: 8 }}>{o.quantity}</td>
                <td style={{ padding: 8 }}>{o.customerName}</td>
                <td style={{ padding: 8 }}>{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
