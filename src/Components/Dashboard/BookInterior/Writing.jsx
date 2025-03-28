import React, { useState } from "react";
import "./BookInterior.css";

const Writing = () => {
  const [text, setText] = useState(
    "To my coffee machine, for always being there in my darkest hours..."
  );

  return (
    <div className="writing">
      <h2>1. Dedication</h2>
      <div className="input-container">
        <textarea
          className="editor"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="input-adornment">
          <button className="btn btn-secondary">Previous Step</button>
          <button className="btn btn-warning">Save as Draft</button>
          <button className="btn btn-danger">Preview & Finish</button>
        </div>
      </div>
    </div>
  );
};

export default Writing;
