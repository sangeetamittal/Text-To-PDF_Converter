import { useState } from "react";
import "./App.css";
import Auth from "./Components/Auth";
import Writing from "./Components/Writing";

function App() {
  // this will ensure whethere the login is successfull or not
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      {/*  1. please ek alag se navbar ke liye js file bana loh under components, and import it here */}

      <Auth />

      {/* succesfull login par hm writing wale section pr redirect hoge */}
      {!isLoggedIn && <Writing />}
    </>
  );
}

export default App;
