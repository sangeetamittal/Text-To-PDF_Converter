const express = require('express');
const cors = require('cors');
const fs = require("fs");
const path = require("path");
const bodyParser = require('body-parser');
const { generatePDF } = require('./convertToPDF');
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static files from backend/dist
app.use(express.static(path.join(__dirname, "dist")));

// example API route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

// catch-all to serve index.html for SPA routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

let users = []; // Temporary storage

app.post("/generate-pdf", generatePDF);

const pdfFilePath = path.join(__dirname, "document.pdf"); // Adjust path as needed

// Serve the latest generated PDF
app.get("/get-pdf", (req, res) => {
  if (!fs.existsSync(pdfFilePath)) {
    return res.status(404).send("PDF not found. Please generate a PDF first.");
  }

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "inline; filename=document.pdf");

  const fileStream = fs.createReadStream(pdfFilePath);
  fileStream.pipe(res);
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
