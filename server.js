const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 8000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'in.html'));
});

// Handle login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Simple check (replace with real authentication)
  if (username === "admin" && password === "1234") {
    res.send(`
      <html><body style="text-align:center; font-family:Arial;">
        <h2>Login Successful!</h2>
        <p>Welcome, ${username}!</p>
        <a href="/">Back to Homepage</a>
      </body></html>
    `);
  } else {
    res.send(`
      <html><body style="text-align:center; font-family:Arial;">
        <h2>Invalid Username or Password</h2>
        <a href="/">Try Again</a>
      </body></html>
    `);
  }
});

// Handle salary form
app.post('/process_post', (req, res) => {
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  const sal = parseFloat(req.body.sal) || 0;
  const hra = parseFloat(req.body.hra) || 0;
  const ta = parseFloat(req.body.ta) || 0;
  const da = parseFloat(req.body.da) || 0;
  const designation = req.body.designation;

  const allowanceSum = hra + ta + da;
  const grossSalary = sal + allowanceSum;

  res.send(`
    <html>
    <head>
      <style>
        body { display:flex; justify-content:center; align-items:center; height:100vh; font-family:Arial; background:#eef2f3; }
        .container { text-align:center; border:2px solid #333; padding:20px; border-radius:8px; background:#f9f9f9; }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Form Submitted Successfully!</h2>
        <p><b>Name:</b> Mr ${firstName} ${lastName}</p>
        <p><b>Designation:</b> ${designation}</p>
        <p><b>Basic Salary:</b> ${sal}</p>
        <p><b>Allowance Sum (HRA + TA + DA):</b> ${allowanceSum}</p>
        <p><b>Gross Salary (Basic + Allowances):</b> ${grossSalary}</p>
        <a href="/">Back to Homepage</a>
      </div>
    </body>
    </html>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`);
});
