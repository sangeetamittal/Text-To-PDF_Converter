import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const Auth = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const register = () => {
    console.log("Registering with:", registerEmail, registerPassword);
  };

  const login = () => {
    console.log("Logging in with:", loginEmail, loginPassword);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row shadow-lg p-4 rounded bg-white w-75">
        {/* Register Section */}
        <div className="col-md-6 border-end text-center">
          <h2 className="mb-3">Register</h2>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter email id"
            onChange={(e) => setRegisterEmail(e.target.value)}
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Enter Password"
            onChange={(e) => setRegisterPassword(e.target.value)}
          />
          <button className="btn btn-primary w-100" onClick={register}>
            Register
          </button>
        </div>

        {/* Login Section */}
        <div className="col-md-6 text-center">
          <h2 className="mb-3">Login</h2>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter email id"
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Enter Password"
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button className="btn btn-success w-100" onClick={login}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
