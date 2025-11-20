import React, { useEffect, useState } from 'react';
import api from '../api/api';
import './Data/admin.css';
import Sidebar from '../Components/Sidebar';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const Admin = () => {
  const location = useLocation();

  const showCourses =
    location.pathname === '/admin' || location.pathname === '/admin/courses';

  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    _id: '',
    title: '',
    description: '',
    price: '',
    image: null,
    content: '',
    notes: ''
  });

  const loadCourses = async () => {
    const res = await api.get('/courses');
    setCourses(res.data);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  // ADD COURSE
  const addCourse = async () => {
    const contentArray = form.content.split(',');
    const notesArray = form.notes.split(',');

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('price', form.price);
    formData.append('image', form.image);
    formData.append('content', JSON.stringify(contentArray));
    formData.append('notes', JSON.stringify(notesArray));

    await api.post('/courses/add', formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // ❗ DO NOT ADD Authorization here
      }
    });

    toast.success('Course Added');

    setForm({
      _id: '',
      title: '',
      description: '',
      price: '',
      image: null,
      content: '',
      notes: ''
    });

    loadCourses();
  };

  // UPDATE COURSE
  const updateCourse = async () => {
    if (!form._id) {
      toast.warning('Select a course to update');
      return;
    }

    const contentArray = form.content.split(',');
    const notesArray = form.notes.split(',');

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('price', form.price);

    if (form.image) {
      formData.append('image', form.image);
    }

    formData.append('content', JSON.stringify(contentArray));
    formData.append('notes', JSON.stringify(notesArray));

    await api.put(`/courses/update/${form._id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // ❗ DO NOT ADD Authorization here
      }
    });

    toast.success('Course Updated');

    setForm({
      _id: '',
      title: '',
      description: '',
      price: '',
      image: null,
      content: '',
      notes: ''
    });

    loadCourses();
  };

  // DELETE COURSE
  const deleteCourse = async (id) => {
    await api.delete(`/courses/delete/${id}`); // Axios sends token automatically
    toast.success('Deleted');
    loadCourses();
  };

  // EDIT
  const editCourse = (course) => {
    setForm({
      _id: course._id,
      title: course.title,
      description: course.description,
      price: course.price,
      image: null,
      content: course.content.join(','),
      notes: course.notes ? course.notes.join(',') : ''
    });
  };

  return (
    <div className="admin-wrapper">
      <Sidebar />

      <div className="admin-content">
        {showCourses && (
          <>
            <h1 className="admin-title">Course Management</h1>

            <h2 className="admin-section-title">Add / Update Course</h2>

            <input
              className="admin-input"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <input
              className="admin-input"
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <input
              className="admin-input"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />

            <input
              type="file"
              className="admin-input"
              onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
            />

            <input
              className="admin-input"
              placeholder="Content (comma separated)"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />

            <input
              className="admin-input"
              placeholder="Notes (comma separated)"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />

            <button className="admin-button" onClick={addCourse}>
              Add Course
            </button>

            <button className="admin-button" onClick={updateCourse}>
              Update Course
            </button>

            <h2 className="admin-section-title" style={{ marginTop: '40px' }}>
              Course List
            </h2>

            {courses.map((course) => (
              <div key={course._id} className="course-list-item">
                <h3 className="course-title">{course.title}</h3>

                <div className="course-actions">
                  <button
                    className="admin-button"
                    onClick={() => editCourse(course)}
                  >
                    Edit
                  </button>
                  <button
                    className="admin-button delete"
                    onClick={() => deleteCourse(course._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;
