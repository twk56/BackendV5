const express = require('express');
const router = express.Router();
const { getAllRooms } = require('@controllers/RoomsController');

router.get('/', getAllRooms);

module.exports = router;
