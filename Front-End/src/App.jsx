import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "./App.css";
import ScrollToTop from "./utils/components/ScrollToTop.jsx";

import Home from "./components/Home.jsx";
import StudentRegistrationForm from "./components/Register.jsx";
import LoginForm from "./components/login.jsx";



function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Redirect root path to Home */}
        <Route path="/" element={<Navigate to="/Home" />} />
        <Route path="/Home" element={< Home />} />
        <Route path="/Courses" element={<h1>Courses</h1>} />
        <Route path="/Register" element={<StudentRegistrationForm />} />
        <Route path="/About" element={<h1>About</h1>} />
        <Route path="/Gallery" element={<h1>Gallery</h1>} />
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/Logout" element={<h1>Logout</h1>} />
        <Route path="/Profile" element={<h1>Profile</h1>} />

        {/* Exams Section */}
        <Route path="/Exams/Exam-Instruction" element={<h1>Exam Instruction</h1>} />
        <Route path="/Exams/Exam-Result" element={<h1>Exam Result</h1>} />
        <Route path="/Exams/Weekly-Exam" element={<h1>Weekly Exam</h1>} />
        <Route path="/Exams/Final-Exam" element={<h1>Final Exam</h1>} />

        {/* Verification Section */}
        <Route path="/Verification/Verify-Student" element={<h1>Verify Student</h1>} />
        <Route path="/Verification/Verify-Staff" element={<h1>Verify Staff</h1>} />

        {/* Resources Section */}
        <Route path="/Resources/Syllabus" element={<h1>Syllabus</h1>} />
        <Route path="/Resources/Study-Material" element={<h1>Study Material</h1>} />

        {/* Job Section */}
        <Route path="/Job/Career-Guidance" element={<h1>Career Guidance</h1>} />
        <Route path="/Job/Job-Apply" element={<h1>Job Apply</h1>} />

        {/* Admin Section */}
        <Route path="/Admin/Dashboard" element={<h1>Dashboard</h1>} />
        <Route path="/Admin/Manage-Users" element={<h1>Manage Users</h1>} />
        <Route path="/Admin/Manage-Courses" element={<h1>Manage Courses</h1>} />
        <Route path="/Admin/Manage-Exams" element={<h1>Manage Exams</h1>} />
        <Route path="/Admin/Manage-Resources" element={<h1>Manage Resources</h1>} />
        <Route path="/Admin/Student-Attendence" element={<h1>Student Attendence</h1>} />
        <Route path="/Admin/Staff-Attendence" element={<h1>Staff Attendence</h1>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
