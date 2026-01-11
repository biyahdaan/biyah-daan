const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
const app = express();

// Database connect karo
connectDB();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send("Biyah Daan API is Working!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
