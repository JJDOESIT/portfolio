import "../styles/projectPDF.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { useState, useEffect, useRef } from "react";
import { pdfjs, Document, Page } from "react-pdf";

export default function ProjectPDF(props) {
  const [numPages, setNumPages] = useState(null);
  const [width, setWidth] = useState(0);

  // Handle the document load success and get the total number of pages
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // Set up the worker source when the component mounts
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.min.mjs", // Ensure this path is correct based on your project setup
      import.meta.url
    ).toString();

    // Update the width whenever the window size changes
    const handleResize = () => {
      if (window.innerWidth <= 700) {
        setWidth(window.innerWidth * 0.8);
      } // Set the width to be the current window width
      else {
        setWidth(window.innerWidth * 0.6);
      }
    };

    // Add event listener for window resizing
    window.addEventListener("resize", handleResize);

    // Set initial width
    handleResize();

    // Cleanup event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="project-pdf-container" style={{ position: "relative" }}>
      <Document
        file={props.path}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={null}
      >
        {numPages &&
          Array.from(new Array(numPages), (el, index) => (
            <Page
              key={index} // Use unique key for each page
              pageNumber={index + 1} // Page number starts at 1
              renderTextLayer={false} // Disable the default text layer rendering to avoid duplicate text
              width={width} // Set the width of the page to match the screen width
              loading={null}
            />
          ))}
      </Document>
    </div>
  );
}
