document.querySelector('.login-button').addEventListener('click', function() {
    window.location.href = 'login.html'; // Redirect to the login/signup page
});

document.getElementById('loginButton').addEventListener('click', function() {
    // Handle login
    authenticateUser('login');
});

document.getElementById('signupButton').addEventListener('click', function() {
    // Handle sign up
    authenticateUser('signup');
});

function authenticateUser(action) {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        fetch('/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, action })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(`${action === 'login' ? 'Logged in' : 'Signed up'} successfully!`);
                // Redirect to another page or update UI
            } else {
                alert('Authentication failed: ' + data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert('Please enter both username and password.');
    }
}
