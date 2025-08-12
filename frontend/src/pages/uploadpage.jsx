import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/uploadpage.css';

function UploadPage() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a CSV file first.');
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:8000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/map', { state: { results: response.data.results } });
    } catch (err) {
      alert('Upload failed, please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="upload-page">
      {/* Fullscreen background video */}
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/background-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional dark overlay for better readability */}
      <div className="background-overlay"></div>

      {/* Right-aligned floating content */}
      <div className="content-right">
        <h1>IPCheck - Detect Suspicious IPs</h1>
        <p>Upload your server log CSV file to identify suspicious IP addresses with AI detection.</p>
        <input type="file" accept=".csv" onChange={handleFileChange} disabled={isLoading} />
        <button onClick={handleUpload} disabled={isLoading}>
          {isLoading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
    </div>
  );
}

export default UploadPage;
