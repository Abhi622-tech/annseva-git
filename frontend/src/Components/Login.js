import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/Login.css";
import api from "../api/axios"
const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donor");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!phone || !password) {
      setErrorMessage("Please enter both phone number and password.");
      return;
    }

    try {
      const loginResponse = await api.post("/auth/login", { phone, password, role });
      if (loginResponse.status === 200) {
        const redirectionUrl = loginResponse.data.redirectUrl;
        localStorage.setItem("token", loginResponse.data.token);
        localStorage.setItem("user", JSON.stringify(loginResponse.data.user));
        toast.success("Login successful");
        navigate(redirectionUrl);
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to login. Please check your credentials.";
      setErrorMessage(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <div className="login-form animated-form">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="input-field"
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="input-field"
          style={{ padding: "10px", borderRadius: "5px", marginBottom: "15px", border: "1px solid #ddd" }}
        >
          <option value="donor">Donor</option>
          <option value="receiver">Receiver</option>
          <option value="volunteer">Volunteer</option>
          <option value="admin">Admin</option>
        </select>

        <button onClick={handleLogin} className="submit-button">
          Login
        </button>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Login;
