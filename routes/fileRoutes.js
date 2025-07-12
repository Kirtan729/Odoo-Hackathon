const express = require('express');
const { uploadFile } = require('../controllers/fileController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Apply auth middleware to all file routes
router.use(auth);

// Upload file endpoint
router.post('/upload', uploadFile);


module.exports = router;
