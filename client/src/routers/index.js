import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AdminLayout } from "../layouts/AdminLayout";
import ClientLayout from "../layouts/ClientLayout";
import AdminAccount from "../pages/Admin/AdminAccount";
import Dashboard from "../pages/Admin/Dashboard";
import AdminLogin from "../pages/Admin/Login";
import UserAccount from "../pages/Admin/UserAccount";
import HomePage from "../pages/Client/HomePage";
import Login from "../pages/Client/Login";
import Register from "../pages/Client/Register";

export default function MainRouter() {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ClientLayout>
              <HomePage />
            </ClientLayout>
          }
        />
      </Routes>

      <Routes>
        <Route
          exact
          path="/login"
          element={
            <ClientLayout>
              <Login />
            </ClientLayout>
          }
        />
      </Routes>

      <Routes>
        <Route
          exact
          path="/sign-up"
          element={
            <ClientLayout>
              <Register />
            </ClientLayout>
          }
        />
      </Routes>

      <Routes>
        <Route exact path="/admin/login" element={<AdminLogin />} />
      </Routes>

      <Routes>
        <Route
          exact
          path="/admin"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />
      </Routes>

      <Routes>
        <Route
          exact
          path="/admin/admin-account"
          element={
            <AdminLayout>
              <AdminAccount />
            </AdminLayout>
          }
        />
      </Routes>

      <Routes>
        <Route
          exact
          path="/admin/user-account"
          element={
            <AdminLayout>
              <UserAccount />
            </AdminLayout>
          }
        />
      </Routes>
    </Router>
  );
}
