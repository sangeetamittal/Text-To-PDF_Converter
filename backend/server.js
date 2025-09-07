const express = require('express');
const cors = require('cors');
const fs = require("fs");
const path = require("path");
const bodyParser = require('body-parser');
const { generatePDF } = require('./convertToPDF');
const PORT = 5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

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

app.listen(5000, () => console.log(`Server running on http://localhost:${PORT}`));
