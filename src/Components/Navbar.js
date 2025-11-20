import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    else setUser(null);
  }, [location.pathname]);

  const logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      {/* LEFT LINKS */}
      <div className="nav-left">
        <Link to="/">Home</Link>
        <Link to="/course">Courses</Link>
      </div>

      {/* RIGHT LINKS */}
      <div className="nav-right">
        {user ? (
          <>
            <span className="user-greeting">Hello, {user.name}</span>

            <Link to="/my-courses">My Courses</Link>

            <button onClick={logoutHandler} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
