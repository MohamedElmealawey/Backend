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
  origin: ["http://localhost:5173", "https://portofolio-frontend-beryl.vercel.app"],
  credentials: true,
  methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  optionsSuccessStatus: 200,
}

const app = express();
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
  res.send('API is running!');
});

connectDB();
connectCloudinary();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});