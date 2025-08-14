import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/uploadpage.css';

function UploadPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false); // new state
  const navigate = useNavigate();

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a CSV file first.');
      return;
    }

    setLoading(true); // start loader

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
  'https://ipcheck-backend-hzdr.onrender.com/upload',
  formData,
  { headers: { 'Content-Type': 'multipart/form-data' } }
);

      // stop loader & navigate
      setLoading(false);
      navigate('/map', { state: { results: response.data.results } });

    } catch (error) {
      console.error(error);
      alert('Upload failed. Please try again.');
      setLoading(false); // stop loader even on error
    }
  };

  return (
    <div className="upload-page">
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/background-video.mp4" type="video/mp4" />
      </video>
      <div className="background-overlay"></div>

      <div className="content-right">
        <h1>IPCheck - Detect Suspicious IPs</h1>
        <p>Upload your server log CSV file to identify suspicious IP addresses with AI detection.</p>

        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          disabled={loading}
        />

        <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
  <button
    onClick={handleUpload}
    disabled={loading}
    style={{
      backgroundColor: "#4db8ff",
      border: "none",
      padding: "10px 16px",
      borderRadius: "5px",
      color: "#111",
      fontWeight: "bold",
      cursor: "pointer",
      flex: "0 0 auto",
      opacity: loading ? 0.7 : 1,
    }}
  >
    {loading ? "Uploading..." : "Upload"}
  </button>

  <button
    onClick={() => navigate("/about")}
    style={{
      backgroundColor: "#4db8ff",
      border: "none",
      padding: "10px 16px",
      borderRadius: "5px",
      color: "#111",
      fontWeight: "bold",


    }}
  >
    Info
  </button>
</div>





        {/* inline loader below button */}
        {loading && (
          <div className="inline-loader">
            <div className="spinner"></div>
            <span>Processing data...</span>
          </div>
        )}
      </div>
    </div>
  );
}
  
export default UploadPage;
