const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors());
app.use(express.json());

// Set up storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Save files in the "uploads" directory
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Save the file with a unique name, preserving the original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Set up Multer to use the storage settings
const upload = multer({ storage: storage });

// Endpoint to upload profile picture
app.post('/api/upload-profile-picture', upload.single('profilePicture'), (req, res) => {
  try {
    // If the file was uploaded successfully, send back its path
    if (req.file) {
      res.status(200).json({
        message: 'Profile picture uploaded successfully',
        filePath: `/uploads/${req.file.filename}`
      });
    } else {
      res.status(400).json({ message: 'No file uploaded' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error during file upload', error: error.message });
  }
});

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Endpoint to save profile data
app.post('/api/save-profile', (req, res) => {
  const profileData = req.body;

  // Check if profileData is defined and has the necessary properties
  if (!profileData || !profileData.contacts) {
    return res.status(400).json({ message: 'Invalid profile data' });
  }

  // Here, you could save the profile data to a database.
  // For this example, let's simulate saving it to a JSON file.
  const filePath = path.join(__dirname, 'uploads', 'profileData.json');

  fs.writeFile(filePath, JSON.stringify(profileData, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to save profile data', error: err.message });
    }
    res.status(200).json({ message: 'Profile data saved successfully' });
  });
});

// Endpoint to get profile data
app.get('/api/get-profile', (req, res) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'uploads', 'profileData.json'));
    const profileData = JSON.parse(data);
    res.json(profileData);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving profile data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
