// Simulates a sensor that sends data to the server every second
//author: Kumar Priyanshu Raj

const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', function open() {
  setInterval(() => {
    const sensorData = {
      temperature: (20 + Math.random() * 10).toFixed(2),
      pressure: (1 + Math.random() * 0.5).toFixed(2),
      vibration: (0.5 + Math.random() * 0.5).toFixed(2),
      timestamp: new Date().toISOString(),
    };
    ws.send(JSON.stringify(sensorData));
  }, 1000); // Send data every second
});
