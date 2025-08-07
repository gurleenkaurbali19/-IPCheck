import React, { useState } from 'react';
import axios from 'axios';

function App() {
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

      setResults(response.data.results); // assuming response has {"results": [...]}
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Upload CSV</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginLeft: '10px' }}>Upload</button>

      {results && (
        <div style={{ marginTop: '20px' }}>
          <h2>Processed Results:</h2>
          <ul>
            {results.map((item, index) => (
              <li key={index}>
                IP: {item.ip} | Prediction: {item.Prediction} | Score: {item.Suspicion_Score}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
