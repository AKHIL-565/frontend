// import React from 'react'
// import { Link } from 'react-router-dom'
// import './Main.css'

// const Course = () => {
//   return (
// <div className='mainhome'>

// <div className='homemain'>

// <h1 >WELCOME TO WEB WORLD</h1>
// <p> Learn Full Stack Web Development in Malayalam through expert-led tutorials and hands-on projects. Build real-world websites and applications while mastering HTML, CSS, JavaScript, React, Node.js, and more. Our step-by-step Malayalam lessons make complex coding concepts easy to understand, helping you gain the practical skills and confidence needed to excel in today’s tech industry.</p>
// <Link to="/course">
//   <button className="buton">CHECK OUR COURSE</button>
// </Link>

// <div  className='imagehome'>
//  <img
//     src={require('./Assets/HTML.jpg')}
//     alt="Web Development"

//   />
//   </div>
// </div>

//     <div  className='pagecourse'>
// <div className='homehead'>
// <h1>PROJECT BASED LEARNING</h1>

// <p>Enhance your web development skills through hands-on, project-based learning in malayalam. Our courses guide you in building fully functional websites and applications, reinforcing essential coding languages like HTML, CSS, and JavaScript. Whether you're a beginner or an aspiring developer, our practical projects help you gain real-world experience and create a portfolio that stands out.

// </p>

// </div>
// <div className='homehead'>
// <h1>Mastering Software Development
// </h1>

// <p>Advance your software development skills with our in-depth courses, crafted for Malayalam-speaking learners. Learn core programming languages like Python, Java, and JavaScript, along with essential frameworks and tools. From building dynamic web applications to creating scalable software solutions, our project-based approach helps you gain real-world experience. Elevate your career and stay ahead in the ever-evolving tech industry with practical coding skills and expert</p>

// </div>

// <div className='homehead'>
// <h1>Interview Oriented Tasks

// </h1>

// <p>Prepare for your next tech interview with our curated collection of interview-oriented tasks. Designed for Malayalam-speaking learners, these tasks cover essential coding challenges, algorithm problems, and system design questions commonly asked by top tech companies. Gain hands-on practice, enhance problem-solving skills, and boost your confidence to crack technical interviews with ease.</p>

// </div>

//     </div>
//     </div>
//   )
// }

// export default Course

import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import './Data/Home.css';

const Home = () => {
  return (
    <div>
      <div className="hero">
        {/* LEFT TEXT */}
        <div className="hero-content">
          <h1>WELCOME TO WEB WORLD</h1>

          <p>
            Learn Full Stack Web Development in Malayalam through expert-led
            tutorials and hands-on projects. Build real- world websites and
            applications while mastering HTML, CSS, JavaScript, React, Node.js,
            and more.
          </p>

          <Link to="/course">
            <button className="hero-btn">CHECK OUR COURSE</button>
          </Link>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hero-image">
          <img src={require('./Assets/HTML.jpg')} alt="Web Development" />
        </div>
      </div>

      {/* PAGE CONTENT BELOW HERO */}
      <div className="pagecourse">
        <div className="homehead">
          <h1>PROJECT BASED LEARNING</h1>
          <p>Enhance your skills through hands-on, project-based learning.</p>
        </div>

        <div className="homehead">
          <h1>Mastering Software Development</h1>
          <p>
            Learn core languages like Python, Java, and JavaScript with real
            projects.
          </p>
        </div>

        <div className="homehead">
          <h1>Interview Oriented Tasks</h1>
          <p>
            Prepare for interviews with coding challenges and technical tasks.
          </p>
        </div>
        <div className="homehead">
          <h1>Project Based Tasks</h1>
          <p>Project Based Tasks and Skill Developments</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
