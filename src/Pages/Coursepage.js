import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';
import './Main.css';
import { Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Coursepage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);

  // Fetch course details
  useEffect(() => {
    api.get(`/courses/${id}`).then((res) => {
      setCourse(res.data);
    });
  }, [id]);

  // ⭐ LOGIN CHECK FUNCTION
  const checkLogin = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };

  // 👉 BUY COURSE HANDLER (WITH LOGIN CHECK)
  const buyCourse = async (amount, name, courseId) => {
    // 1️⃣ Block purchase if not logged in
    if (!checkLogin()) {
      toast.warning('Please login first to buy this course.');
      navigate('/login');
      return;
    }

    try {
      // 2️⃣ Create Razorpay Order
      const res = await api.post('/payment/create-order', { amount });

      const options = {
        key: 'rzp_test_RhQaBRZivDVjUn',
        amount: res.data.amount,
        currency: 'INR',
        name: 'Your LMS Website',
        description: name,
        order_id: res.data.id,

        handler: async function (response) {
          toast.success('Payment Successful!');

          try {
            // 3️⃣ Save enrollment
            const saveRes = await api.post('/enroll/save', {
              courseId: courseId,
              paymentId: response.razorpay_payment_id
            });

            console.log('Enrollment Saved:', saveRes.data);

            // 4️⃣ Redirect to My Courses
            navigate('/my-courses');
          } catch (err) {
            console.error('Enroll Error:', err);
            toast.error('Error saving enrollment.');
          }
        },

        theme: { color: '#0d6efd' }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('PAYMENT ERROR:', err);
      toast.error('Payment Failed');
    }
  };

  if (!course) {
    return (
      <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</h2>
    );
  }

  return (
    <div style={{ padding: '40px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'right',
          marginRight: '50px'
        }}
      >
        <Card style={{ width: '25rem' }}>
          <Card.Img
            variant="top"
            src={course.image} // ⬅ Cloudinary Image URL
            alt={course.title}
            onError={(e) => {
              e.target.src =
                'https://via.placeholder.com/400x250?text=No+Image';
            }}
            style={{ height: '250px', objectFit: 'cover' }}
          />

          <Card.Body>
            <Card.Title>{course.title}</Card.Title>
            <Card.Text>{course.description}</Card.Text>

            <h3>₹{course.price}</h3>

            {/* BUY NOW BUTTON */}
            <Button
              variant="success"
              style={{ width: '100%', marginTop: '10px' }}
              onClick={() => buyCourse(course.price, course.title, course._id)}
            >
              Buy Now
            </Button>

            {/* BACK BUTTON */}
            <Button
              variant="outline-secondary"
              style={{ width: '100%', marginTop: '10px' }}
              onClick={() => navigate('/course')}
            >
              Back to Courses
            </Button>
          </Card.Body>
        </Card>
      </div>

      <div className="detailspage">
        <h3 style={{ fontWeight: '600', marginBottom: '15px' }}>
          About this Course
        </h3>

        <p>
          This course is designed for beginners who want to start learning web
          development using {course.title}. You’ll learn all the fundamental
          concepts step by step with hands-on examples and practical projects.
        </p>

        <h4 style={{ marginTop: '30px', fontWeight: '600' }}>
          What You’ll Learn
        </h4>

        <ul style={{ marginLeft: '20px' }}>
          {course.content &&
            course.content.map((topic, index) => <li key={index}>{topic}</li>)}
        </ul>

        <p style={{ marginTop: '20px' }}>
          <strong>Duration:</strong> 4 weeks | <strong>Level:</strong> Beginner
        </p>
      </div>
    </div>
  );
};

export default Coursepage;
