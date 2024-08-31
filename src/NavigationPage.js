import React, { useState, useRef } from 'react';
import axios from 'axios';
import './NavigationPage.css'; // Import your CSS file
import mapImage from './images/map.png';
import homeIcon from './images/home.png';
import navigationIcon from './images/navigation.jpg';
import profileIcon from './images/profile.png';
import { Link } from 'react-router-dom'; 

const NavigationPage = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [locations, setLocations] = useState([
    { id: '1', name: 'Location 1', x: 50, y: 100 },
    { id: '2', name: 'Location 2', x: 200, y: 150 },
    { id: '3', name: 'Location 3', x: 350, y: 200 }
  ]);
  const [currentLocation, setCurrentLocation] = useState(null);

  const handleLocationChange = (e) => {
    const selectedId = e.target.value;
    const location = locations.find(loc => loc.id === selectedId);
    setSelectedLocation(selectedId);
    setCurrentLocation(location);
  };

  const handleSetLocation = async () => {
    try {
      if (selectedLocation) {
        const response = await axios.post('http://localhost:5000/api/set-location', {
          locationId: selectedLocation
        });
        alert('Location set successfully');
      } else {
        alert('Please select a location');
      }
    } catch (error) {
      console.error('Error setting location:', error);
      alert('Failed to set location.');
    }
  };

  return (
    <div className="navigation-page">
      <div className="map-container">
        <img
          src={mapImage} // Replace with your map image path
          alt="Map"
          className="map-image"
        />
        {currentLocation && (
          <div
            className="map-tracker"
            style={{
              top: `${currentLocation.y}px`,
              left: `${currentLocation.x}px`
            }}
          >
            <div className="tracker-dot"></div>
          </div>
        )}
      </div>
      <div className="controls">
        <select onChange={handleLocationChange} value={selectedLocation}>
          <option value="">Select a Location</option>
          {locations.map(loc => (
            <option key={loc.id} value={loc.id}>
              {loc.name}
            </option>
          ))}
        </select>
        <button onClick={handleSetLocation}>Set Location</button>
      </div>
      <div className="navbar">
        <div className="nav-item">
        <Link to="/" className="nav-link">
          <img src={homeIcon} alt="homeIcon" className="contact-image" />
          <span className="nav-text">Home</span>
          </Link>
        </div>
        <div className="nav-item">
        <Link to="/navigation" className="nav-link">
          <img src={navigationIcon} alt="navigationIcon" className="contact-image" />
          <span className="nav-text">Navigation</span>
          </Link>
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

export default NavigationPage;
