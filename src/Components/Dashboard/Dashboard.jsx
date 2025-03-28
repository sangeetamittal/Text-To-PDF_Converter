import React from "react";
import { NavLink } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css"; // Ensure the styles are applied

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="text-center">Create a New Book</h1>

      {/* Navigation Bar */}
      <div className="nav-pills">
        <NavLink to="/dashboard/book-information" className="nav-link">
          <span className="text-success me-1">✔</span> Book Information
        </NavLink>
        <NavLink to="/dashboard/design-genre" className="nav-link">
          <span className="text-success me-1">✔</span> Design & Genre
        </NavLink>
        <NavLink to="/dashboard/book-interior" className="nav-link">
          <span className="text-success me-1">✔</span> Book Interior
        </NavLink>
        <NavLink to="/dashboard/cover-design" className="nav-link">
          <span className="text-success me-1">✔</span> Cover Design
        </NavLink>
        <NavLink to="/dashboard/book-distribution" className="nav-link">
          <span className="text-success me-1">✔</span> Book Distribution
        </NavLink>
      </div>

      {/* Fixed-size Dashboard Content */}
      <DashboardLayout />
    </div>
  );
};

export default Dashboard;
