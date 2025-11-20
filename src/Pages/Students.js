import React, { useEffect, useState } from 'react';
import api from '../api/api';
import Sidebar from '../Components/Sidebar';

const Students = () => {
  const [students, setStudents] = useState([]);

  const loadStudents = async () => {
    const res = await api.get('/students');
    setStudents(res.data);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <div className="admin-wrapper">
      <Sidebar />

      <div className="admin-content">
        <h2>Students List</h2>

        {students.map((s) => (
          <div key={s._id} className="course-list-item">
            <h3>{s.name}</h3>
            <p>{s.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Students;
