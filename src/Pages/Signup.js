import React, { useState } from 'react';
import './Data/Login.css';
import api from '../api/api';
import { toast } from 'react-toastify';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async () => {
    try {
      const res = await api.post('/auth/signup', {
        name,
        email,
        password
      });

      toast.success(res.data.message);

      if (res.data.message === 'Signup successful') {
        window.location.href = '/login'; // redirect to login page
      }
    } catch (err) {
      toast.error('Signup failed');
    }
  };

  return (
    <div className="signup-container">
      <div className="login-page7">
        <h1 className="header">SIGNUP PAGE</h1>

        <input
          type="text"
          placeholder="USERNAME"
          className="username"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />

        <input
          type="email"
          placeholder="EMAIL"
          className="username"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />

        <input
          type="password"
          placeholder="PASSWORD"
          className="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />

        <button onClick={submitHandler} className="Submit">
          SIGNUP
        </button>
      </div>
    </div>
  );
};

export default Signup;
