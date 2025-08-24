import React from "react";
import { FaLock, FaPenFancy, FaCloud, FaBolt, FaTags, FaReact, FaNodeJs, FaDatabase } from "react-icons/fa";

function About() {
  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">About <span className="text-primary">iNotebook</span></h1>
      <p className="text-center lead mb-5">
        A modern, secure, and cloud-based notebook app to organize your thoughts and ideas.  
        <br />Your notes, always with you ✨
      </p>

      {/* Features Section */}
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card shadow h-100 text-center p-4 border-0 rounded-3">
            <FaLock size={40} className="text-primary mb-3" />
            <h5>Secure Login</h5>
            <p className="text-muted">Protect your notes with JWT authentication and encrypted passwords.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow h-100 text-center p-4 border-0 rounded-3">
            <FaPenFancy size={40} className="text-success mb-3" />
            <h5>Easy Note Management</h5>
            <p className="text-muted">Create, edit, and delete notes with a smooth and responsive UI.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow h-100 text-center p-4 border-0 rounded-3">
            <FaCloud size={40} className="text-info mb-3" />
            <h5>Cloud Access</h5>
            <p className="text-muted">Access your notes anytime, anywhere with full cloud synchronization.</p>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card shadow h-100 text-center p-4 border-0 rounded-3">
            <FaBolt size={40} className="text-warning mb-3" />
            <h5>Fast & Responsive</h5>
            <p className="text-muted">Built with React and Bootstrap for speed and a clean experience.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow h-100 text-center p-4 border-0 rounded-3">
            <FaTags size={40} className="text-danger mb-3" />
            <h5>Organize with Tags</h5>
            <p className="text-muted">Categorize your notes with tags to stay organized.</p>
          </div>
        </div>
      </div>

      {/* Tech Stack Section */}
      <h2 className="text-center mb-4">🚀 Our Tech Stack</h2>
      <div className="row text-center">
        <div className="col-md-4">
          <FaReact size={50} className="text-info mb-2" />
          <h6>React + Bootstrap</h6>
        </div>
        <div className="col-md-4">
          <FaNodeJs size={50} className="text-success mb-2" />
          <h6>Node.js + Express</h6>
        </div>
        <div className="col-md-4">
          <FaDatabase size={50} className="text-warning mb-2" />
          <h6>MongoDB + Mongoose</h6>
        </div>
      </div>

      <p className="text-center mt-5 text-muted">
        iNotebook is your personal digital diary — simple, fast, and secure.  
        <br />Say goodbye to messy notebooks and hello to productivity ✨
      </p>
    </div>
  );
}

export default About;
