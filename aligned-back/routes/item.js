const express = require('express');
const router = express.Router();
const {
    addItem,
    deleteItem,
    getItems,
    getItem,
    updateItem
} = require('../controllers/itemController');

router.get('/', getItems);
router.get('/:itemId', getItem);
router.put('/:itemId', updateItem);
router.post('/', addItem);
router.delete('/:itemId', deleteItem);

module.exports = router;
