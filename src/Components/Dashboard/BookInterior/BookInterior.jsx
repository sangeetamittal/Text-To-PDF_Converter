import React from "react";
import Sidebar from "./Sidebar";
import Writing from "./Writing";
import "./BookInterior.css";

const BookInterior = () => {
  return (
    <div className="book-interior">
      <Sidebar />
      <Writing />
    </div>
  );
};

export default BookInterior;
