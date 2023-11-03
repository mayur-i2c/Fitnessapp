const express = require("express");
const router = express.Router();
const { getAllRecipes, getSearchRecipes } = require("../../controllers/App/recipesController");

router.get("/getAllRecipes", getAllRecipes);
router.get("/getSearchRecipes", getSearchRecipes);

module.exports = router;
