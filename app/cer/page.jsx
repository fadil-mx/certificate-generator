"use client";
import React, { useCallback, useState } from "react";
import { PDFDocument } from "pdf-lib";

const page = () => {
  const [name, setName] = useState("FADIL SHEREEF");
  const [date, setDate] = useState("14-11-2024");
  const [id, setId] = useState("456-412-963-741");
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // State for preview URL
  const [showPreview, setShowPreview] = useState(false); // Toggle to show preview

  const onButtonClick = useCallback(async (event) => {
    event.preventDefault(); // Prevent form submission and page reload

    try {
      // Fetch the existing PDF file from the public directory
      const existingPdfBytes = await fetch("/cer.pdf").then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch the PDF file. Check the file path.");
        }
        return res.arrayBuffer();
      });

      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      const form = pdfDoc.getForm();

      // Set values in the form fields
      form.getTextField("name").setText(name);
      form.getTextField("date").setText(date);
      form.getTextField("id").setText(id);

      form.flatten(); // Make fields non-editable

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      
      setPreviewUrl(url); // Set the preview URL
      setShowPreview(true); // Show the preview iframe

    } catch (err) {
      console.error("Error customizing PDF:", err);
      setError("Failed to customize the PDF. Check the console for details.");
    }
  }, [name, date, id]);

  const handleDownload = () => {
    // Download the final PDF
    const link = document.createElement("a");
    link.href = previewUrl;
    link.download = "customized_certificate.pdf";
    link.click();
  };

  return (
    <div className="flex flex-col text-black justify-center items-center gap-10 bg-black">
      <h1 className="font-bold text-green-800 text-[50px]">CERTIFICATE</h1>
      <form>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Date:
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <br />
        <label>
          ID:
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </label>
        <br />
        <button
          className="text-white bg-green-500"
          onClick={onButtonClick}
        >
          Customize & Preview PDF
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>

      {showPreview && (
        <div className="preview-container">
          <h2>Preview Your Certificate</h2>
          <iframe
            src={previewUrl}
            width="600"
            height="400"
            title="Certificate Preview"
          ></iframe>
          <br />
          <button
            className="text-white bg-blue-500"
            onClick={handleDownload}
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default page;
