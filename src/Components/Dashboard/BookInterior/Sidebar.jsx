import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./BookInterior.css";

const Sidebar = () => {
  const [sections, setSections] = useState({
    "Front Matter": [],
    Poems: ["First Poem", "Second Poem"], // ✅ Keep Poems as subtitles
  });

  const [showModal, setShowModal] = useState(false);

  const frontMatterOptions = [
    "Introduction",
    "Copyright",
    "Foreword",
    "Index",
    "Dedication",
    "Preface",
    "Acknowledgements",
  ];

  // ✅ Show modal only for "Front Matter"
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSelectOption = (option) => {
    if (!sections["Front Matter"].includes(option)) {
      // ✅ Prevent duplicates in Front Matter
      setSections({
        ...sections,
        "Front Matter": [...sections["Front Matter"], option],
      });
    }
    handleCloseModal();
  };

  return (
    <div className="sidebar">
      <h3>Book Interior</h3>
      {Object.keys(sections).map((category) => (
        <div key={category} className="category">
          <div className="category-header">
            <strong>{category}</strong>
            {category === "Front Matter" && (
              <button
                className="btn btn-sm btn-primary add-btn"
                onClick={handleOpenModal}
              >
                +
              </button>
            )}
          </div>
          <div className="subpoints">
            {sections[category].map((subpoint, index) => (
              <div key={index} className="subpoint">
                {subpoint}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* ✅ Modal for Front Matter Only */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select a Section</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {frontMatterOptions.map((option, index) => (
            <Button
              key={index}
              className="option-btn"
              onClick={() => handleSelectOption(option)}
            >
              {option}
            </Button>
          ))}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Sidebar;
