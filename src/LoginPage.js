import React from 'react';
import './LoginPage.css'; // Import CSS for styling
import sihpic from './images/sih.png';

const LoginPage = ({ onLogin }) => {
  return (
    <div id="landingPage">
      <div className="container">
        <h1>WALL-E</h1>
        <h4>Empowering Safety, <br /> Every step of the way.</h4>
        <div className="image-container">
        <img src={sihpic} alt="sihpic" className="sih-image" />
        </div>
        <button className="login-button" onClick={onLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginPage;
