const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.json());

// Set up the database
let db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE users (username TEXT, password TEXT)");
});

// Handle authentication
app.post('/auth', (req, res) => {
    const { username, password, action } = req.body;

    if (action === 'signup') {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) return res.json({ success: false, message: 'Error hashing password.' });
            db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hash], (err) => {
                if (err) return res.json({ success: false, message: 'User already exists.' });
                res.json({ success: true });
            });
        });
    } else if (action === 'login') {
        db.get("SELECT password FROM users WHERE username = ?", [username], (err, row) => {
            if (row) {
                bcrypt.compare(password, row.password, (err, result) => {
                    if (result) {
                        res.json({ success: true });
                    } else {
                        res.json({ success: false, message: 'Invalid credentials.' });
                    }
                });
            } else {
                res.json({ success: false, message: 'User not found.' });
            }
        });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
