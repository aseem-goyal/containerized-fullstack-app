const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  const html = `
    <!doctype html>
    <html>
      <head>
        <title>Express Frontend - Flask Assignment</title>
      </head>
      <body>
        <h1>Express Frontend</h1>
        <p>Form sending data to Flask backend (/process)</p>
        <form method="POST" action="/submit">
          <label for="name">Enter your name:</label>
          <input type="text" id="name" name="name" required />
          <button type="submit">Submit</button>
        </form>
      </body>
    </html>
    `;
  res.send(html);
});

app.post("/submit", async (req, res) => {
  const { name } = req.body;

  try {
    const response = await axios.post(`${BACKEND_URL}/process`, {
    name: name
});

    const message = response.data.message;

    const resultHtml = `
      <!doctype html>
      <html>
        <head>
          <title>Result from Flask</title>
        </head>
        <body>
          <h1>Response from Flask Backend</h1>
          <p>${message}</p>
          <a href="/">Go back</a>
        </body>
      </html>
    `;
    res.send(resultHtml);
  } catch (err) {
    console.error("Error calling Flask backend:", err.message);

    res.status(500).send(`
      <!doctype html>
      <html>
        <head>
          <title>Error</title>
        </head>
        <body>
          <h1>Error contacting Flask backend</h1>
          <p>${err.message}</p>
          <a href="/">Go back</a>
        </body>
      </html>
    `);
  }
});

app.get("/health", (req, res) => {
    res.json({
        status: "healthy",
        service: "express-frontend"
    });
});

app.listen(PORT, () => {
  console.log(`Express frontend running on http://localhost:${PORT}`);
});
