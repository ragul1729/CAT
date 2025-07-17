const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const { getAllSensorData, getTotalExcavation } = require('./services/sensorDataService');
const { connectDB } = require("./utils/db");

const httpServer = http.createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

connectDB();


const taskRoutes = require("./routes/taskRoutes");
const eventRoutes = require("./routes/eventRoutes");
const videoRoutes = require("./routes/videoRoutes");
const authRoutes = require('./routes/authRoutes');

app.use("/tasks", taskRoutes);
app.use("/events", eventRoutes);
app.use("/videos", videoRoutes);
app.use('/auth', authRoutes);

app.get('/api/status', (req, res) => {
  res.json({ status: '✅ API & Socket.IO running' });
});

io.on('connection', async (socket) => {
  console.log('Client connected:', socket.id);

  let intervalId = null;

  try {
    const sensorDataList = await getAllSensorData();
    let index = 0;

    intervalId = setInterval(() => {
      if (index < sensorDataList.length) {
        console.log('Emitting Sensor Data:', sensorDataList[index]);
        socket.emit('sensorDataUpdate', sensorDataList[index]);
        index++;
      } else {
        clearInterval(intervalId);
        console.log('Finished streaming all sensor data to client:', socket.id);
      }
    }, 500);  
  } catch (err) {
    console.error('Error streaming sensor data:', err);
  }

  socket.on('disconnect', () => {
    clearInterval(intervalId);
    console.log('Client disconnected:', socket.id);
  });
});

// Optional: Send updates every minute (you can adjust)
// setInterval(async () => {
//   const totals = await getTotalExcavation();
//   io.emit('excavationSummary', totals);
// }, 60000);

const PORT = 3000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));