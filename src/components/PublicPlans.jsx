import React from "react";
import { Link } from "react-router-dom";
import "./publicplans.css";

export default function PublicPlans() {
  const plans = [
    {
      name: "1 Month",
      price: "₹999",
      duration: "1 Month",
      features: [
        "Gym Access",
        "Basic Equipment",
        "Locker Facility",
        "Flexible Timings",
      ],
    },
    {
      name: "3 Months",
      price: "₹2499",
      duration: "3 Months",
      popular: true,
      features: [
        "Gym Access",
        "Modern Equipment",
        "Locker Facility",
        "Flexible Timings",
        "Basic Trainer Support",
      ],
    },
    {
      name: "6 Months",
      price: "₹4499",
      duration: "6 Months",
      features: [
        "Gym Access",
        "Modern Equipment",
        "Locker Facility",
        "Flexible Timings",
        "Expert Trainer Support",
        "Fitness Guidance",
      ],
    },
    {
      name: "12 Months",
      price: "₹7999",
      duration: "12 Months",
      features: [
        "Unlimited Gym Access",
        "Modern Equipment",
        "Locker Facility",
        "Flexible Timings",
        "Personal Trainer Support",
        "Fitness Guidance",
        "Priority Support",
      ],
    },
  ];

  return (
    <div className="public-plans-page">

      {/* ================= HEADER ================= */}

      <header className="public-plans-header">

        <Link to="/" className="public-logo">
          <span>FIT</span>ZONE
        </Link>

        <div className="public-nav-buttons">
          <Link to="/" className="home-btn">
            Home
          </Link>

          <Link to="/login" className="login-btn">
            Login
          </Link>

          <Link to="/register" className="register-btn">
            Register
          </Link>
        </div>

      </header>


      {/* ================= HERO ================= */}

      <section className="plans-hero">

        <p className="plans-small-title">
          FITZONE MEMBERSHIP
        </p>

        <h1>
          CHOOSE YOUR <span>PLAN</span>
        </h1>

        <p className="plans-description">
          Choose the membership plan that fits your fitness goals
          and start your journey with FitZone today.
        </p>

      </section>


      {/* ================= PLANS ================= */}

      <section className="public-plans-section">

        <div className="plans-grid">

          {plans.map((plan, index) => (

            <div
              className={`public-plan-card ${
                plan.popular ? "popular-plan" : ""
              }`}
              key={index}
            >

              {plan.popular && (
                <div className="popular-badge">
                  MOST POPULAR
                </div>
              )}

              <div className="plan-icon">
                🏋️
              </div>

              <h2>
                {plan.name}
              </h2>

              <div className="plan-price">
                {plan.price}
              </div>

              <p className="plan-duration">
                {plan.duration} Membership
              </p>

              <div className="plan-divider"></div>

              <ul>

                {plan.features.map((feature, featureIndex) => (

                  <li key={featureIndex}>
                    <span>✓</span>
                    {feature}
                  </li>

                ))}

              </ul>

              <Link
                to="/register"
                className="choose-plan-btn"
              >
                JOIN NOW →
              </Link>

            </div>

          ))}

        </div>

      </section>


      {/* ================= BOTTOM CTA ================= */}

      <section className="plans-cta">

        <h2>
          READY TO START YOUR FITNESS JOURNEY?
        </h2>

        <p>
          Join FitZone today and take the first step towards
          a stronger and healthier lifestyle.
        </p>

        <Link to="/register" className="cta-register-btn">
          CREATE ACCOUNT
        </Link>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="public-plans-footer">

        <div className="footer-logo">
          <span>FIT</span>ZONE
        </div>

        <p>
          © 2026 FitZone Gym. All rights reserved.
        </p>

      </footer>

    </div>
  );
}