# 🌐 IPCheck — AI-Powered Suspicious IP Detection

IPCheck is a **full-stack web application** built with **FastAPI** (backend) and **React** (frontend) that helps detect **suspicious IP addresses** in server logs using a trained **Random Forest Machine Learning model**.  
It allows users to upload a server log in CSV format and get an **AI-powered analysis** along with a **visual map display** of flagged IPs.


## 📸 Screenshots

<p align="center">
  <table>
    <tr>
      <td align="center">
        <img width="1919" height="886" alt="image" src="https://github.com/user-attachments/assets/da6c2fee-8812-401c-b8e4-75ecf23f8a46" 
 alt="Home Page" width="300"/>
        <br/>Home Page
      </td>
      <td align="center">
        <img width="1914" height="888" alt="image" src="https://github.com/user-attachments/assets/5c404440-63b7-4631-80dd-8ea90c9ae081" 
 alt="Map Page" width="300"/>
        <br/>Map Page
      </td>
      <td align="center">
        <img width="1919" height="866" alt="image" src="https://github.com/user-attachments/assets/1e40c701-5f28-45f5-be9f-996f38bf7e3b" 
 alt="Info Page" width="300"/>
        <br/>Info Page
      </td>
    </tr>
  </table>
</p>


---

## 🚀 Features

- **CSV Upload**: Upload your server log with HTTP requests.
- **AI Analysis**: Uses a trained Random Forest model to score IPs for suspicious behavior.
- **Interactive Map**: Displays IP locations on a world map.
- **About/Info Page**: Explains how the system works.

---

## 🛠 Tech Stack

**Frontend**:
- React (Vite or CRA)
- Axios for API calls
- CSS for styling
- Deployed on **Vercel**

**Backend**:
- Python 3 + FastAPI
- Scikit-learn & Joblib for ML
- Pandas, NumPy for data processing
- Deployed on **Render**

**Machine Learning**:
- Random Forest Classifier
- Model trained on labeled request pattern data
- Stores as `random_forest_model.joblib`

---

## 📂 Project Structure

```
IPCheck/
├── backend/ # FastAPI backend
│ ├── app/
│ │ ├── main.py # App entry & CORS settings
│ │ ├── routes.py # API routes
│ │ ├── model.py # ML model loading & prediction
│ ├── Model/
│ │ └── random_forest_model.joblib
│ ├── requirements.txt
├── frontend/ # React frontend
│ ├── src/
│ │ ├── pages/UploadPage.jsx
│ │ ├── styles/
│ │ └── ...
└── README.md
```

---

## ⚙️ How It Works

1. **User uploads server log CSV** via frontend.
2. **Frontend sends file** to `/upload` endpoint on backend.
3. **Backend reads CSV** into Pandas DataFrame.
4. Checks for required features:
```
DELETE_Perc, GET_Perc, POST_Perc, PUT_Perc, 4xx_Perc, 5xx_Perc, Other_Perc
```
5. ML model (`random_forest_model.joblib`) predicts:
- `"Prediction"`: Normal (0) or Suspicious (1)
- `"Suspicion_Score"`: Probability measure
6. Returns JSON to the frontend.
7. **Frontend displays** results in a table + plots suspicious IPs on a map.

---

## 🖥 Local Development Setup

### Prerequisites
- Python 3.10+  
- Node.js 18+

### 1️⃣ Backend Setup
```
cd backend
python -m venv venv
source venv/bin/activate # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### 2️⃣ Frontend Setup
```
cd frontend
npm install
npm start
```

---

## 🌍 Deployment

- **Backend** → [Render](https://render.com/) with `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- **Frontend** → [Vercel](https://vercel.com/)

---

## 👤 Author

**Gurleen Kaur Bali** 


