import React, { useState } from 'react';
import Login from './Login';
import Store from './Store';

export default function App() {
  const [customer, setCustomer] = useState(null);

  if (!customer) return <Login onLogin={setCustomer} />;
  return <Store customer={customer} onLogout={() => setCustomer(null)} />;
}
