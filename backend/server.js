const express = require('express');
const WebSocket = require('ws');
const mongoose = require('mongoose');
const cors = require('cors');
const { PythonShell } = require('python-shell');
const path = require('path');

const app = express();
app.use(cors());

// MongoDB connection URI (update with your MongoDB Atlas URI if using Atlas)
const MONGODB_URI = 'mongodb://localhost:27017/sensordata'; // replace with process.env.MONGODB_URI if using .env

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Define the schema and model
const sensorSchema = new mongoose.Schema({
  temperature: Number,
  pressure: Number,
  vibration: Number,
  timestamp: { type: Date, default: Date.now },
  failure: Number,  // Field to store the prediction result
});

const SensorData = mongoose.model('SensorData', sensorSchema);

// Start the server on port 8080
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`HTTP server listening on port ${port}`);
});

// WebSocket Server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('WebSocket connection established');

  ws.on('message', (message) => {
    const data = JSON.parse(message);

    // Define PythonShell options to run `predict_failure.py`
    const options = {
      mode: 'text',
      pythonPath: '/usr/bin/python3',  // Adjust this path if needed
      pythonOptions: ['-u'],
      scriptPath: path.join(__dirname, '..', 'ml-training'), // Path to `predict_failure.py`
      args: [JSON.stringify(data)],
    };

    // Run the Python script to get the prediction result
    PythonShell.run('predict_failure.py', options, function (err, results) {
      if (err) {
        console.error('Error running Python script:', err);
        return;
      }

      // Parse and store the prediction result in the data object
      data.failure = parseInt(results[0], 10);

      // Save data with the prediction result to MongoDB
      const sensorData = new SensorData(data);
      sensorData.save()
        .then(() => {
          console.log('Data saved to MongoDB:', data);
          // Broadcast the data (with prediction) to all connected clients
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(data));
            }
          });
        })
        .catch((err) => console.error('Error saving data to MongoDB:', err));
    });
  });

  // Periodically broadcast dummy or test data to clients (optional)
  const intervalId = setInterval(() => {
    const testSensorData = {
      temperature: Math.random() * 100,
      pressure: Math.random() * 100,
      vibration: Math.random() * 100,
      timestamp: new Date(),
      failure: Math.round(Math.random()),  // Random failure status for testing
    };

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(testSensorData));
        console.log('Sent periodic data:', testSensorData);
      }
    });
  }, 1000); // Sends data every second

  // Handle WebSocket close event
  ws.on('close', () => {
    console.log('WebSocket connection closed');
    clearInterval(intervalId); // Clear interval when the connection is closed
  });

  // Handle WebSocket error event
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});


// API Endpoint to fetch historical data
app.get('/api/sensordata', async (req, res) => {
  try {
    const data = await SensorData.find().sort({ timestamp: -1 }).limit(100);
    res.json(data);
  } catch (err) {
    console.error('Error fetching sensor data:', err);
    res.status(500).send(err);
  }
});
