// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { Button, Card } from 'react-bootstrap';

// const Course = () => {
//   const [items, setItems] = useState([]);

//   console.log('Course Component Loaded'); // Debug check

//   useEffect(() => {
//     console.log('useEffect running...');

//     const getCourses = async () => {
//       try {
//         console.log('Calling backend API...');
//         const res = await axios.get('http://localhost:5000/api/courses');
//         console.log('API Response:', res.data);
//         setItems(res.data);
//       } catch (error) {
//         console.log('Axios Error:', error);
//       }
//     };

//     getCourses();
//   }, []);

//   return (
//     <div className="Coursepage" style={{ padding: '40px' }}>
//       <h2 className="text-center mb-4">Our Courses</h2>

//       <div
//         className="Course"
//         style={{
//           display: 'flex',
//           flexWrap: 'wrap',
//           justifyContent: 'center',
//           gap: '20px'
//         }}
//       >
//         {items.map((item) => (
//           <div className="itemdiv" key={item._id}>
//             <Card
//               style={{
//                 width: '18rem',
//                 textAlign: 'center',
//                 transition: 'transform 0.3s ease, box-shadow 0.3s ease'
//               }}
//             >
//               {/* TEMPORARY IMAGE FIX — show placeholder image */}
//               <Card.Img
//                 variant="top"
//                 src={`http://localhost:5000/uploads/${item.image}`}
//                 onError={(e) => {
//                   e.target.src =
//                     'https://via.placeholder.com/300x180?text=No+Image';
//                 }}
//                 style={{ height: '180px', objectFit: 'cover' }}
//               />

//               <Card.Body>
//                 <Card.Title>{item.title}</Card.Title>
//                 <Card.Text>{item.description}</Card.Text>

//                 <div className="price-btn">
//                   <h4 className="price">₹{item.price}</h4>

//                   <Link to={`/course/${item._id}`}>
//                     <Button
//                       variant="outline-primary"
//                       style={{ marginTop: '10px' }}
//                     >
//                       View Details
//                     </Button>
//                   </Link>
//                 </div>
//               </Card.Body>
//             </Card>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Course;
import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const Course = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get('/courses').then((res) => setItems(res.data));
  }, []);

  return (
    <div style={{ padding: '135px' }} className="coursecls">
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        {items.map((item) => (
          <Card key={item._id} style={{ width: '18rem' }}>
            <Card.Img
              variant="top"
              src={item.image} // Cloudinary URL
              onError={(e) => {
                e.target.src =
                  'https://via.placeholder.com/300x180?text=No+Image';
              }}
              style={{ height: '180px', objectFit: 'cover' }}
            />

            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>{item.description}</Card.Text>

              <h4>₹{item.price}</h4>

              <Link to={`/course/${item._id}`}>
                <Button variant="primary">View Details</Button>
              </Link>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Course;
