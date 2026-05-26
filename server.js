const express = require('express');
const cors = require('cors');
const path = require('path');
const contactRouter = require('./routes/contactRoutes');
const workRouter = require('./routes/workRoutes');
const adminRouter = require('./routes/AdminRoute');
const connectCloudinary = require('./util/cloudinary');
require('dotenv').config();
const connectDB = require('./DB/Connection');
const app = express();
 
app.use(cors());
app.use(express.json());
 
// Only parse urlencoded bodies for non-multipart requests.
// Applying express.urlencoded to multipart/form-data corrupts the stream
// and causes Multer to throw "Unexpected field" even for valid field names.
app.use((req, res, next) => {
  const contentType = req.headers['content-type'] || '';
  if (contentType.includes('multipart/form-data')) {
    return next(); // let Multer handle it untouched
  }
  express.urlencoded({ extended: false })(req, res, next);
});
 
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