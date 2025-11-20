// // import React from 'react'
// // import { Link } from 'react-router-dom'
// // import { useForm } from "react-hook-form"

// // const Course = () => {

// //   const { register, handleSubmit,} = useForm({ defaultValues: {   email: "",  password: "" }});

// //   const onSubmit = (data) => console.log(data)

// //   return (
// //     <form onSubmit={handleSubmit(onSubmit)}>
// //       <div className='lgn'>
// //

// //           <h1 className='header'>LOGIN PAGE</h1>

// //           <input
// //             type="email"
// //             placeholder="USERNAME"
// //
// //             {...register("email", { required: true })}
// //           />

// //           <br /><br />

// //           <input
// //             type="password"
// //             placeholder="PASSWORD"
// //             className="password"
// //             {...register("password", { required: true })}
// //           />

// //           <br /><br />

// //           <input type="submit" value="SUBMIT" className='Submit' />

// //           <div className='cls'>
// //             <p>Don't Have An Account?</p>
// //             <Link to="/signup">SIGN UP</Link>
// //           </div>

// //         </div>
// //       </div>
// //     </form>
// //   );
// // }

// // export default Course;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Data/Login.css';
// import api from '../api/api';

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const submitHandler = async () => {
//     try {
//       const res = await api.post('/auth/login', { email, password });

//       // Save user + token
//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem('user', JSON.stringify(res.data.user));

//       alert('Login successful');

//       setEmail('');
//       setPassword('');

//       // navigate instead of window.location.href
//       navigate('/home');
//     } catch (error) {
//       alert('Invalid Credentials');
//     }
//   };

//   return (
//     <div className="blur-bg">
//       <div className="lgn">
//         <div className="login-page7">
//           <h1 className="header">LOGIN PAGE</h1>

//           <input
//             type="text"
//             placeholder="EMAIL"
//             className="username"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <br />
//           <br />

//           <input
//             type="password"
//             placeholder="PASSWORD"
//             className="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <br />
//           <br />

//           <button className="Submit" onClick={submitHandler}>
//             SUBMIT
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Data/Login.css';
import api from '../api/api';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    if (!email || !password) {
      toast.warning('Please enter both email and password');
      return;
    }

    try {
      setLoading(true);

      const res = await api.post('/auth/login', { email, password });

      // Save user + token
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      toast.success('Login successful');

      // Clear inputs
      setEmail('');
      setPassword('');

      // Redirect (fixed)
      navigate('/course');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Invalid Credentials');
      } else {
        toast.error('Something went wrong!');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="blur-bg">
      <div className="lgn">
        <div className="login-page7">
          <h1 className="header">LOGIN PAGE</h1>

          <input
            type="text"
            placeholder="EMAIL"
            className="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <br />
          <br />

          <input
            type="password"
            placeholder="PASSWORD"
            className="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <br />
          <br />

          <button className="Submit" onClick={submitHandler} disabled={loading}>
            {loading ? 'Logging in...' : 'SUBMIT'}
          </button>

          <div className="cls">
            <p>Don’t have an account?</p>
            <a href="/signup">SIGN UP</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
