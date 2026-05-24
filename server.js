const express = require('express');
const cors = require('cors');
const path = require('path');
const contactRouter = require('./routes/contactRoutes');
const workRouter = require('./routes/workRoutes');
const adminRouter = require('./routes/AdminRoute');
const connectCloudinary = require('./util/cloudinary');
require('dotenv').config();
const connectDB = require('./DB/Connection');

const corsConfig = {
  origin: "*",
  credential: true,
  methods: ["GET", "POST", "DELETE", "PUT"]
}

const app = express();
app.options("*", cors(corsConfig));
app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/upload', express.static(path.join(__dirname, 'upload')));

app.use('/api/contact', contactRouter);
app.use('/api/work', workRouter);
app.use('/api/login', adminRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.get('/', (req, res) => {
  res.send('Hello, Vercel!');
});

connectDB();
connectCloudinary();

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

module.exports = app;