import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

// =====================================================
// RENDER BACKEND API
// =====================================================

const API_URL = "https://fitzone-gym-backend.onrender.com";

export default function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    memberName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    plan: "",
    password: "",
    confirmPassword: "",
  });

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
  // HANDLE MEMBER REGISTER
  // =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    // ---------------------------------------------------
    // PASSWORD CHECK
    // ---------------------------------------------------

    if (formData.password !== formData.confirmPassword) {

      alert("Passwords do not match!");

      return;
    }

    // ---------------------------------------------------
    // START LOADING
    // ---------------------------------------------------

    setLoading(true);

    try {

      // =================================================
      // REGISTER MEMBER + LOGIN ACCOUNT
      // Backend: POST /register
      // =================================================

      const response = await fetch(
        `${API_URL}/register`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({

            memberName: formData.memberName,
            email: formData.email,
            phone: formData.phone,
            age: Number(formData.age),
            gender: formData.gender,
            plan: formData.plan,
            password: formData.password,
            confirmPassword: formData.confirmPassword,

          }),
        }
      );

      // =================================================
      // RESPONSE
      // =================================================

      const data = await response.json();

      console.log("Register Response:", data);

      // =================================================
      // REGISTER FAILED
      // =================================================

      if (!response.ok) {

        alert(
          data.message ||
          data.error ||
          "Registration failed"
        );

        return;
      }

      // =================================================
      // REGISTER SUCCESS
      // =================================================

      alert(
        "Registration Successful!\n\n" +
        "Your FitZone Member account has been created.\n\n" +
        "Please login using your Email and Password."
      );

      // =================================================
      // CLEAR FORM
      // =================================================

      setFormData({
        memberName: "",
        email: "",
        phone: "",
        age: "",
        gender: "",
        plan: "",
        password: "",
        confirmPassword: "",
      });

      // =================================================
      // GO TO LOGIN
      // =================================================

      navigate("/login");

    } catch (error) {

      console.error(
        "Member Registration Error:",
        error
      );

      alert(
        "Unable to connect to server.\n\n" +
        "Please try again."
      );

    } finally {

      setLoading(false);

    }

  };

  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="register-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="register-header">

        <div className="register-logo">

          <div className="register-logo-icon">
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
          className="back-home"
        >
          ← Back to Home
        </a>

      </header>

      {/* =================================================
          REGISTRATION SECTION
      ================================================= */}

      <section className="register-section">

        <div className="register-container">

          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <div className="register-info">

            <p className="register-subtitle">
              START YOUR JOURNEY
            </p>

            <h1>
              JOIN <span>FITZONE</span>
            </h1>

            <p className="register-description">
              Create your membership account and start your
              fitness journey with FitZone Gym.
            </p>

            <div className="register-benefits">

              {/* MODERN EQUIPMENT */}

              <div className="benefit">

                <span>
                  🏋️
                </span>

                <div>

                  <h3>
                    Modern Equipment
                  </h3>

                  <p>
                    Train with quality gym equipment.
                  </p>

                </div>

              </div>

              {/* EXPERT TRAINERS */}

              <div className="benefit">

                <span>
                  👨‍🏫
                </span>

                <div>

                  <h3>
                    Expert Trainers
                  </h3>

                  <p>
                    Get guidance from certified trainers.
                  </p>

                </div>

              </div>

              {/* FLEXIBLE PLANS */}

              <div className="benefit">

                <span>
                  💳
                </span>

                <div>

                  <h3>
                    Flexible Plans
                  </h3>

                  <p>
                    Choose a plan that suits you.
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              REGISTRATION CARD
          ================================================= */}

          <div className="register-card">

            {/* FORM HEADING */}

            <div className="form-heading">

              <h2>
                Create Member Account
              </h2>

              <p>
                Fill in your details to register
              </p>

            </div>

            {/* =================================================
                FORM
            ================================================= */}

            <form onSubmit={handleSubmit}>

              {/* =================================================
                  FULL NAME
              ================================================= */}

              <div className="form-group">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  name="memberName"
                  value={formData.memberName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />

              </div>

              {/* =================================================
                  EMAIL + PHONE
              ================================================= */}

              <div className="form-row">

                {/* EMAIL */}

                <div className="form-group">

                  <label>
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    required
                  />

                </div>

                {/* PHONE */}

                <div className="form-group">

                  <label>
                    Mobile Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                    required
                  />

                </div>

              </div>

              {/* =================================================
                  AGE + GENDER
              ================================================= */}

              <div className="form-row">

                {/* AGE */}

                <div className="form-group">

                  <label>
                    Age
                  </label>

                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Enter age"
                    min="10"
                    max="100"
                    required
                  />

                </div>

                {/* GENDER */}

                <div className="form-group">

                  <label>
                    Gender
                  </label>

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select Gender
                    </option>

                    <option value="Male">
                      Male
                    </option>

                    <option value="Female">
                      Female
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>

              </div>

              {/* =================================================
                  MEMBERSHIP PLAN
              ================================================= */}

              <div className="form-group">

                <label>
                  Membership Plan
                </label>

                <select
                  name="plan"
                  value={formData.plan}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Membership Plan
                  </option>

                  <option value="1 Month">
                    1 Month
                  </option>

                  <option value="3 Months">
                    3 Months
                  </option>

                  <option value="6 Months">
                    6 Months
                  </option>

                  <option value="12 Months">
                    12 Months
                  </option>

                </select>

              </div>

              {/* =================================================
                  PASSWORD + CONFIRM PASSWORD
              ================================================= */}

              <div className="form-row">

                {/* PASSWORD */}

                <div className="form-group">

                  <label>
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create password"
                    minLength="6"
                    required
                  />

                </div>

                {/* CONFIRM PASSWORD */}

                <div className="form-group">

                  <label>
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    minLength="6"
                    required
                  />

                </div>

              </div>

              {/* =================================================
                  TERMS
              ================================================= */}

              <div className="terms">

                <input
                  type="checkbox"
                  id="terms"
                  required
                />

                <label htmlFor="terms">
                  I agree to the FitZone membership
                  terms and conditions.
                </label>

              </div>

              {/* =================================================
                  REGISTER BUTTON
              ================================================= */}

              <button
                type="submit"
                className="register-btn"
                disabled={loading}
              >

                {loading
                  ? "CREATING ACCOUNT..."
                  : "CREATE ACCOUNT"
                }

                {!loading && (
                  <span>
                    →
                  </span>
                )}

              </button>

            </form>

            {/* =================================================
                LOGIN LINK
            ================================================= */}

            <p className="login-text">

              Already have an account?

              <a href="/login">
                {" "}Login here
              </a>

            </p>

          </div>

        </div>

      </section>

      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="register-footer">

        <p>
          © 2026 FitZone Gym. All rights reserved.
        </p>

      </footer>

    </div>

  );

}
