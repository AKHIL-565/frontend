import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { toast } from 'react-toastify';

const MyCourses = () => {
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      toast.warning('Please login first!');
      window.location.href = '/login';
      return;
    }

    const fetchData = async () => {
      try {
        const res = await api.get('/enroll/my-courses');
        setMyCourses(res.data);
      } catch (err) {
        console.error('MyCourses Error:', err.response || err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <h2 style={{ padding: 40 }}>Loading your courses...</h2>;
  }

  if (myCourses.length === 0) {
    return (
      <div style={{ padding: 40 }}>
        <h2>No Courses Purchased Yet</h2>
        <p>Buy a course to start learning!</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>My Courses</h2>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 20,
          marginTop: 20
        }}
      >
        {myCourses.map((enroll) => {
          const course = enroll.courseId;

          return (
            <div
              key={enroll._id}
              style={{
                width: 260,
                border: '1px solid #ddd',
                borderRadius: 8,
                padding: 12,
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
              }}
            >
              <img
                src={course.image} // <<--- CLOUDINARY URL!!!
                alt={course.title}
                style={{
                  width: '100%',
                  height: 150,
                  objectFit: 'cover',
                  borderRadius: 6
                }}
                onError={(e) => {
                  e.target.src =
                    'https://via.placeholder.com/300x200?text=No+Image';
                }}
              />

              <h4 style={{ marginTop: 10 }}>{course.title}</h4>
              <p>{course.description?.slice(0, 80)}...</p>

              {/* START LEARNING BUTTON */}
              <button
                style={{
                  width: '100%',
                  padding: 8,
                  background: '#0d6efd',
                  color: '#fff',
                  border: 'none',
                  marginTop: 10,
                  borderRadius: 6,
                  cursor: 'pointer'
                }}
                onClick={() => (window.location.href = `/learn/${course._id}`)}
              >
                Start Learning
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyCourses;
