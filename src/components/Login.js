import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ showAlert }) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/"); // redirect if already logged in
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
      });

      const json = await response.json();
      if (json.success) {
        localStorage.setItem("token", json.authToken);
        localStorage.setItem("userEmail", credentials.email);
        showAlert("Logged in Successfully", "success");
        navigate("/");
      } 
      else {
        showAlert("Invalid credentials. Please try again.", "danger");
      }
    } 
    catch (error) {
      console.error("Login error:", error);
      showAlert("Unable to connect to server. Try again later.", "danger");
    } 
    finally {
      setLoading(false);
    }
  };

  const onChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Login to iNotebook</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">📧 Email address</label>
            <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" required/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">🔒 Password</label>
            <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password" required/>
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
