const express = require("express");
const router = express.Router();
const { getAllEssentials, getEssSubCat1, getEssSubCat2 } = require("../../controllers/App/essentialsController");

router.get("/getAllEssentials", getAllEssentials);
router.get("/getEssSubCat1", getEssSubCat1);
router.get("/getEssSubCat2", getEssSubCat2);

module.exports = router;
