import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [name, setName]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]     = useState('');

  const handle = (e) => {
    e.preventDefault();
    if (!name.trim())     return setError('Please enter your name');
    if (!password.trim()) return setError('Please enter a password');
    onLogin(name.trim());
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.overlay} />
      <div style={styles.card}>
        <div style={styles.logo}>🛍️</div>
        <h1 style={styles.title}>ShopLux</h1>
        <p style={styles.subtitle}>Your premium shopping destination</p>

        <form onSubmit={handle} style={styles.form}>
          <input
            style={styles.input}
            placeholder="Your name"
            value={name}
            onChange={e => { setName(e.target.value); setError(''); }}
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(''); }}
          />
          {error && <p style={styles.error}>{error}</p>}
          <button style={styles.btn} type="submit">Sign In →</button>
        </form>
        <p style={styles.hint}>Demo: any name + any password</p>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Segoe UI', sans-serif",
  },
  overlay: {
    position: 'fixed', inset: 0,
    background: 'url("https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600") center/cover',
    opacity: 0.15,
    zIndex: 0,
  },
  card: {
    position: 'relative', zIndex: 1,
    background: 'rgba(255,255,255,0.95)',
    borderRadius: 24,
    padding: '48px 40px',
    width: '100%', maxWidth: 400,
    boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
    textAlign: 'center',
  },
  logo:     { fontSize: 48, marginBottom: 8 },
  title:    { margin: '0 0 4px', fontSize: 32, fontWeight: 800, color: '#2d1b69' },
  subtitle: { margin: '0 0 32px', color: '#888', fontSize: 14 },
  form:     { display: 'flex', flexDirection: 'column', gap: 14 },
  input: {
    padding: '14px 16px', borderRadius: 12, fontSize: 15,
    border: '2px solid #e8e8e8', outline: 'none',
    transition: 'border 0.2s',
  },
  error:  { color: '#e53e3e', fontSize: 13, margin: 0 },
  btn: {
    padding: '14px', borderRadius: 12, border: 'none', cursor: 'pointer',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: '#fff', fontSize: 16, fontWeight: 700,
    boxShadow: '0 4px 15px rgba(102,126,234,0.5)',
    transition: 'transform 0.2s',
  },
  hint: { marginTop: 16, color: '#aaa', fontSize: 12 },
};
