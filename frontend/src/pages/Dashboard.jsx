import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h1>Resume Screening System 🚀</h1>

      <Link to="/upload-resume">Upload Resume</Link>
      <br />
      <Link to="/upload-jd">Upload Job Description</Link>
    </div>
  );
}

export default Dashboard;