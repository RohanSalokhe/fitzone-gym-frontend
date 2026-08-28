import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

// =====================================================
// FITZONE GYM MANAGEMENT SYSTEM
// LOGIN PAGE
// Render Backend API
// =====================================================

const API_URL = "https://fitzone-gym-backend.onrender.com";

export default function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  // =====================================================
  // HANDLE LOGIN
  // =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {

      // =================================================
      // LOGIN API
      // =================================================

      const response = await fetch(
        `${API_URL}/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: formData.email.trim(),
            password: formData.password,
          }),
        }
      );


      const data = await response.json();


      console.log("Login Response:", data);


      // =================================================
      // LOGIN FAILED
      // =================================================

      if (!response.ok) {

        setMessage(
          data.message ||
          data.error ||
          "Invalid Email or Password"
        );

        return;
      }


      // =================================================
      // CLEAR OLD LOGIN DATA
      // =================================================

      localStorage.removeItem("adminId");
      localStorage.removeItem("adminName");
      localStorage.removeItem("adminEmail");

      localStorage.removeItem("userId");
      localStorage.removeItem("memberId");
      localStorage.removeItem("memberName");
      localStorage.removeItem("memberEmail");
      localStorage.removeItem("memberPhone");
      localStorage.removeItem("memberAge");
      localStorage.removeItem("memberGender");
      localStorage.removeItem("memberPlan");
      localStorage.removeItem("userType");
      localStorage.removeItem("role");


      // =================================================
      // ADMIN LOGIN
      // =================================================

      if (
        data.userType === "admin" ||
        data.role === "admin"
      ) {

        // Save admin information

        localStorage.setItem(
          "userType",
          "admin"
        );

        localStorage.setItem(
          "role",
          "admin"
        );

        localStorage.setItem(
          "adminId",
          data.adminId
        );

        localStorage.setItem(
          "adminName",
          data.adminName
        );

        localStorage.setItem(
          "adminEmail",
          data.email
        );


        // Success message

        console.log(
          "Admin Login Successful"
        );


        // Open Admin Dashboard

        navigate("/dashboard");

        return;
      }


      // =================================================
      // MEMBER LOGIN
      // =================================================

      if (
        data.userType === "member" ||
        data.role === "member"
      ) {

        // Save member information

        localStorage.setItem(
          "userType",
          "member"
        );

        localStorage.setItem(
          "role",
          data.role || "member"
        );

        localStorage.setItem(
          "userId",
          data.userId
        );

        localStorage.setItem(
          "memberId",
          data.memberId
        );

        localStorage.setItem(
          "memberName",
          data.memberName
        );

        localStorage.setItem(
          "memberEmail",
          data.email
        );

        localStorage.setItem(
          "memberPhone",
          data.phone || ""
        );

        localStorage.setItem(
          "memberAge",
          data.age || ""
        );

        localStorage.setItem(
          "memberGender",
          data.gender || ""
        );

        localStorage.setItem(
          "memberPlan",
          data.plan || ""
        );


        // Success message

        console.log(
          "Member Login Successful"
        );


        // =================================================
        // OPEN MEMBER DASHBOARD
        // =================================================

        navigate("/memberdashboard");

        return;
      }


      // =================================================
      // UNKNOWN USER TYPE
      // =================================================

      setMessage(
        "Login successful, but user type was not recognized."
      );

    } catch (error) {

      // =================================================
      // SERVER CONNECTION ERROR
      // =================================================

      console.error(
        "Login Error:",
        error
      );

      setMessage(
        "Server connection failed. Please check your internet connection and try again."
      );

    } finally {

      setLoading(false);

    }

  };


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="login-page">


      {/* =================================================
          HEADER
      ================================================= */}

      <header className="login-header">

        <div className="login-logo">

          <div className="login-logo-icon">
            🏋️
          </div>

          <div>

            <h2>
              FIT<span>ZONE</span>
            </h2>

            <small>
              GYM
            </small>

          </div>

        </div>


        <a
          href="/"
          className="login-back-home"
        >
          ← Back to Home
        </a>

      </header>



      {/* =================================================
          LOGIN SECTION
      ================================================= */}

      <section className="login-section">

        <div className="login-container">


          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <div className="login-info">

            <p className="login-subtitle">
              WELCOME BACK
            </p>


            <h1>

              GET BACK

              <br />

              <span>
                INTO ACTION
              </span>

            </h1>


            <p className="login-description">

              Login to your FitZone account and continue your
              fitness journey with us.

            </p>


            <div className="login-benefits">


              {/* TRAIN HARD */}

              <div className="login-benefit">

                <span>
                  🏋️
                </span>

                <div>

                  <h3>
                    Train Hard
                  </h3>

                  <p>
                    Push your limits every day.
                  </p>

                </div>

              </div>



              {/* REACH GOALS */}

              <div className="login-benefit">

                <span>
                  🎯
                </span>

                <div>

                  <h3>
                    Reach Your Goals
                  </h3>

                  <p>
                    Stay focused on your fitness goals.
                  </p>

                </div>

              </div>



              {/* STAY STRONG */}

              <div className="login-benefit">

                <span>
                  💪
                </span>

                <div>

                  <h3>
                    Stay Strong
                  </h3>

                  <p>
                    Build a stronger and healthier lifestyle.
                  </p>

                </div>

              </div>


            </div>

          </div>



          {/* =================================================
              LOGIN CARD
          ================================================= */}

          <div className="login-card">


            {/* LOGIN HEADING */}

            <div className="login-heading">

              <h2>
                Member Login
              </h2>

              <p>
                Enter your account details to continue
              </p>

            </div>



            {/* =================================================
                LOGIN FORM
            ================================================= */}

            <form onSubmit={handleSubmit}>


              {/* =================================================
                  EMAIL
              ================================================= */}

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
                  autoComplete="email"
                  required
                />

              </div>



              {/* =================================================
                  PASSWORD
              ================================================= */}

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
                  autoComplete="current-password"
                  required
                />

              </div>



              {/* =================================================
                  REMEMBER + FORGOT
              ================================================= */}

              <div className="login-options">

                <label className="remember">

                  <input
                    type="checkbox"
                  />

                  <span>
                    Remember me
                  </span>

                </label>


                <a
                  href="#"
                  className="forgot-password"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(
                      "Please contact FitZone Gym administration to reset your password."
                    );
                  }}
                >
                  Forgot Password?
                </a>

              </div>



              {/* =================================================
                  MESSAGE
              ================================================= */}

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



              {/* =================================================
                  LOGIN BUTTON
              ================================================= */}

              <button
                type="submit"
                className="login-btn"
                disabled={loading}
              >

                {loading
                  ? "LOGGING IN..."
                  : "LOGIN"
                }

                {!loading && (
                  <span>
                    →
                  </span>
                )}

              </button>


            </form>



            {/* =================================================
                REGISTER LINK
            ================================================= */}

            <p className="register-text">

              Don't have an account?

              <a href="/register">
                {" "}Create Account
              </a>

            </p>


          </div>

        </div>

      </section>



      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="login-footer">

        <p>
          © 2026 FitZone Gym. All rights reserved.
        </p>

      </footer>


    </div>

  );

}