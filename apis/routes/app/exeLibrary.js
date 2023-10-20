const express = require("express");
const router = express.Router();
const { getAllExeLibrary } = require("../../controllers/App/exerciseLibraryController");

router.get("/getAllExeLibrary", getAllExeLibrary);

module.exports = router;
