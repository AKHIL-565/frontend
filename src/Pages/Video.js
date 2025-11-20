// frontend/src/Pages/Video.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/api';
import { Button } from 'react-bootstrap';

const Video = () => {
  const { id } = useParams(); // course id
  const [allowed, setAllowed] = useState(false);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        // load course details
        const c = await api.get(`/courses/${id}`);
        setCourse(c.data);

        // check enrollment (protected)
        const res = await api.get(`/enroll/check/${id}`);
        setAllowed(res.data.enrolled);
      } catch (err) {
        console.error(err);
        setAllowed(false);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [id]);

  if (loading) return <div style={{ padding: 40 }}>Loading...</div>;

  if (!allowed) {
    return (
      <div style={{ padding: 40 }}>
        <h2>You are not enrolled in this course</h2>
        <p>
          Please <Link to={`/course/${id}`}>buy this course</Link> to access the
          videos.
        </p>
      </div>
    );
  }

  // Dummy video list — replace with real links later
  const videos = [
    {
      id: 1,
      title: 'Intro',
      src: 'https://www.w3schools.com/html/mov_bbb.mp4'
    },
    {
      id: 2,
      title: 'Lesson 1',
      src: 'https://www.w3schools.com/html/mov_bbb.mp4'
    }
  ];

  return (
    <div style={{ padding: 40 }}>
      <h2>{course?.title} — Videos</h2>
      <div style={{ display: 'flex', gap: 20, marginTop: 20 }}>
        <div style={{ flex: 1 }}>
          <video key="player" controls width="100%" src={videos[0].src} />
        </div>
        <div style={{ width: 300 }}>
          <h4>Lessons</h4>
          <ul>
            {videos.map((v) => (
              <li key={v.id}>
                <Button
                  variant="link"
                  onClick={() => {
                    const player = document.querySelector('video');
                    if (player) player.src = v.src;
                  }}
                >
                  {v.title}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Video;
