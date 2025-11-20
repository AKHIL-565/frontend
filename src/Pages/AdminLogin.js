import React, { useState } from 'react';

const AdminLogin = () => {
  const [password, setPassword] = useState('');

  const submitHandler = () => {
    if (password === 'AkhilAdmin123') {
      localStorage.setItem('isAdmin', 'true');
      window.location.href = '/admin';
    } else {
      alert('Invalid Admin Password');
    }
  };

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h2>Admin Access</h2>

      <input
        type="password"
        placeholder="Enter Admin Password"
        style={{ padding: 10, width: 250, marginTop: 20 }}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <button
        onClick={submitHandler}
        style={{
          marginTop: 20,
          padding: '10px 20px',
          background: '#0d6efd',
          color: 'white',
          border: 'none',
          borderRadius: 6
        }}
      >
        Enter Admin Panel
      </button>
    </div>
  );
};

export default AdminLogin;
