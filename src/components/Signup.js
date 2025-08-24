import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup({ showAlert }) {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/"); // Redirect if already logged in
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credentials.password !== credentials.cpassword) {
      showAlert("Passwords do not match", "danger");
      return;
    }

    const { name, email, password } = credentials;
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      const json = await response.json();
      if (json.success) {
        localStorage.setItem("token", json.authToken);
        localStorage.setItem("userEmail", credentials.email);
        showAlert("Account created successfully!", "success");
        navigate("/");
      } else {
        showAlert(json.error || "Signup failed", "danger");
      }
    } 
    catch (error) {
      console.error("Signup error:", error);
      showAlert("Server error. Please try again later.", "danger");
    } 
    finally {
      setIsSubmitting(false);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Form validation
  const isFormValid =
    credentials.name.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email) && // better email regex
    credentials.password.length >= 5 &&
    credentials.password === credentials.cpassword;

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="card p-4 shadow" style={{ maxWidth: "450px", width: "100%" }}>
        <h2 className="text-center mb-4">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">👤 Name</label>
            <input type="text" className="form-control" id="name" name="name" onChange={onChange} required/>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">📧 Email</label>
            <input type="email" className="form-control" id="email" name="email" onChange={onChange} required/>
            <div className="form-text">We'll never share your email with anyone else.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">🔒 Password</label>
            <input type={showPassword ? "text" : "password"} className="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>
          </div>

          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">🔒 Confirm Password</label>
            <input type={showPassword ? "text" : "password"} className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
          </div>

          <div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" id="showPassword" onChange={() => setShowPassword(!showPassword)}/>
            <label className="form-check-label" htmlFor="showPassword">
              Show Passwords
            </label>
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={!isFormValid || isSubmitting}>
            {isSubmitting ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
