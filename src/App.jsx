// import { useState } from "react";
import "./App.css";
// import CoverDesign from "./Components/Dashboard/CoverDesign/CoverDesign";


// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import Auth from "./Components/Auth";
// import Navbar from "./Components/Navbar";
import QuillEditor from "./Components/Editor";
// import Dashboard from "./Components/Dashboard/Dashboard";
// import BookInformation from "./Components/Dashboard/BookInformation/BookInformation";
// import DesignGenre from "./Components/Dashboard/Design_and_Genre/Design_and_Genre";
// import BookInterior from "./Components/Dashboard/BookInterior/BookInterior";
// import CoverDesign from "./Components/Dashboard/CoverDesign/CoverDesign";
// import BookDistribution from "./Components/Dashboard/BookDistribution/BookDistribution";

function App() {
  // this will ensure whethere the login is successfull or not
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <QuillEditor/>
    // <Router>
    //   <Routes>
    //     {/* If not logged in, show Auth and prevent access to other routes */}
    //     {!isLoggedIn ? (
    //       <Route
    //         path="/*"
    //         element={<Auth onLogin={() => setIsLoggedIn(true)} />}
    //       />
    //     ) : (
    //       <>
    //         <Route path="/" element={<Navigate to="/dashboard" />} />
    //         <Route path="/dashboard" element={<Dashboard />}>
    //           <Route path="book-information" element={<BookInformation />} />
    //           <Route path="design-genre" element={<DesignGenre />} />
    //           <Route path="book-interior" element={<BookInterior />} />
    //           <Route path="cover-design" element={<CoverDesign />} />
    //           <Route path="book-distribution" element={<BookDistribution />} />
    //         </Route>
    //       </>
    //     )}
    //   </Routes>
    // </Router>
  );
}

export default App;
