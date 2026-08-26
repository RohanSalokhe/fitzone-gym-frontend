import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

function Home() {
    return (
        <div className="home-page">

            {/* ================= NAVBAR ================= */}
            <nav className="navbar">

                <div className="logo">
                    <span>FIT</span>ZONE
                </div>

                <div className="nav-links">

                    <Link to="/login" className="login-btn">
                        Login
                    </Link>

                    <Link to="/register" className="register-btn">
                        Register
                    </Link>

                </div>

            </nav>


            {/* ================= HERO SECTION ================= */}
            <section className="hero">

                <div className="hero-overlay"></div>

                <div className="hero-content">

                    <p className="hero-small">
                        WELCOME TO FITZONE
                    </p>

                    <h1>
                        BUILD YOUR
                        <span> DREAM BODY</span>
                    </h1>

                    <p className="hero-text">
                        Train harder. Stay stronger. Become the best
                        version of yourself with our professional gym
                        and expert trainers.
                    </p>

                    <div className="hero-buttons">

                        <Link to="/register" className="primary-btn">
                            JOIN NOW
                        </Link>

                        <Link to="/plans" className="secondary-btn">
                            VIEW PLANS
                        </Link>

                    </div>

                </div>

            </section>


            {/* ================= WHY CHOOSE US ================= */}
            <section className="why-section">

                <div className="section-title">

                    <p>WHY CHOOSE US</p>

                    <h2>
                        WE HELP YOU <span>ACHIEVE YOUR GOALS</span>
                    </h2>

                </div>


                <div className="why-cards">

                    <div className="why-card">

                        <div className="card-icon">🏋️</div>

                        <h3>Professional Trainers</h3>

                        <p>
                            Get proper guidance from experienced
                            and professional gym trainers.
                        </p>

                    </div>


                    <div className="why-card">

                        <div className="card-icon">💪</div>

                        <h3>Modern Equipment</h3>

                        <p>
                            Train with modern and high-quality
                            equipment for better workouts.
                        </p>

                    </div>


                    <div className="why-card">

                        <div className="card-icon">🎯</div>

                        <h3>Personal Training</h3>

                        <p>
                            Follow personalized workout plans
                            designed according to your goals.
                        </p>

                    </div>

                </div>

            </section>


            {/* ================= FEATURE STRIP ================= */}
            <section className="features">

                <div className="feature">

                    <div className="feature-icon">🏆</div>

                    <div>
                        <h3>Professional Trainers</h3>
                        <p>Expert guidance for better results</p>
                    </div>

                </div>


                <div className="feature">

                    <div className="feature-icon">📅</div>

                    <div>
                        <h3>Flexible Plans</h3>
                        <p>Choose a plan that suits you</p>
                    </div>

                </div>


                <div className="feature">

                    <div className="feature-icon">💳</div>

                    <div>
                        <h3>Easy Payment</h3>
                        <p>Simple and secure payment process</p>
                    </div>

                </div>


                <div className="feature">

                    <div className="feature-icon">🏋️</div>

                    <div>
                        <h3>Modern Equipment</h3>
                        <p>Latest equipment for your workout</p>
                    </div>

                </div>

            </section>


            {/* ================= CTA SECTION ================= */}
            <section className="cta-section">

                <div className="cta-content">

                    <p>START YOUR FITNESS JOURNEY TODAY</p>

                    <h2>
                        READY TO <span>GET STRONGER?</span>
                    </h2>

                    <p>
                        Join FitZone and take the first step
                        towards a healthier and stronger life.
                    </p>

                    <Link to="/register" className="cta-btn">
                        JOIN FITZONE
                    </Link>

                </div>

            </section>


            {/* ================= FOOTER ================= */}
            <footer className="footer">

                <div className="footer-content">


                    <div className="footer-about">

                        <div className="footer-logo">
                            <span>FIT</span>ZONE
                        </div>

                        <p>
                            Your fitness journey starts here.
                            Train hard, stay consistent and
                            achieve your fitness goals.
                        </p>

                    </div>


                    <div className="footer-links">

                        <h3>Quick Links</h3>

                        <Link to="/">Home</Link>
                        <Link to="/plans">Plans</Link>
                        <Link to="/trainers">Trainers</Link>
                        <Link to="/contact">Contact</Link>

                    </div>


                    <div className="footer-links">

                        <h3>Account</h3>

                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>

                    </div>


                    <div className="footer-contact">

                        <h3>Contact Us</h3>

                        <p>📍 Kolhapur, Maharashtra</p>
                        <p>📞 +91 98765 43210</p>
                        <p>✉️ fitzone@gmail.com</p>

                    </div>

                </div>


                <div className="footer-bottom">

                    <p>
                        © 2026 FitZone Gym. All Rights Reserved.
                    </p>

                </div>

            </footer>

        </div>
    );
}

export default Home;