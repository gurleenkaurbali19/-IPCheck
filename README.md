# 🌐 IPCheck – AI‑Powered Suspicious IP Detection

IPCheck is a web-based tool that helps you **detect and visualize suspicious IP addresses** from your server logs using an **AI-powered risk scoring system**.  
It processes uploaded CSV log files, geolocates IPs, and displays them on an interactive **Leaflet map** with color-coded severity indicators.

---

## 🚀 Features

- **CSV File Upload** – Simple file upload UI with drag/drop (or file select)
- **AI Risk Scoring** – IPs are classified into **High (Red)**, **Medium (Yellow)**, and **Low (Green)** suspicion levels  
- **Interactive Map** – Explore IP location data using a responsive Leaflet-based map  
- **Marker Filters** – Toggle High/Medium/Low markers to focus on relevant data  
- **Dark Themed UI** – Modern neon‑accent dark UI across all pages  
- **About Page** – Detailed project info, privacy policy, and CSV format guide with a sample table  
- **Downloadable Sample CSV** – Quickly get a properly formatted CSV to test the app  
- **Animated & Interactive UI** – Smooth transitions, hover states, and dynamic backgrounds

---

## 📂 CSV File Format

Your CSV **must** have at least **one column named** `IP_Address`.  
Additional columns (timestamp, request type, status, etc.) are optional but recommended.

### **Example CSV Table**
| IP_Address     | Timestamp              | Request           | Status |
|----------------|------------------------|-------------------|--------|
| 192.168.1.10   | 2025-08-10 14:23:54     | GET /index.html   | 200    |
| 203.0.113.42   | 2025-08-11 08:15:33     | POST /login       | 401    |

💡 Only `.csv` files are allowed. The first row **must** contain headers.

---

## 🔒 Data Privacy & Security

- Uploaded files are **never stored permanently**.  
- Processing happens **in memory**, and no IP/log data is shared with third parties.  
- Locations are approximate based on public IP geolocation databases.

---

## 🛠 Tech Stack

**Frontend:**  
- React.js (with React Router)  
- Leaflet (interactive maps)  
- CSS animations, dark theme  

**Backend:**  
- Python FastAPI (file handling & AI scoring)  
- IP geolocation library/API  
- Pandas (CSV processing)  

---

