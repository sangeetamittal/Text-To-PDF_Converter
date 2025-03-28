import React, { useEffect, useRef, useState } from "react";
// import fabric from "fabric";
import * as fabric from "fabric"; // ✅ Correct way to import Fabric.js in Vite
// import { Button, Input, Card } from "@shadcn/ui";

const BookCoverEditor = () => {
  const canvasRef = useRef(null);
  const [title, setTitle] = useState("Book Title");
  const [author, setAuthor] = useState("Author Name");
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    // const newCanvas = new fabric.Canvas(canvasRef.current, {
    //   width: 400,
    //   height: 600,
    //   backgroundColor: "#f5f5f5",
    // });
    // setCanvas(newCanvas);
    if (!canvasRef.current) return;
    const newCanvas = new fabric.Canvas(canvasRef.current, {
      width: 400,
      height: 600,
      backgroundColor: "#f5f5f5",
    });
    setCanvas(newCanvas);

    // Load book cover template
    fabric.Image.fromURL("https://m.media-amazon.com/images/I/81EijqnrobL.jpg", (img) => {
      img.scaleToWidth(400);
      img.scaleToHeight(600);
      newCanvas.setBackgroundImage(img, newCanvas.renderAll.bind(newCanvas));
    });

    // Add title text
    const titleText = new fabric.Text(title, {
      left: 80,
      top: 150,
      fontSize: 30,
      fill: "black",
      fontFamily: "Arial",
    });
    newCanvas.add(titleText);

    // Add author text
    const authorText = new fabric.Text(author, {
      left: 100,
      top: 400,
      fontSize: 20,
      fill: "black",
      fontFamily: "Arial",
    });
    newCanvas.add(authorText);

    return () => newCanvas.dispose();
  }, []);

  // Update text when input changes
  const updateText = (type, value) => {
    setCanvas((prevCanvas) => {
      if (!prevCanvas) return prevCanvas;

      prevCanvas.getObjects().forEach((obj) => {
        if (obj.text && obj.text.includes(type === "title" ? title : author)) {
          obj.set({ text: value });
        }
      });
      prevCanvas.renderAll();
      return prevCanvas;
    });

    if (type === "title") setTitle(value);
    else setAuthor(value);
  };

  // Download as PNG
  const downloadCover = () => {
    const dataURL = canvas.toDataURL({ format: "png" });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "book_cover.png";
    link.click();
  };

  return (
    <div className="max-w-md mx-auto p-4 text-center">
      <h2 className="text-xl font-bold mb-4">Book Cover Editor</h2>
      <div className="flex flex-col gap-2">
        <label className="text-left font-semibold">Book Title:</label>
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-md"
          value={title}
          onChange={(e) => updateText("title", e.target.value)}
        />
        <label className="text-left font-semibold">Author Name:</label>
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-md"
          value={author}
          onChange={(e) => updateText("author", e.target.value)}
        />
      </div>
      <canvas ref={canvasRef} className="border mt-4 w-full h-[600px]"></canvas>
      <button
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        onClick={downloadCover}
      >
        Download Cover
      </button>
    </div>
  );
  
};

export default BookCoverEditor;
