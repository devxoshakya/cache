import React from "react";

const PDFViewer = ({fileId}) => {
  // const fileId = "1R4NkBuBGbNZxHkBMLDDgl0rqZIj6UYmL"; // Replace with your Google Drive file ID

  return (
    <div className="min-h-screen min-w-full relative">
      {/* The iframe displaying the Google Drive PDF */}
      <iframe
        src={fileId}
        className="min-h-screen min-w-full"
        allow="autoplay"
        style={{ border: "none" }}
      ></iframe>

      
    </div>
  );
};

export default PDFViewer;

{/* <Document file="https://drive.google.com/uc?export=download&id=1R4NkBuBGbNZxHkBMLDDgl0rqZIj6UYmL" onLoadSuccess={onDocumentLoadSuccess}> */}
