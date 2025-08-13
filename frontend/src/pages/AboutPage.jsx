import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // For animation effects
import "../styles/aboutPage.css";

function AboutPage() {
  const navigate = useNavigate();

  const handleDownloadSample = () => {
    const data =
      "IP_Address,Timestamp,Request,Status\n" +
      "192.168.1.10,2025-08-10 14:23:54,GET /index.html,200\n" +
      "203.0.113.42,2025-08-11 08:15:33,POST /login,401";
    const blob = new Blob([data], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sample.csv";
    link.click();
  };

  return (
    <motion.div
      className="about-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="about-content">
        <h1 className="animated-header">About IPCheck</h1>
        <p className="intro">
          IPCheck is an AI-powered tool that analyzes your server log data to
          detect suspicious IP addresses. It scores each IP’s risk, locates it
          geographically, and displays it on an interactive map with colored
          severity indicators.
        </p>

        <h2 className="animated-subheader">How It Works</h2>
        <ol>
          <li>Upload a CSV file containing one or more IP addresses.</li>
          <li>Our backend processes, scores, and geolocates each IP.</li>
          <li>
            The results appear on a map — <span className="red">red</span> (high),
            <span className="yellow"> yellow</span> (medium),{" "}
            <span className="green">green</span> (low).
          </li>
        </ol>

        <h2 className="animated-subheader">How the AI Model Works</h2>
        <p>
          Our AI model analyzes patterns from large sets of server logs and
          identifies IP addresses exhibiting unusual or suspicious behaviors.
          It assigns a risk score from 0 to 1, where higher scores indicate
          higher suspicion of malicious activity. This helps detect threats
          proactively.
        </p>

        <h2 className="animated-subheader">Data Privacy & Security</h2>
        <p>
          Your uploaded files are never stored permanently. All processing is
          performed securely in-memory on our backend, and no log or IP data is
          shared with third parties. Your privacy is our priority.
        </p>

        <h2 className="animated-subheader">CSV File Format Guidelines</h2>
        <ul>
          <li>
            <strong>Required:</strong> <code>IP_Address</code> column with valid
            IPv4 or IPv6 addresses.
          </li>
          <li>
            <strong>Optional:</strong> <code>Timestamp</code>, <code>Request</code>
            , <code>Status</code>, and other log details.
          </li>
          <li>CSV must be comma-separated with headers in the first row.</li>
          <li>Avoid empty rows or malformed entries to prevent errors.</li>
        </ul>

        <h2 className="animated-subheader">Understanding the Map</h2>
        <p>
          Colored markers indicate IP risk levels:
          <ul>
            <li>
              <span className="red">Red (High Suspicion):</span> IPs with strong
              signs of malicious activity.
            </li>
            <li>
              <span className="yellow">Yellow (Medium Suspicion):</span> IPs with
              some suspicious behaviors but less certainty.
            </li>
            <li>
              <span className="green">Green (Low Suspicion):</span> IPs that appear
              normal or safe.
            </li>
          </ul>
        </p>
        <p>
          We recommend investigating high-risk IPs further with specialized tools
          or taking appropriate precautions like blocking.
        </p>

        <h2 className="animated-subheader">Limitations & Notes</h2>
        <ul>
          <li>Geolocation may not be perfectly accurate; marker locations are approximate.</li>
          <li>
            External API rate limits may cause slight delays or missing geolocations.
          </li>
          <li>
            This tool is advisory only and does not automatically block any IPs.
          </li>
        </ul>



        <h2 className="animated-subheader">Sample CSV</h2>
        <table className="sample-table">
  <thead>
    <tr>
      <th>IP_Address</th>
      <th>Timestamp</th>
      <th>Request</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>192.168.1.10</td>
      <td>2025-08-10 14:23:54</td>
      <td>GET /index.html</td>
      <td>200</td>
    </tr>
    <tr>
      <td>203.0.113.42</td>
      <td>2025-08-11 08:15:33</td>
      <td>POST /login</td>
      <td>401</td>
    </tr>
  </tbody>
</table>

        <p className="note">
          💡 Only CSV files are accepted. Make sure the first row contains column
          headers.
        </p>

        <div className="button-row">
          <button className="primary-btn" onClick={() => navigate("/")}>
            ← Back to Upload
          </button>

          <button className="secondary-btn" onClick={handleDownloadSample}>
            ⬇ Download Sample CSV
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default AboutPage;
