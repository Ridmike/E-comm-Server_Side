const express = require('express');
// const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');
const asyncHandler = require('express-async-handler');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middlewares
app.use(bodyParser.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Example route
app.get('/', (req, res) => {
  res.send("API is working");
});

// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
