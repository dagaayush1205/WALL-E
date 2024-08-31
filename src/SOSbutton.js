import React, { useState, useEffect } from 'react';
import './SOSbutton.css'; // Import the CSS file
import homeIcon from './images/home.png';
import navigationIcon from './images/navigation.jpg';
import profileIcon from './images/profile.png';
import { Link } from 'react-router-dom'; 

// Path to the siren sound file (you can use any siren sound in .mp3 format)
import sirenSound from './siren.mp3';

// Dummy image paths (replace with actual paths)
import defaultProfilePic from './images/man.png';
import callIcon from './images/call.png';

const SOSButton = () => {
  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    // Initialize the audio object once
    const newAudio = new Audio(sirenSound);
    setAudio(newAudio);

    // Clean up the audio object on component unmount
    return () => {
      newAudio.pause();
      newAudio.currentTime = 0;
    };
  }, []);

  const handleClick = async () => {
    if (!audio) return;

    setPlaying(!playing);
    if (!playing) {
      audio.play();
      alert('SOS! Help is on the way!');
      try {
        // Start Bluetooth scanning
        const device = await navigator.bluetooth.requestDevice({
          acceptAllDevices: true,
          optionalServices: ['battery_service'],
        });

        console.log('Connected to device:', device.name);
        // Optionally, interact with the device or just alert the user
        alertNearbyDevices();
      } catch (error) {
        console.error('Error connecting to Bluetooth device:', error);
      }
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const sendPushNotification = async () => {
    // Replace with your backend API endpoint
    try {
      const response = await fetch('https://your-server.com/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'SOS Alert! Help is needed nearby!',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send notification');
      }
      console.log('Push notification sent successfully');
    } catch (error) {
      console.error(error);
    }
  };

  const alertNearbyDevices = () => {
    // This is a mock function to represent sending an alert to nearby devices
    // In a real-world scenario, this could involve writing data to a Bluetooth GATT service
    alert('Alert sent to nearby devices via Bluetooth!');
  };

  const handleCall = (number) => {
    // Logic to handle phone call
    alert(`Calling ${number}`);
  };

  return (
    <div className="container">
      <button className="button" onClick={handleClick}>
        {playing ? 'STOP' : 'SOS'}
      </button>
      <div className="contacts">
        <h3 className="priorities-heading">Your Priorities</h3>
        <div className="contact-bubble">
          <img src={defaultProfilePic} alt="Profile" className="contact-image" />
          <div className="contact-info">
            <div className="contact-name">Contact-3</div>
            <div className="contact-number">123-456-7890</div>
          </div>
          <img
            src={callIcon}
            alt="Call"
            className="call-icon"
            onClick={() => handleCall('123-456-7890')}
          />
        </div>
        <div className="contact-bubble">
          <img src={defaultProfilePic} alt="Profile" className="contact-image" />
          <div className="contact-info">
            <div className="contact-name">Contact-2</div>
            <div className="contact-number">987-654-3210</div>
          </div>
          <img
            src={callIcon}
            alt="Call"
            className="call-icon"
            onClick={() => handleCall('987-654-3210')}
          />
        </div>
        <div className="contact-bubble">
          <img src={defaultProfilePic} alt="Profile" className="contact-image" />
          <div className="contact-info">
            <div className="contact-name">Emergency Services</div>
            <div className="contact-number">911</div>
          </div>
          <img
            src={callIcon}
            alt="Call"
            className="call-icon"
            onClick={() => handleCall('911')}
          />
        </div>
      </div>
      <div className="navbar">
        <div className="nav-item">
          <img src={homeIcon} alt="homeIcon" className="contact-image" />
          <span className="nav-text">Home</span>
        </div>
        <div className="nav-item">
          <img src={navigationIcon} alt="navigationIcon" className="contact-image" />
          <span className="nav-text">Navigation</span>
        </div>
        <div className="nav-item">
          <Link to="/profile" className="nav-link">
            <img src={profileIcon} alt="profileIcon" className="contact-image" />
            <span className="nav-text">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SOSButton;
