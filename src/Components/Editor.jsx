import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import axios from "axios";

const QuillEditor = () => {
  const editorRef = useRef(null);
  const quillInstance = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editorRef.current) {
      console.log("Initializing Quill Editor..."); // ✅ Debug: Check if Quill initializes

      quillInstance.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],
            ["blockquote", "code-block"],
            ["link", "image", "video"],
            ["clean"],
          ],
        },
      });

      console.log("Quill Editor initialized successfully!"); // ✅ Debug: Confirm Quill is ready
    }
  }, []);

  const handleGeneratePDF = async () => {
    if (!quillInstance.current) {
      console.error("Quill instance is not initialized!"); // ❌ Debug: Quill not found
      return;
    }

    const content = quillInstance.current.root.innerHTML;
    console.log("Captured HTML Content:", content); // ✅ Debug: Check if Quill content is correctly captured

    if (!content.trim()) {
      alert("Please enter some text before generating the PDF!");
      console.warn("No content entered in Quill editor!"); // ❌ Debug: Empty content issue
      return;
    }

    setLoading(true);
    try {
      console.log("Sending request to backend..."); // ✅ Debug: Check if request is made

      const response = await axios.post("http://localhost:5000/generate-pdf", { html: content }, {
        responseType: "blob", // Expect binary response
      });

      console.log("Received PDF response from backend:", response); // ✅ Debug: Confirm backend response

      // Create a blob URL and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "document.pdf");

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log("PDF downloaded successfully!"); // ✅ Debug: Confirm file download
    } catch (error) {
      console.error("PDF generation failed:", error); // ❌ Debug: Check backend errors
      alert("Failed to generate PDF. Please try again.");
    }
    setLoading(false);
  };

  const handleViewPDF = async () => {
    try {
      console.log("Fetching generated PDF from backend..."); // ✅ Debugging step

      const response = await fetch("http://localhost:5000/get-pdf", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch the PDF");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      window.open(url, "_blank"); // Opens PDF in a new tab
      console.log("PDF opened successfully!"); // ✅ Debugging step
    } catch (error) {
      console.error("Error fetching PDF:", error);
      alert("Failed to fetch the PDF. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <div ref={editorRef} style={{ height: "300px", marginBottom: "20px" }} />

      <button onClick={handleGeneratePDF} disabled={loading} style={{ padding: "10px", cursor: "pointer", marginRight: "10px" }}>
        {loading ? "Generating PDF..." : "Download PDF"}
      </button>

      <button onClick={handleViewPDF} style={{ padding: "10px", cursor: "pointer" }}>
        View PDF
      </button>

    </div>
  );
};

export default QuillEditor;
