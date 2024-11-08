# Tesla Sensor Data Dashboard 🚗

A real-time sensor monitoring dashboard inspired by Tesla's technology for autonomous vehicles and manufacturing systems. This project simulates sensor data for **temperature**, **pressure**, and **vibration** and integrates machine learning for predictive maintenance, offering insights into potential failures similar to systems used in Tesla vehicles.

## 📊 Project Overview

This dashboard provides a responsive and interactive visualization of real-time sensor data, designed to aid in proactive maintenance and diagnostic analysis, essential in autonomous and high-performance vehicle systems. Using WebSockets for real-time updates, MongoDB for data storage, and a predictive machine learning model, this project aims to emulate Tesla’s approach to vehicle health monitoring.

![Watch Demo](https://www.youtube.com/watch?v=rrnR8sx6o-g0.jpg)]

Click the image above to watch a video demo of the dashboard in action.

---

## 🔧 Features

- **Real-Time Data Monitoring**: Displays live sensor data using WebSockets, refreshing in real-time to showcase continuous data flow.
- **Predictive Maintenance with Machine Learning**: Uses a Random Forest model to analyze sensor data and predict potential failures.
- **Dynamic Data Visualization**: Offers a visually appealing and responsive dashboard with Chart.js for interactive data insights.
- **Customizable Alert System**: Triggers alerts based on predictive maintenance model output to signal potential system issues.

---

## 🚀 Tech Stack

- **Frontend**: React, Chart.js
- **Backend**: Node.js, Express, WebSocket
- **Database**: MongoDB (local instance)
- **Machine Learning**: Python (scikit-learn)
- **Deployment**: GitHub (code), [Option to deploy on Heroku, Railway, or Render]

---

## ⚙️ Installation and Setup

To set up the project locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/superstar-priyanshu/Tesla-Sensor-D.git
   cd Tesla-Sensor-
2. 🖥️ Usage

View Real-Time Data: Open the frontend at http://localhost:3000 to monitor live sensor updates and predictive maintenance alerts.
Customize Alert Thresholds: Adjust machine learning model parameters in the ml-training directory to fine-tune predictive analysis.

3. Screenshot of the product running
   
