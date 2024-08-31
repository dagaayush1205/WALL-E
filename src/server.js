const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;


// Define your routes and other middleware here

// Example route
app.get('/your-endpoint', (req, res) => {
    res.send('Hello World');
  });
  
  app.listen(5000, () => {
    console.log('Server running at http://localhost:5000');
  });


app.use(bodyParser.json());
app.use(cors());

let otpStore = {}; // Simple in-memory store for demonstration

app.post('/send-otp', (req, res) => {
  const { phoneNumber } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
  otpStore[phoneNumber] = otp; // Store OTP
  console.log(`OTP for ${phoneNumber}: ${otp}`); // Log OTP (for demo purposes only)
  res.status(200).send('OTP sent');
});

app.post('/verify-otp', (req, res) => {
  const { phoneNumber, otp } = req.body;
  if (otpStore[phoneNumber] === otp) {
    delete otpStore[phoneNumber]; // Clear OTP after successful verification
    res.status(200).send('OTP verified');
  } else {
    res.status(400).send('Invalid OTP');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
