// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserRegistration from './Components/UserRegistration';
import Login from './Components/Login';
import Home from './Components/Home';
import Donor from './Components/Donor';
import Header from './Components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Receiver } from './Components/Receiver';
import Volunteer from './Components/Volunteer';
import { DonorHistory } from './Components/DonarHistory';
import { ReceiverHistory } from './Components/ReceiverHistory';
import { VolunteerHistory } from './Components/VolunteerHistory';
import AdminDashboard from './Components/AdminDashboard';
import Contact from './Components/Contact';
import NotFound from './Components/NotFound';
import Aboutus from './Components/Aboutus';
import Unauthorized from './Components/Unauthorised';
import ProtectedRoutes from './Components/ProtectedRoutes'; // Import the ProtectedRoutes component
import VolunteerTracking from './Components/VolunteerTracking';
import ActiveRequestsPage from './Components/ActiveRequestsPage';
import ActiveOrganizationsPage from './Components/ActiveOrganizationsPage';
import AdminHistory from './Components/AdminHistory';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<UserRegistration />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected Routes */}
          <Route
            path="/receiver"
            element={
              <ProtectedRoutes roles={['receiver', 'volunteer', 'donor']}>
                <Receiver />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/donor"
            element={
              <ProtectedRoutes roles={['donor', 'receiver', 'volunteer']}>
                <Donor />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/volunteer"
            element={
              <ProtectedRoutes roles={['volunteer']}>
                <Volunteer />
              </ProtectedRoutes>
            }
          />

          
          <Route
            path="/donor/history"
            element={
              <ProtectedRoutes roles={['donor']}>
                <DonorHistory />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/receiver/history"
            element={
              <ProtectedRoutes roles={['receiver']}>
                <ReceiverHistory />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/volunteer/history"
            element={
              <ProtectedRoutes roles={['volunteer']}>
                <VolunteerHistory />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/donor/volunteerTracking"
            element={
              <ProtectedRoutes roles={['donor']}>
                 <VolunteerTracking />
              </ProtectedRoutes>
            }
          />
           <Route
            path="/receiver/volunteerTracking"
            element={
              <ProtectedRoutes roles={['receiver']}>
                <VolunteerTracking />
              </ProtectedRoutes>
            }
          />
           <Route
            path="/volunteer/volunteerTracking"
            element={
              <ProtectedRoutes roles={['volunteer']}>
                <VolunteerTracking />
              </ProtectedRoutes>
            }
          />

            <Route
            path="/donor/active-requests"
            element={
              <ProtectedRoutes roles={['donor']}>
                <ActiveRequestsPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/donor/active-organizations"
            element={
              <ProtectedRoutes roles={['donor']}>
                <ActiveOrganizationsPage />
              </ProtectedRoutes>
            }
          />

        
          <Route
            path="/admin"
            element={
              <ProtectedRoutes roles={['admin']}>
                <AdminDashboard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin/history"
            element={
              <ProtectedRoutes roles={['admin']}>
                <AdminHistory />
              </ProtectedRoutes>
            }
          />



          {/* About Page */}
          <Route path="/aboutus" element={<Aboutus />} />

          {/* Contact Page (if needed) */}
          <Route path="/contactus" element={<Contact />} />

          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;