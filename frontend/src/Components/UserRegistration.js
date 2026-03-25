
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./styles/Register.css";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    email: "",
    role: "donor",
    location: { landmark: "", lat: "", long: "" },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            location: {
              ...prev.location,
              lat: position.coords.latitude,
              long: position.coords.longitude,
            },
          }));
        },
        () => setErrorMessage("Failed to fetch location.")
      );
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "landmark") {
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, landmark: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRegister = async () => {
    // Client-side validation
    if (!formData.name.trim()) {
      setErrorMessage("Name is required.");
      return;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      setErrorMessage("Enter a valid 10-digit phone number.");
      return;
    }
    if (!formData.password.trim()) {
      setErrorMessage("Password is required.");
      return;
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage("Enter a valid email address.");
      return;
    }
    if (!formData.location.landmark.trim()) {
      setErrorMessage("Landmark is required.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post('/auth/register', formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setErrorMessage("");
      toast.success("Registration successful!");
      const redirectUrl = response.data.redirectUrl;
      navigate(redirectUrl);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || err.response?.data?.msg || "Failed to register.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registration-container">
      {isLoading ? (
        <div className="registration-form animated-form">
          <div className="spinner"></div>
          <h2>⏳ Just a Moment!</h2>
          <p>Registering your account, please wait...</p>
        </div>
      ) : (
        <div className="registration-form animated-form">
          <h1>Registration</h1>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="landmark"
            placeholder="Landmark"
            value={formData.location.landmark}
            onChange={handleChange}
            className="input-field"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="input-field"
          >
            <option value="donor">Donor</option>
            <option value="receiver">Receiver</option>
            <option value="volunteer">Volunteer</option>
            <option value="admin">Admin</option>
          </select>

          <button onClick={handleRegister} className="submit-button">
            Register
          </button>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default Registration;
