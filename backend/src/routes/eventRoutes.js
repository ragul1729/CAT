const router = require("express").Router();

const eventController = require("../controllers/eventController");

router.post('/', eventController.createEvent);
router.get('/', eventController.getAllEvents);

module.exports = router;