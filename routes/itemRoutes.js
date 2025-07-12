const express = require('express');
const { createItem, getItems, deleteItem } = require('../controllers/itemController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.use(auth);
router.post('/', createItem);
router.get('/', getItems);
router.delete('/:id', deleteItem);

module.exports = router;
