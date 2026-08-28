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
            ADMIN DASHBOARD
        ========================= */}

        <Route
          path="/dashboard"
          element={<DashboardLayout />}
        >

          <Route
            index
            element={<Dashboard />}
          />

          <Route
            path="members"
            element={<Member />}
          />

          <Route
            path="plans"
            element={<Plans />}
          />

          <Route
            path="trainers"
            element={<Trainer />}
          />

          <Route
            path="payments"
            element={<Payment />}
          />

          <Route
            path="reports"
            element={<Reports />}
          />

          <Route
            path="settings"
            element={<Settings />}
          />

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