import React, { useState } from 'react';
import './OTPverification.css'; // Import the CSS file for styling

const OTPVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']); // Array for OTP digits
  const [stage, setStage] = useState('input'); // 'input' or 'verify'
  const [error, setError] = useState('');

  const handleSendOtp = async () => {
    // Validate phone number format
    if (!/^\d{10}$/.test(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    // Send OTP request to the backend
    try {
      const response = await fetch('https://your-server.com/send-otp', { // Replace with your backend endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });

      if (response.ok) {
        setStage('verify');
        setError('');
      } else {
        throw new Error('Failed to send OTP.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleVerifyOtp = async () => {
    // Combine OTP digits into a single string
    const otpCode = otp.join('');
    
    // Verify OTP
    try {
      const response = await fetch('https://your-server.com/verify-otp', { // Replace with your backend endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, otp: otpCode }),
      });

      if (response.ok) {
        alert('OTP verified successfully!');
        setStage('input');
        setPhoneNumber('');
        setOtp(['', '', '', '']);
      } else {
        throw new Error('Invalid OTP.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) { // Allow only digits
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next box if the current one is filled
      if (index < 3 && value) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  return (
    <div className="otp-container">
      <h1>Verify your phone number</h1>
      {error && <p className="error-message">{error}</p>}
      {stage === 'input' ? (
        <div className="otp-input-form">
          <input
            type="text"
            placeholder="Enter your mobile number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            maxLength="10"
          />
          <button onClick={handleSendOtp}>Send OTP</button>
        </div>
      ) : (
        <div className="otp-input-form">
          <div className="otp-boxes">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                id={`otp-input-${index}`}
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                maxLength="1"
              />
            ))}
          </div>
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </div>
      )}
    </div>
  );
};

export default OTPVerification;
