import React from "react";
import { Link } from "react-router-dom";
import { FaLock, FaCloud, FaRocket } from "react-icons/fa";
import Notes from "./Notes"; // ✅ import Notes component

function Home(props) {
  const isLoggedIn = localStorage.getItem("token"); // ✅ check login

  if (isLoggedIn) {
    // ✅ If logged in → show Notes dashboard
    return (
      <div className="container my-4">
         <Notes showAlert={props.showAlert} />
      </div>
    );
  }

  // ✅ Otherwise show landing page
  return (
    <div className="container my-5">
      {/* Hero Section */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6 text-center text-md-start">
          <h1 className="display-4 fw-bold">
            Take Notes Smarter with <span className="text-primary">iNotebook</span>
          </h1>
          <p className="lead text-muted mt-3">
            Write, organize, and secure your ideas in one simple cloud-based notebook.  
            Access your notes anytime, anywhere, on any device.
          </p>
          <div className="mt-4">
            <Link to="/signup" className="btn btn-primary btn-lg me-3"> Get Started </Link>
            <Link to="/about" className="btn btn-outline-secondary btn-lg"> Learn More </Link>
          </div>
        </div>
        <div className="col-md-6 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2920/2920244.png"
            alt="Notebook Illustration"
            className="img-fluid"
            style={{ maxHeight: "300px" }}
          />
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="row g-4 text-center">
        <div className="col-md-4">
          <div className="card shadow-sm border-0 h-100 p-4 rounded-3">
            <FaLock size={40} className="text-primary mb-3" />
            <h5 className="fw-bold">Secure Notes</h5>
            <p className="text-muted">
              Protected with authentication & encryption for your peace of mind.
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0 h-100 p-4 rounded-3">
            <FaCloud size={40} className="text-success mb-3" />
            <h5 className="fw-bold">Cloud Sync</h5>
            <p className="text-muted">
              Your notes are always available — anytime, anywhere.
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0 h-100 p-4 rounded-3">
            <FaRocket size={40} className="text-warning mb-3" />
            <h5 className="fw-bold">Fast & Easy</h5>
            <p className="text-muted">
              Lightweight design with a smooth and responsive user experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
