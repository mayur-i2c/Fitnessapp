const express = require("express");
const router = express.Router();
const { getAllReels } = require("../../controllers/App/reelController");

router.get("/getAllReels", getAllReels);

module.exports = router;
