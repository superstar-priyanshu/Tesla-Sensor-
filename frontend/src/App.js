import React, { useEffect, useState } from 'react';
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import './App.css';  // Import the new CSS

function App() {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    let socket;

    const connectWebSocket = () => {
      socket = new WebSocket('ws://localhost:8080');

      socket.onopen = () => {
        console.log('WebSocket connection established');
      };

      socket.onmessage = (event) => {
        const newSensorData = JSON.parse(event.data);
        setSensorData((prevData) => [newSensorData, ...prevData].slice(0, 100));
      };

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      socket.onclose = () => {
        console.log('WebSocket connection closed. Attempting to reconnect...');
        setTimeout(connectWebSocket, 3000); 
      };
    };

    connectWebSocket();

    return () => {
      if (socket) socket.close();
    };
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/api/sensordata')
      .then((res) => res.json())
      .then((data) => setSensorData(data.reverse()));
  }, []);

  const data = {
    labels: sensorData.map((data) => new Date(data.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'Temperature',
        data: sensorData.map((data) => data.temperature),
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
      {
        label: 'Pressure',
        data: sensorData.map((data) => data.pressure),
        borderColor: 'rgba(153,102,255,1)',
        fill: false,
      },
      {
        label: 'Vibration',
        data: sensorData.map((data) => data.vibration),
        borderColor: 'rgba(255,159,64,1)',
        fill: false,
      },
    ],
  };

  return (
    <div className="container">
      <h1>Real-Time Sensor Data</h1>
      <div className="chart-container">
        <Line data={data} key={sensorData.length} />
      </div>
    </div>
  );
}

export default App;
