const express = require("express");
const router = express.Router();
const { getAllCollections } = require("../../controllers/App/workoutCollectionController");

router.get("/getAllCollections", getAllCollections);

module.exports = router;
