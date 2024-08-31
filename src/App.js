import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SOSButton from './SOSbutton';
import OTPVerification from './OTPverification';
import LoginPage from './LoginPage';
import ProfilePage from './ProfilePage';
import NavigationPage from './NavigationPage'; // Import NavigationPage
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Redirect to login page if not logged in */}
          {!isLoggedIn ? (
            <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
          ) : (
            <>
              <Route path="/" element={<SOSButton />} />
              <Route path="/otp-verification" element={<OTPVerification />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/navigation" element={<NavigationPage />} /> {/* Add NavigationPage route */}
              {/* Redirect to home if the route is not found */}
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
