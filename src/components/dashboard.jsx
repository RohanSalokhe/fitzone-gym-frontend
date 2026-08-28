import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./dashboard.css";

const API_URL = "https://fitzone-gym-backend.onrender.com";

export default function Dashboard() {

  // ===============================
  // DASHBOARD API DATA
  // ===============================

  const [dashboardData, setDashboardData] = useState({
    totalMembers: 0,
    totalPlans: 0,
    totalPayments: 0,
    totalAmount: 0
  });

  const [loading, setLoading] = useState(true);


  // ===============================
  // FETCH DASHBOARD DATA
  // ===============================

  useEffect(() => {

    const adminId = localStorage.getItem("adminId");

    if (!adminId) {
      console.error("Admin ID not found. Please login again.");
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/dashboard`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "adminId": adminId
      }
    })

      .then((response) => {

        if (!response.ok) {
          throw new Error(
            `Failed to fetch dashboard data (${response.status})`
          );
        }

        return response.json();

      })

      .then((data) => {

        console.log("Dashboard Response:", data);

        setDashboardData({
          totalMembers: data.totalMembers || 0,
          totalPlans: data.totalPlans || 0,
          totalPayments: data.totalPayments || 0,
          totalAmount: data.totalAmount || 0
        });

        setLoading(false);

      })

      .catch((error) => {

        console.error("Dashboard API Error:", error);

        setLoading(false);

      });

  }, []);


  return (

    <>

      {/* ================= HEADER ================= */}

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


      {/* ================= STATISTICS ================= */}

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


        {/* TOTAL PAYMENT AMOUNT */}

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
                : Number(
                    dashboardData.totalAmount
                  ).toLocaleString("en-IN")}

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


      {/* ================= DASHBOARD GRID ================= */}

      <section className="dashboard-grid">


        {/* ================= RECENT MEMBERS ================= */}

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
                    Join Date
                  </th>

                  <th>
                    Status
                  </th>

                </tr>

              </thead>


              <tbody>

                <tr>

                  <td>

                    <div className="member-name">

                      <span>
                        AS
                      </span>

                      Amit Sharma

                    </div>

                  </td>

                  <td>
                    6 Months
                  </td>

                  <td>
                    20 Aug 2026
                  </td>

                  <td>

                    <span className="status active-status">
                      Active
                    </span>

                  </td>

                </tr>


                <tr>

                  <td>

                    <div className="member-name">

                      <span>
                        PS
                      </span>

                      Priya Shah

                    </div>

                  </td>

                  <td>
                    12 Months
                  </td>

                  <td>
                    19 Aug 2026
                  </td>

                  <td>

                    <span className="status active-status">
                      Active
                    </span>

                  </td>

                </tr>


                <tr>

                  <td>

                    <div className="member-name">

                      <span>
                        RK
                      </span>

                      Rahul Kumar

                    </div>

                  </td>

                  <td>
                    3 Months
                  </td>

                  <td>
                    18 Aug 2026
                  </td>

                  <td>

                    <span className="status active-status">
                      Active
                    </span>

                  </td>

                </tr>


                <tr>

                  <td>

                    <div className="member-name">

                      <span>
                        SN
                      </span>

                      Sneha Patil

                    </div>

                  </td>

                  <td>
                    1 Month
                  </td>

                  <td>
                    17 Aug 2026
                  </td>

                  <td>

                    <span className="status pending-status">
                      Pending
                    </span>

                  </td>

                </tr>


              </tbody>

            </table>

          </div>

        </div>


        {/* ================= MEMBERSHIP OVERVIEW ================= */}

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
                20
              </strong>

            </div>

            <div className="progress">

              <div
                className="progress-bar"
                style={{
                  width: "25%"
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
                35
              </strong>

            </div>

            <div className="progress">

              <div
                className="progress-bar"
                style={{
                  width: "45%"
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
                45
              </strong>

            </div>

            <div className="progress">

              <div
                className="progress-bar"
                style={{
                  width: "65%"
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
                50
              </strong>

            </div>

            <div className="progress">

              <div
                className="progress-bar"
                style={{
                  width: "80%"
                }}
              />

            </div>

          </div>

        </div>

      </section>


      {/* ================= QUICK ACTIONS ================= */}

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