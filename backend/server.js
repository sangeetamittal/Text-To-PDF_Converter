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

app.post("/register", (req, res) => {
    const { email, password } = req.body;
    users.push({ email, password });
    console.log("Current Users:", users);
    res.status(201).json({ message: "User registered successfully!", users  });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log("Users in database:", users);
    const user = users.find((u) => u.email.trim() === email.trim() && u.password === password);
    if (user) {
        res.json({ message: "Login successful!" });
    } else {
        res.status(401).json({ message: "Invalid credentials!" });
    }
});

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
