import React from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./components/home";
import Register from "./components/register";
import Login from "./components/login";

import PublicPlans from "./components/PublicPlans";
import MemberDashboard from "./components/MemberDashboard";

import DashboardLayout from "./components/dashboardLayout";
import Dashboard from "./components/dashboard";
import Member from "./components/member";
import Plans from "./components/plans";
import Trainer from "./components/Trainer";
import Contact from "./components/contact";
import Payment from "./components/payment";
import Reports from "./components/reports";
import Settings from "./components/settings";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* =========================
            HOME
        ========================= */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* =========================
            PUBLIC PLANS
        ========================= */}

        <Route
          path="/plans"
          element={<PublicPlans />}
        />


        {/* =========================
            REGISTER
        ========================= */}

        <Route
          path="/register"
          element={<Register />}
        />


        {/* =========================
            LOGIN
        ========================= */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* =========================
            MEMBER DASHBOARD
        ========================= */}

        <Route
          path="/memberdashboard"
          element={<MemberDashboard />}
        />


        {/* =========================
            ADMIN DASHBOARD
        ========================= */}

        <Route
          path="/dashboard"
          element={<DashboardLayout />}
        >

          {/* Dashboard */}

          <Route
            index
            element={<Dashboard />}
          />


          {/* Members */}

          <Route
            path="members"
            element={<Member />}
          />


          {/* Membership Plans */}

          <Route
            path="plans"
            element={<Plans />}
          />


          {/* Trainers */}

          <Route
            path="trainers"
            element={<Trainer />}
          />


          {/* Payments */}

          <Route
            path="payments"
            element={<Payment />}
          />


          {/* Reports */}

          <Route
            path="reports"
            element={<Reports />}
          />


          {/* Settings */}

          <Route
            path="settings"
            element={<Settings />}
          />


          {/* Contact */}

          <Route
            path="contact"
            element={<Contact />}
          />

        </Route>


      </Routes>

    </BrowserRouter>

  );

}


export default App;