const express = require("express");
const router = express.Router();
const { getAllRecipes } = require("../../controllers/App/recipesController");

router.get("/getAllRecipes", getAllRecipes);

module.exports = router;
