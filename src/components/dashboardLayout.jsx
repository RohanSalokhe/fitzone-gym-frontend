import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./dashboard.css";

export default function DashboardLayout() {

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="dashboard">

      {/* ================= SIDEBAR ================= */}

      <aside className="sidebar">

        {/* LOGO */}
        <div className="dashboard-logo">

          <div className="dashboard-logo-icon">
            🏋️
          </div>

          <div>
            <h2>
              FIT<span>ZONE</span>
            </h2>

            <small>
              GYM MANAGEMENT
            </small>
          </div>

        </div>


        {/* SIDEBAR MENU */}

        <nav className="sidebar-menu">

          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
          >
            <span>📊</span>
            Dashboard
          </NavLink>


          <NavLink
            to="/dashboard/members"
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
          >
            <span>👥</span>
            Members
          </NavLink>


          <NavLink
            to="/dashboard/plans"
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
          >
            <span>📋</span>
            Membership Plans
          </NavLink>


          <NavLink
            to="/dashboard/trainers"
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
          >
            <span>👨‍🏫</span>
            Trainers
          </NavLink>


          <NavLink
            to="/dashboard/payments"
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
          >
            <span>💳</span>
            Payments
          </NavLink>


          <NavLink
            to="/dashboard/contact"
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
          >
            <span>📞</span>
            Contacts
          </NavLink>


          <NavLink
            to="/dashboard/reports"
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
          >
            <span>📈</span>
            Reports
          </NavLink>


          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
          >
            <span>⚙️</span>
            Settings
          </NavLink>

        </nav>


        {/* LOGOUT */}

        <div className="sidebar-bottom">

          <button
            className="menu-item logout"
            onClick={handleLogout}
          >
            <span>🚪</span>
            Logout
          </button>

        </div>

      </aside>


      {/* ================= RIGHT SIDE ================= */}

      <main className="dashboard-main">

        <Outlet />

      </main>

    </div>
  );
}