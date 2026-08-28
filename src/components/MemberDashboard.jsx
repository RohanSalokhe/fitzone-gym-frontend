import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./memberdashboard.css";

const API_URL = "https://fitzone-gym-backend.onrender.com";

export default function MemberDashboard() {
  const [member, setMember] = useState({
    memberId: "",
    memberName: "Member",
    email: "",
    phone: "",
    age: "",
    gender: "",
    plan: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get logged-in member data
    const memberId = localStorage.getItem("memberId");
    const memberName = localStorage.getItem("memberName");
    const memberEmail = localStorage.getItem("memberEmail");
    const memberPhone = localStorage.getItem("memberPhone");
    const memberAge = localStorage.getItem("memberAge");
    const memberGender = localStorage.getItem("memberGender");
    const memberPlan = localStorage.getItem("memberPlan");

    console.log("Member Dashboard Data:", {
      memberId,
      memberName,
      memberEmail,
      memberPhone,
      memberAge,
      memberGender,
      memberPlan,
    });

    setMember({
      memberId: memberId || "",
      memberName: memberName || "Member",
      email: memberEmail || "",
      phone: memberPhone || "",
      age: memberAge || "",
      gender: memberGender || "",
      plan: memberPlan || "",
    });

    setLoading(false);
  }, []);

  const handleLogout = () => {
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

    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="member-dashboard-loading">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="member-dashboard">

      {/* ================= NAVBAR ================= */}

      <header className="member-dashboard-header">

        <div className="member-dashboard-logo">
          <span>FIT</span>ZONE
        </div>

        <nav className="member-dashboard-nav">
          <Link to="/memberdashboard">Dashboard</Link>
          <Link to="/">Home</Link>

          <button
            className="member-logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>

      </header>


      {/* ================= WELCOME ================= */}

      <section className="member-welcome">

        <div>
          <p>WELCOME BACK</p>

          <h1>
            Hello, <span>{member.memberName}</span> 👋
          </h1>

          <p className="welcome-text">
            Welcome to your FitZone member dashboard.
          </p>
        </div>

        <div className="member-id-box">
          <small>MEMBER ID</small>
          <strong>
            {member.memberId || "N/A"}
          </strong>
        </div>

      </section>


      {/* ================= STATS ================= */}

      <section className="member-stats">

        <div className="member-stat-card">
          <div className="member-stat-icon">🏋️</div>

          <div>
            <p>Membership Plan</p>
            <h2>{member.plan || "Not Assigned"}</h2>
          </div>
        </div>


        <div className="member-stat-card">
          <div className="member-stat-icon">👤</div>

          <div>
            <p>Member ID</p>
            <h2>{member.memberId || "N/A"}</h2>
          </div>
        </div>


        <div className="member-stat-card">
          <div className="member-stat-icon">📱</div>

          <div>
            <p>Mobile Number</p>
            <h2>{member.phone || "N/A"}</h2>
          </div>
        </div>


        <div className="member-stat-card">
          <div className="member-stat-icon">🎯</div>

          <div>
            <p>Status</p>
            <h2 className="active-text">Active</h2>
          </div>
        </div>

      </section>


      {/* ================= MAIN GRID ================= */}

      <section className="member-dashboard-grid">

        {/* PROFILE */}

        <div className="member-dashboard-card">

          <div className="member-card-header">
            <div>
              <h2>My Profile</h2>
              <p>Your registered information</p>
            </div>

            <span className="profile-icon">👤</span>
          </div>


          <div className="profile-details">

            <div className="profile-row">
              <span>Name</span>
              <strong>{member.memberName || "N/A"}</strong>
            </div>

            <div className="profile-row">
              <span>Email</span>
              <strong>{member.email || "N/A"}</strong>
            </div>

            <div className="profile-row">
              <span>Mobile</span>
              <strong>{member.phone || "N/A"}</strong>
            </div>

            <div className="profile-row">
              <span>Age</span>
              <strong>{member.age || "N/A"}</strong>
            </div>

            <div className="profile-row">
              <span>Gender</span>
              <strong>{member.gender || "N/A"}</strong>
            </div>

            <div className="profile-row">
              <span>Plan</span>
              <strong>{member.plan || "N/A"}</strong>
            </div>

          </div>

        </div>


        {/* MEMBERSHIP */}

        <div className="member-dashboard-card">

          <div className="member-card-header">

            <div>
              <h2>My Membership</h2>
              <p>Current membership details</p>
            </div>

            <span className="membership-icon">🏆</span>

          </div>


          <div className="membership-box">

            <div className="membership-title">
              <span>Current Plan</span>

              <strong>
                {member.plan || "No Plan"}
              </strong>
            </div>


            <div className="membership-status">
              <span className="status-dot"></span>
              Active Membership
            </div>


            <div className="membership-info">

              <div>
                <small>Member ID</small>
                <strong>
                  {member.memberId || "N/A"}
                </strong>
              </div>

              <div>
                <small>Status</small>
                <strong>Active</strong>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= QUICK ACTIONS ================= */}

      <section className="member-quick-section">

        <h2>Quick Actions</h2>

        <div className="member-quick-grid">

          <div className="member-quick-card">
            <span>📋</span>

            <div>
              <h3>My Membership</h3>
              <p>View your current membership plan</p>
            </div>
          </div>


          <div className="member-quick-card">
            <span>💳</span>

            <div>
              <h3>Payment</h3>
              <p>View your payment information</p>
            </div>
          </div>


          <div className="member-quick-card">
            <span>🏋️</span>

            <div>
              <h3>Training</h3>
              <p>Stay consistent with your workout</p>
            </div>
          </div>


          <Link
            to="/"
            className="member-quick-card"
          >
            <span>🏠</span>

            <div>
              <h3>Home</h3>
              <p>Go back to FitZone home page</p>
            </div>
          </Link>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="member-dashboard-footer">
        <p>
          © 2026 FitZone Gym. All rights reserved.
        </p>
      </footer>

    </div>
  );
}