

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileCardModal from "./ProfileCard";
import "./styles/Header.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Function to fetch user data from localStorage
  const fetchUser = () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      setUser(null);
    }
  };

  // Fetch user data on component mount and when the location changes
  useEffect(() => {
    fetchUser();
  }, [location]); // Re-run when the location changes

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("You have successfully logged out.");
    navigate("/login");
  };

  const openProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  const getRoleBasedRoute = () => {
    if (!user) return "/"; // Default to home if no user is logged in
    switch (user.role) {
      case "donor":
        return "/donor";
      case "receiver":
        return "/receiver";
      case "volunteer":
        return "/volunteer";
      case "admin":
        return "/admin";
      default:
        return "/"; // Fallback route
    }
  };

  const getHistoryLink = () => {
    if (!user) return "/history";
    return `/${user.role}/history`;  
  };

  return (
    <header className="header">
      <div className="logo">AnnSeva</div>
      <div className="menu-icon" onClick={toggleMenu}>
        ☰
      </div>
      <nav>
        <ul className={menuOpen ? "show" : ""}>
          {user ? (
            <>
              <li>
                <Link to={getRoleBasedRoute()}>Dashboard</Link>
              </li>
              {user.role === 'donor' && (
                <>
                  <li>
                    <Link to="/donor/active-requests">Active Requests</Link>
                  </li>
                  <li>
                    <Link to="/donor/active-organizations">Active Organizations</Link>
                  </li>
                </>
              )}
              <li>
                <Link to={getHistoryLink()}>History</Link>
              </li>
              <li>
                <button className="profile-button" onClick={openProfileModal}>
                  Profile
                </button>
              </li>
              <li>
                <button className="logout-button" onClick={logout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              {location.pathname === "/" ? (
                <li>
                  <a href="#foundation">About</a>
                </li>
              ) : (
                <li>
                  <Link to="/aboutus">About</Link>
                </li>
              )}
              <li>
                <Link to="/contactus">Contact</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <ProfileCardModal isOpen={isProfileModalOpen} closeModal={closeProfileModal} />
    </header>
  );
};

export default Header;