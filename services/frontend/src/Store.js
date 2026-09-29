import React, { useEffect, useState } from 'react';

const PRODUCT_API = process.env.REACT_APP_PRODUCT_API || '/api/products';
const ORDER_API   = process.env.REACT_APP_ORDER_API   || '/api/orders';

const PRODUCT_IMAGES = {
  1: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
  2: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
  3: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400',
  4: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
};

export default function Store({ customer, onLogout }) {
  const [products, setProducts] = useState([]);
  const [orders, setOrders]     = useState([]);
  const [message, setMessage]   = useState('');
  const [loading, setLoading]   = useState(true);
  const [tab, setTab]           = useState('shop');
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch(PRODUCT_API).then(r => r.json()),
      fetch(ORDER_API).then(r => r.json()),
    ]).then(([p, o]) => { setProducts(p); setOrders(o); setLoading(false); });
  }, []);

  const placeOrder = async (product) => {
    const res = await fetch(ORDER_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: product.id, quantity: 1, customerName: customer }),
    });
    const order = await res.json();
    setOrders(prev => [...prev, order]);
    setMessage(`✅ ${product.name} ordered successfully!`);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.bgGradient} />
      <div style={styles.bgImage} />

      <nav style={styles.nav}>
        <div style={styles.navBrand}>🛍️ ShopLux</div>
        <div style={styles.navLinks}>
          <button style={{ ...styles.navBtn, ...(tab === 'shop' ? styles.navBtnActive : {}) }} onClick={() => setTab('shop')}>Shop</button>
          <button style={{ ...styles.navBtn, ...(tab === 'orders' ? styles.navBtnActive : {}) }} onClick={() => setTab('orders')}>
            Orders {orders.length > 0 && <span style={styles.badge}>{orders.length}</span>}
          </button>
        </div>
        <div style={styles.navUser}>
          <span style={styles.avatar}>{customer[0].toUpperCase()}</span>
          <span style={styles.userName}>{customer}</span>
          <button style={styles.logoutBtn} onClick={onLogout}>Logout</button>
        </div>
      </nav>

      {message && <div style={styles.toast}>{message}</div>}

      <div style={styles.content}>
        {tab === 'shop' && (
          <>
            <div style={styles.hero}>
              <h1 style={styles.heroTitle}>Welcome back, {customer}! 👋</h1>
              <p style={styles.heroSub}>Discover our premium collection</p>
            </div>
            {loading ? (
              <div style={styles.loading}>Loading products...</div>
            ) : (
              <div style={styles.grid}>
                {products.map(p => (
                  <div
                    key={p.id}
                    style={{ ...styles.card, ...(hoveredCard === p.id ? styles.cardHover : {}) }}
                    onMouseEnter={() => setHoveredCard(p.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div style={styles.imgWrapper}>
                      <img src={PRODUCT_IMAGES[p.id]} alt={p.name} style={styles.img} />
                      <div style={styles.imgOverlay} />
                    </div>
                    <div style={styles.cardBody}>
                      <h3 style={styles.productName}>{p.name}</h3>
                      <div style={styles.cardFooter}>
                        <div>
                          <span style={styles.price}>${p.price}</span>
                          <span style={styles.stock}>{p.stock} left</span>
                        </div>
                        <button style={styles.buyBtn} onClick={() => placeOrder(p)}>
                          Add to Cart 🛒
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {tab === 'orders' && (
          <div style={styles.ordersSection}>
            <h2 style={styles.sectionTitle}>Your Orders</h2>
            {orders.length === 0 ? (
              <div style={styles.emptyOrders}>
                <p style={{ fontSize: 48 }}>🛒</p>
                <p>No orders yet — go shop!</p>
                <button style={styles.shopNowBtn} onClick={() => setTab('shop')}>Shop Now</button>
              </div>
            ) : (
              <div style={styles.ordersList}>
                {orders.map(o => (
                  <div key={o.id} style={styles.orderCard}>
                    <div style={styles.orderIcon}>📦</div>
                    <div style={styles.orderInfo}>
                      <p style={styles.orderTitle}>Order #{o.id}</p>
                      <p style={styles.orderMeta}>Product ID: {o.productId} · Qty: {o.quantity}</p>
                    </div>
                    <span style={styles.statusBadge}>{o.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  wrapper:    { minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", position: 'relative' },
  bgGradient: { position: 'fixed', inset: 0, background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', zIndex: 0 },
  bgImage:    { position: 'fixed', inset: 0, background: 'url("https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600") center/cover', opacity: 0.07, zIndex: 0 },
  nav: {
    position: 'relative', zIndex: 10,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '16px 40px',
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  },
  navBrand:     { fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: 1 },
  navLinks:     { display: 'flex', gap: 8 },
  navBtn:       { padding: '8px 20px', borderRadius: 20, border: 'none', cursor: 'pointer', background: 'transparent', color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: 600 },
  navBtnActive: { background: 'rgba(255,255,255,0.15)', color: '#fff' },
  navUser:      { display: 'flex', alignItems: 'center', gap: 10 },
  avatar:       { width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #667eea, #764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 16 },
  userName:     { color: '#fff', fontWeight: 600, fontSize: 14 },
  logoutBtn:    { padding: '6px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: '#fff', cursor: 'pointer', fontSize: 13 },
  badge:        { background: '#f093fb', color: '#fff', borderRadius: 10, padding: '1px 7px', fontSize: 11, marginLeft: 6 },
  toast: {
    position: 'fixed', top: 80, right: 24, zIndex: 100,
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: '#fff', padding: '14px 24px', borderRadius: 12,
    boxShadow: '0 8px 30px rgba(0,0,0,0.3)', fontWeight: 600, fontSize: 14,
  },
  content:    { position: 'relative', zIndex: 1, padding: '40px' },
  hero:       { textAlign: 'center', marginBottom: 40 },
  heroTitle:  { fontSize: 36, fontWeight: 800, color: '#fff', margin: '0 0 8px' },
  heroSub:    { color: 'rgba(255,255,255,0.6)', fontSize: 16, margin: 0 },
  loading:    { textAlign: 'center', color: '#fff', fontSize: 18, padding: 60 },
  grid:       { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24, maxWidth: 1200, margin: '0 auto' },
  card: {
    borderRadius: 20, overflow: 'hidden',
    background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.15)',
    transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer',
  },
  cardHover:  { transform: 'translateY(-8px)', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' },
  imgWrapper: { position: 'relative', height: 200, overflow: 'hidden' },
  img:        { width: '100%', height: '100%', objectFit: 'cover' },
  imgOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' },
  cardBody:   { padding: 20 },
  productName:{ margin: '0 0 16px', fontSize: 18, fontWeight: 700, color: '#fff' },
  cardFooter: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  price:      { fontSize: 22, fontWeight: 800, color: '#f093fb', display: 'block' },
  stock:      { fontSize: 12, color: 'rgba(255,255,255,0.5)', display: 'block' },
  buyBtn: {
    padding: '10px 18px', borderRadius: 12, border: 'none', cursor: 'pointer',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: '#fff', fontSize: 13, fontWeight: 700,
    boxShadow: '0 4px 15px rgba(102,126,234,0.4)', whiteSpace: 'nowrap',
  },
  ordersSection: { maxWidth: 700, margin: '0 auto' },
  sectionTitle:  { color: '#fff', fontSize: 28, fontWeight: 800, marginBottom: 24 },
  emptyOrders:   { textAlign: 'center', color: 'rgba(255,255,255,0.6)', padding: 60 },
  shopNowBtn: {
    marginTop: 16, padding: '12px 32px', borderRadius: 12, border: 'none', cursor: 'pointer',
    background: 'linear-gradient(135deg, #667eea, #764ba2)', color: '#fff', fontSize: 15, fontWeight: 700,
  },
  ordersList:  { display: 'flex', flexDirection: 'column', gap: 12 },
  orderCard: {
    display: 'flex', alignItems: 'center', gap: 16,
    background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.15)', borderRadius: 16, padding: '16px 20px',
  },
  orderIcon:   { fontSize: 32 },
  orderInfo:   { flex: 1 },
  orderTitle:  { margin: 0, color: '#fff', fontWeight: 700, fontSize: 16 },
  orderMeta:   { margin: '4px 0 0', color: 'rgba(255,255,255,0.5)', fontSize: 13 },
  statusBadge: { padding: '6px 14px', borderRadius: 20, background: 'rgba(102,126,234,0.3)', color: '#a78bfa', fontSize: 12, fontWeight: 700 },
};
