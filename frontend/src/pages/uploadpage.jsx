import React, { useState } from 'react';
import axios from 'axios';

function UploadPage() {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Save the response in state
      setResults(response.data.results);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div>
      <h2>Upload CSV</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {results && (
        <div>
          <h3>Results:</h3>
          <ul>
            {results.map((item, index) => (
                <li key={index}>
                <p><strong>IP:</strong> {item.ip}</p>
                <p><strong>Prediction:</strong> {item.Prediction}</p>
                <p><strong>Suspicion Score:</strong> {item.Suspicion_Score}</p>
                <p><strong>Latitude:</strong> {item.latitude}</p>
                <p><strong>Longitude:</strong> {item.longitude}</p>
                <p><strong>Location:</strong> {item.location}</p>
            <hr />
  </li>
))}


          </ul>
        </div>
      )}
    </div>
  );
}

export default UploadPage;
