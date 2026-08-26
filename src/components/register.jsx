import React, { useState } from "react";
import "./register.css";

export default function Register() {
  const [formData, setFormData] = useState({
    memberId: "",
    memberName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    plan: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Registration Data:", formData);
    alert("Registration Successful!");

    setFormData({
      memberId: "",
      memberName: "",
      email: "",
      phone: "",
      age: "",
      gender: "",
      plan: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="register-page">

      {/* Header */}
      <header className="register-header">

        <div className="register-logo">
          <div className="register-logo-icon">🏋️</div>

          <div>
            <h2>
              FIT<span>ZONE</span>
            </h2>
            <small>GYM</small>
          </div>
        </div>

        <a href="/" className="back-home">
          ← Back to Home
        </a>

      </header>


      {/* Registration Section */}
      <section className="register-section">

        <div className="register-container">

          {/* Left Side */}
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

              <div className="benefit">
                <span>🏋️</span>
                <div>
                  <h3>Modern Equipment</h3>
                  <p>Train with quality gym equipment.</p>
                </div>
              </div>

              <div className="benefit">
                <span>👨‍🏫</span>
                <div>
                  <h3>Expert Trainers</h3>
                  <p>Get guidance from certified trainers.</p>
                </div>
              </div>

              <div className="benefit">
                <span>💳</span>
                <div>
                  <h3>Flexible Plans</h3>
                  <p>Choose a plan that suits you.</p>
                </div>
              </div>

            </div>

          </div>


          {/* Registration Form */}
          <div className="register-card">

            <div className="form-heading">
              <h2>Create Account</h2>
              <p>Fill in your details to register</p>
            </div>

            <form onSubmit={handleSubmit}>

              {/* Member ID */}
              <div className="form-group">
                <label>Member ID</label>

                <input
                  type="text"
                  name="memberId"
                  value={formData.memberId}
                  onChange={handleChange}
                  placeholder="Enter Member ID"
                  required
                />
              </div>


              {/* Name */}
              <div className="form-group">
                <label>Full Name</label>

                <input
                  type="text"
                  name="memberName"
                  value={formData.memberName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>


              {/* Email + Phone */}
              <div className="form-row">

                <div className="form-group">
                  <label>Email</label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Mobile Number</label>

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


              {/* Age + Gender */}
              <div className="form-row">

                <div className="form-group">
                  <label>Age</label>

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


                <div className="form-group">
                  <label>Gender</label>

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>

                </div>

              </div>


              {/* Plan */}
              <div className="form-group">

                <label>Membership Plan</label>

                <select
                  name="plan"
                  value={formData.plan}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Membership Plan</option>
                  <option value="1 Month">1 Month</option>
                  <option value="3 Months">3 Months</option>
                  <option value="6 Months">6 Months</option>
                  <option value="12 Months">12 Months</option>
                </select>

              </div>


              {/* Password */}
              <div className="form-row">

                <div className="form-group">
                  <label>Password</label>

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

                <div className="form-group">
                  <label>Confirm Password</label>

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


              {/* Terms */}
              <div className="terms">

                <input
                  type="checkbox"
                  id="terms"
                  required
                />

                <label htmlFor="terms">
                  I agree to the FitZone membership terms and conditions.
                </label>

              </div>


              {/* Submit */}
              <button
                type="submit"
                className="register-btn"
              >
                CREATE ACCOUNT
                <span>→</span>
              </button>

            </form>


            {/* Login */}
            <p className="login-text">
              Already have an account?
              <a href="/login"> Login here</a>
            </p>

          </div>

        </div>

      </section>


      {/* Footer */}
      <footer className="register-footer">
        <p>
          © 2026 FitZone Gym. All rights reserved.
        </p>
      </footer>

    </div>
  );
}