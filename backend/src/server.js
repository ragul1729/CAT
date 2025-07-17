const express = require('express');
const app = express();
const cors = require('cors');
const { connectDB } = require("./utils/db");

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


const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));