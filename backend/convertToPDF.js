const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

exports.generatePDF = async (req, res) => {
    const { html } = req.body;
    const pdfFilePath = path.join(__dirname, "document.pdf"); // Store in backend
    const templatePath = path.join(__dirname, "template1.html"); // Path to the template file

    console.log("📩 Received request to generate PDF");

    if (!html) {
        console.error("❌ Error: No HTML content received!");
        return res.status(400).json({ error: "No content provided" });
    }

    try {
        console.log("📄 Reading template file...");
        let template = fs.readFileSync(templatePath, "utf8"); // Read template

        console.log("🔄 Applying content to template...");
        let formattedHtml = template.replace("{{content}}", html); // Inject Quill content

        console.log('Chromium executable path:', puppeteer.executablePath());
        console.log("🚀 Launching Puppeteer...");
        const browser = await puppeteer.launch({ 
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox'], 
            // userDataDir: '/tmp/puppeteer_cache',
            // executablePath: puppeteer.executablePath(), 
        });
        const page = await browser.newPage();
        
        console.log("📝 Setting page content...");
        await page.setContent(formattedHtml, { waitUntil: "networkidle2" });

        console.log("📄 Generating PDF...");
        await page.pdf({
            path: pdfFilePath,
            format: "A4",
            printBackground: true,
            preferCSSPageSize: true,
            margin: {top: "20mm", right: "20mm", bottom: "20mm", left: "20mm"},
        });

        console.log("✅ PDF saved at:", pdfFilePath);

        await browser.close();
        console.log("🛑 Puppeteer closed.");

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=document.pdf",
        });

        console.log("📤 Sending PDF to client...");
        res.download(pdfFilePath);
    } catch (error) {
        console.error("❌ Error generating PDF:", error);
        res.status(500).json({ error: "Failed to generate PDF" });
    }
};

