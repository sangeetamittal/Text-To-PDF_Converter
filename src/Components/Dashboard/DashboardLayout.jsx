import React from "react";
import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css"; // Ensure styles are applied

const DashboardLayout = () => {
  return (
    <div className="dashboard-content">
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
