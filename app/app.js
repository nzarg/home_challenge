const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Route for the form page
app.get('/', (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>Create DNS Zone</h1>
        <form action="/create-zone" method="POST">
          <label for="zoneName">Zone Name:</label>
          <input type="text" id="zoneName" name="zoneName" required><br><br>
          <button type="submit">Create Zone</button>
        </form>
      </body>
    </html>
  `);
});

// Route to handle form submission
app.post('/create-zone', (req, res) => {
  const { zoneName } = req.body;

  // Logic to create DNS zone using the SiteHost API
  // Add your code here to make the API call

  // Respond with a success message
  res.send(`<h2>DNS Zone Created:</h2><p>Zone Name: ${zoneName}</p>`);
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
