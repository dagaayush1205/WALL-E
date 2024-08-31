import React, { useState } from 'react';
import axios from 'axios';
import './MobileNumber.css'; // Import the CSS file

const MobileNumber = ({ onLogin }) => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);

    const handleMobileNumberChange = (e) => {
        setMobileNumber(e.target.value);
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const sendOtp = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/send-otp', { mobileNumber });
            if (response.data.success) {
                setIsOtpSent(true);
                alert('OTP sent successfully');
            } else {
                alert('Failed to send OTP');
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            alert('Error sending OTP');
        }
    };

    const verifyOtp = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/verify-otp', { mobileNumber, otp });
            if (response.data.success) {
                onLogin(mobileNumber);
            } else {
                alert('Invalid OTP');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            alert('Error verifying OTP');
        }
    };

    return (
        <div className="mobile-number-container">
            <h2>Login</h2>
            {!isOtpSent ? (
                <>
                    <label>Enter Mobile Number:</label>
                    <input
                        type="text"
                        value={mobileNumber}
                        onChange={handleMobileNumberChange}
                        placeholder="Mobile Number"
                    />
                    <button onClick={sendOtp}>Send OTP</button>
                </>
            ) : (
                <>
                    <label>Enter OTP:</label>
                    <input
                        type="text"
                        value={otp}
                        onChange={handleOtpChange}
                        placeholder="OTP"
                    />
                    <button onClick={verifyOtp}>Verify OTP</button>
                </>
            )}
        </div>
    );
};

export default MobileNumber;
