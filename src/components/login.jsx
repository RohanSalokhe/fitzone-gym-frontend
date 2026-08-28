import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  // ================= LOGIN API =================
  const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {

      const response = await fetch("https://fitzone-gym-backend.onrender.com/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });


      const data = await response.json();


      // ================= LOGIN SUCCESS =================
      if (response.ok) {

        console.log("Login Response:", data);

        // Admin information save
        localStorage.setItem("adminId", data.adminId);
        localStorage.setItem("adminName", data.adminName);
        localStorage.setItem("adminEmail", data.email);

        // Dashboard open
        navigate("/dashboard");

      } else {

        // Login failed
        setMessage(
          data.message || "Invalid Email or Password"
        );

      }

    } catch (error) {

      console.log("Login Error:", error);

      setMessage(
        "Server connection failed. Please start the backend server."
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="login-page">

      {/* Header */}
      <header className="login-header">

        <div className="login-logo">

          <div className="login-logo-icon">
            🏋️
          </div>

          <div>
            <h2>
              FIT<span>ZONE</span>
            </h2>

            <small>GYM</small>
          </div>

        </div>


        <a href="/" className="login-back-home">
          ← Back to Home
        </a>

      </header>


      {/* Login Section */}
      <section className="login-section">

        <div className="login-container">


          {/* Left Side */}
          <div className="login-info">

            <p className="login-subtitle">
              WELCOME BACK
            </p>

            <h1>
              GET BACK
              <br />
              <span>INTO ACTION</span>
            </h1>

            <p className="login-description">
              Login to your FitZone account and continue your
              fitness journey with us.
            </p>


            <div className="login-benefits">

              <div className="login-benefit">

                <span>🏋️</span>

                <div>
                  <h3>Train Hard</h3>
                  <p>Push your limits every day.</p>
                </div>

              </div>


              <div className="login-benefit">

                <span>🎯</span>

                <div>
                  <h3>Reach Your Goals</h3>
                  <p>Stay focused on your fitness goals.</p>
                </div>

              </div>


              <div className="login-benefit">

                <span>💪</span>

                <div>
                  <h3>Stay Strong</h3>
                  <p>Build a stronger and healthier lifestyle.</p>
                </div>

              </div>

            </div>

          </div>


          {/* Login Card */}
          <div className="login-card">

            <div className="login-heading">

              <h2>Member Login</h2>

              <p>
                Enter your account details to continue
              </p>

            </div>


            <form onSubmit={handleSubmit}>


              {/* Email */}
              <div className="login-form-group">

                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />

              </div>


              {/* Password */}
              <div className="login-form-group">

                <label>
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  minLength="6"
                  required
                />

              </div>


              {/* Remember + Forgot */}
              <div className="login-options">

                <label className="remember">

                  <input type="checkbox" />

                  <span>
                    Remember me
                  </span>

                </label>

                <a
                  href="#"
                  className="forgot-password"
                >
                  Forgot Password?
                </a>

              </div>


              {/* Error / Success Message */}
              {message && (
                <p
                  style={{
                    color: "#ff6600",
                    marginBottom: "15px",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {message}
                </p>
              )}


              {/* Login Button */}
              <button
                type="submit"
                className="login-btn"
                disabled={loading}
              >

                {loading ? "LOGGING IN..." : "LOGIN"}

                {!loading && <span>→</span>}

              </button>

            </form>


            {/* Register */}
            <p className="register-text">

              Don't have an account?

              <a href="/register">
                {" "}Create Account
              </a>

            </p>

          </div>

        </div>

      </section>


      {/* Footer */}
      <footer className="login-footer">

        <p>
          © 2026 FitZone Gym. All rights reserved.
        </p>

      </footer>

    </div>
  );
}