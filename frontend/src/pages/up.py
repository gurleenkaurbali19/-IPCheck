import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UploadPage() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:8000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // Directly navigates to map page with results
      navigate('/map', { state: { results: response.data.results } });
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Upload CSV</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginLeft: '10px' }}>Upload</button>
    </div>
  );
}

export default UploadPage;
