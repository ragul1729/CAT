const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

router.post('/', videoController.createVideo);
router.get('/', videoController.getAllVideos);
router.get('/:id', videoController.getVideoById);
router.delete('/:id', videoController.deleteVideo);

module.exports = router;
