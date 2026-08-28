
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./dashboard.css";

const API_URL = "https://fitzone-gym-backend.onrender.com";

export default function Dashboard() {

  // ==========================================
  // DASHBOARD DATA
  // ==========================================

  const [dashboardData, setDashboardData] = useState({
    totalMembers: 0,
    totalPlans: 0,
    totalPayments: 0,
    totalAmount: 0
  });

  const [members, setMembers] = useState([]);
  const [planCounts, setPlanCounts] = useState({
    "1 Month": 0,
    "3 Months": 0,
    "6 Months": 0,
    "12 Months": 0
  });

  const [loading, setLoading] = useState(true);


  // ==========================================
  // FETCH DASHBOARD DATA
  // ==========================================

  const fetchDashboard = async () => {

    try {

      setLoading(true);

      const response = await fetch(`${API_URL}/dashboard`, {
        method: "GET",
        headers: {
          "Authorization": "admin"
        }
      });

      const data = await response.json();

      console.log("Dashboard Response:", data);

      if (!response.ok) {
        throw new Error(
          data.message ||
          data.error ||
          `Dashboard error (${response.status})`
        );
      }

      setDashboardData({
        totalMembers: Number(data.totalMembers) || 0,
        totalPlans: Number(data.totalPlans) || 0,
        totalPayments: Number(data.totalPayments) || 0,
        totalAmount: Number(data.totalAmount) || 0
      });

    } catch (error) {

      console.error("Dashboard API Error:", error);

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // FETCH MEMBERS
  // ==========================================

  const fetchMembers = async () => {

    try {

      const response = await fetch(`${API_URL}/members`, {
        method: "GET",
        headers: {
          "Authorization": "admin"
        }
      });

      const data = await response.json();

      console.log("Members Response:", data);

      if (!response.ok) {
        throw new Error(
          data.message ||
          data.error ||
          `Members error (${response.status})`
        );
      }

      const memberList = Array.isArray(data)
        ? data
        : data.members || [];

      setMembers(memberList);


      // ==========================================
      // PLAN COUNTS
      // ==========================================

      const counts = {
        "1 Month": 0,
        "3 Months": 0,
        "6 Months": 0,
        "12 Months": 0
      };

      memberList.forEach((member) => {

        if (counts.hasOwnProperty(member.plan)) {
          counts[member.plan]++;
        }

      });

      setPlanCounts(counts);

    } catch (error) {

      console.error("Members API Error:", error);

    }

  };


  // ==========================================
  // LOAD DATA
  // ==========================================

  useEffect(() => {

    fetchDashboard();
    fetchMembers();

  }, []);


  // ==========================================
  // PLAN PROGRESS
  // ==========================================

  const maxPlanCount = Math.max(
    ...Object.values(planCounts),
    1
  );

  const getProgress = (count) => {

    return `${Math.round(
      (count / maxPlanCount) * 100
    )}%`;

  };


  // ==========================================
  // GET INITIALS
  // ==========================================

  const getInitials = (name) => {

    if (!name) return "M";

    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .substring(0, 2)
      .toUpperCase();

  };


  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {

    if (!date) {
      return "N/A";
    }

    const d = new Date(date);

    if (isNaN(d.getTime())) {
      return "N/A";
    }

    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });

  };


  return (

    <>

      {/* =======================================
          HEADER
      ======================================== */}

      <header className="dashboard-header">

        <div>

          <p className="dashboard-welcome">
            Welcome back,
          </p>

          <h1>
            Admin <span>Dashboard</span>
          </h1>

        </div>


        <div className="admin-profile">

          <div className="notification">

            🔔

            <span>
              3
            </span>

          </div>


          <div className="admin-avatar">
            R
          </div>


          <div>

            <h4>
              Rohan
            </h4>

            <p>
              Administrator
            </p>

          </div>

        </div>

      </header>


      {/* =======================================
          STATISTICS
      ======================================== */}

      <section className="stats-grid">


        {/* TOTAL MEMBERS */}

        <div className="stat-card">

          <div className="stat-icon">
            👥
          </div>

          <div>

            <p>
              Total Members
            </p>

            <h2>

              {loading
                ? "..."
                : dashboardData.totalMembers}

            </h2>

            <span className="positive">
              Total registered members
            </span>

          </div>

        </div>


        {/* TOTAL PAYMENT */}

        <div className="stat-card">

          <div className="stat-icon">
            💳
          </div>

          <div>

            <p>
              Total Payments
            </p>

            <h2>

              ₹
              {loading
                ? "..."
                : dashboardData.totalAmount.toLocaleString("en-IN")}

            </h2>

            <span className="positive">

              {loading
                ? "Loading..."
                : `${dashboardData.totalPayments} payment records`}

            </span>

          </div>

        </div>


        {/* TOTAL PLANS */}

        <div className="stat-card">

          <div className="stat-icon">
            📋
          </div>

          <div>

            <p>
              Total Plans
            </p>

            <h2>

              {loading
                ? "..."
                : dashboardData.totalPlans}

            </h2>

            <span className="positive">
              Membership plans
            </span>

          </div>

        </div>


        {/* PAYMENT RECORDS */}

        <div className="stat-card">

          <div className="stat-icon">
            📊
          </div>

          <div>

            <p>
              Payment Records
            </p>

            <h2>

              {loading
                ? "..."
                : dashboardData.totalPayments}

            </h2>

            <span className="positive">
              Total payment transactions
            </span>

          </div>

        </div>

      </section>


      {/* =======================================
          DASHBOARD GRID
      ======================================== */}

      <section className="dashboard-grid">


        {/* =====================================
            RECENT MEMBERS
        ====================================== */}

        <div className="dashboard-card recent-members">

          <div className="card-header">

            <div>

              <h2>
                Recent Members
              </h2>

              <p>
                Latest registered members
              </p>

            </div>


            <Link to="/dashboard/members">
              View All →
            </Link>

          </div>


          <div className="table-container">

            <table>

              <thead>

                <tr>

                  <th>
                    Member
                  </th>

                  <th>
                    Plan
                  </th>

                  <th>
                    Member ID
                  </th>

                  <th>
                    Status
                  </th>

                </tr>

              </thead>


              <tbody>

                {members.length === 0 ? (

                  <tr>

                    <td
                      colSpan="4"
                      style={{
                        textAlign: "center",
                        padding: "30px"
                      }}
                    >
                      No members found
                    </td>

                  </tr>

                ) : (

                  members
                    .slice(0, 4)
                    .map((member) => (

                      <tr key={member.memberId}>

                        <td>

                          <div className="member-name">

                            <span>
                              {getInitials(
                                member.memberName
                              )}
                            </span>

                            {member.memberName}

                          </div>

                        </td>


                        <td>
                          {member.plan || "N/A"}
                        </td>


                        <td>
                          {member.memberId}
                        </td>


                        <td>

                          <span className="status active-status">
                            Active
                          </span>

                        </td>

                      </tr>

                    ))

                )}

              </tbody>

            </table>

          </div>

        </div>


        {/* =====================================
            MEMBERSHIP OVERVIEW
        ====================================== */}

        <div className="dashboard-card membership-overview">

          <div className="card-header">

            <div>

              <h2>
                Membership Overview
              </h2>

              <p>
                Current plan distribution
              </p>

            </div>

          </div>


          {/* 1 MONTH */}

          <div className="plan-item">

            <div className="plan-info">

              <span>
                1 Month
              </span>

              <strong>
                {planCounts["1 Month"]}
              </strong>

            </div>

            <div className="progress">

              <div
                className="progress-bar"
                style={{
                  width: getProgress(
                    planCounts["1 Month"]
                  )
                }}
              />

            </div>

          </div>


          {/* 3 MONTHS */}

          <div className="plan-item">

            <div className="plan-info">

              <span>
                3 Months
              </span>

              <strong>
                {planCounts["3 Months"]}
              </strong>

            </div>

            <div className="progress">

              <div
                className="progress-bar"
                style={{
                  width: getProgress(
                    planCounts["3 Months"]
                  )
                }}
              />

            </div>

          </div>


          {/* 6 MONTHS */}

          <div className="plan-item">

            <div className="plan-info">

              <span>
                6 Months
              </span>

              <strong>
                {planCounts["6 Months"]}
              </strong>

            </div>

            <div className="progress">

              <div
                className="progress-bar"
                style={{
                  width: getProgress(
                    planCounts["6 Months"]
                  )
                }}
              />

            </div>

          </div>


          {/* 12 MONTHS */}

          <div className="plan-item">

            <div className="plan-info">

              <span>
                12 Months
              </span>

              <strong>
                {planCounts["12 Months"]}
              </strong>

            </div>

            <div className="progress">

              <div
                className="progress-bar"
                style={{
                  width: getProgress(
                    planCounts["12 Months"]
                  )
                }}
              />

            </div>

          </div>

        </div>

      </section>


      {/* =======================================
          QUICK ACTIONS
      ======================================== */}

      <section className="quick-section">

        <h2>
          Quick Actions
        </h2>


        <div className="quick-grid">


          {/* ADD MEMBER */}

          <Link
            to="/dashboard/members"
            className="quick-card"
          >

            <span>
              ➕
            </span>

            <div>

              <h3>
                Add Member
              </h3>

              <p>
                Register a new gym member
              </p>

            </div>

          </Link>


          {/* ADD PAYMENT */}

          <Link
            to="/dashboard/payments"
            className="quick-card"
          >

            <span>
              💰
            </span>

            <div>

              <h3>
                Add Payment
              </h3>

              <p>
                Record a membership payment
              </p>

            </div>

          </Link>


          {/* MANAGE TRAINERS */}

          <Link
            to="/dashboard/trainers"
            className="quick-card"
          >

            <span>
              👨‍🏫
            </span>

            <div>

              <h3>
                Manage Trainers
              </h3>

              <p>
                View and manage trainers
              </p>

            </div>

          </Link>


          {/* REPORTS */}

          <Link
            to="/dashboard/reports"
            className="quick-card"
          >

            <span>
              📊
            </span>

            <div>

              <h3>
                View Reports
              </h3>

              <p>
                Check gym performance
              </p>

            </div>

          </Link>

        </div>

      </section>

    </>

  );

}
