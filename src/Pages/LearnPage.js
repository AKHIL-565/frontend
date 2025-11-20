import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';

const LearnPage = () => {
  const { id } = useParams(); // courseId
  const [course, setCourse] = useState(null);

  const dummyLessons = {
    HTML: [
      'Introduction to HTML',
      'HTML Tags Explained',
      'Creating Your First Webpage',
      'Headings, Paragraphs & Lists',
      'Images, Links & Tables'
    ],
    CSS: [
      'What is CSS?',
      'Selectors & Properties',
      'Colors, Backgrounds',
      'Flexbox Basics',
      'Responsive Design'
    ],
    JavaScript: [
      'Intro to JavaScript',
      'Variables & Data Types',
      'Functions',
      'DOM Manipulation',
      'Events'
    ]
  };

  useEffect(() => {
    api.get(`/courses/${id}`).then((res) => {
      setCourse(res.data);
    });
  }, [id]);

  if (!course) return <h2 style={{ padding: 40 }}>Loading...</h2>;

  // ------------------------------------
  // SMART MATCHING FOR ANY TITLE FORMAT
  // ------------------------------------
  const title = course.title.toLowerCase();
  let lessons = ['No lessons available for this course.'];

  if (title.includes('html')) {
    lessons = dummyLessons.HTML;
  } else if (title.includes('css')) {
    lessons = dummyLessons.CSS;
  } else if (
    title.includes('javascript') ||
    title.includes('java script') ||
    title.includes('js')
  ) {
    lessons = dummyLessons.JavaScript;
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>{course.title} - Lessons</h2>

      <ul style={{ marginTop: 20, fontSize: 18 }}>
        {lessons.map((item, index) => (
          <li key={index} style={{ marginBottom: 10 }}>
            {item}
          </li>
        ))}
      </ul>

      <button
        style={{
          marginTop: 20,
          padding: '10px 20px',
          background: '#0d6efd',
          color: 'white',
          border: 'none',
          borderRadius: 6
        }}
        onClick={() => (window.location.href = '/my-courses')}
      >
        Back to My Courses
      </button>
    </div>
  );
};

export default LearnPage;
