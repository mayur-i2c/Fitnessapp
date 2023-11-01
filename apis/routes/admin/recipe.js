const express = require("express");
const router = express.Router();
const {
  addRecipes,
  updateRecipes,
  updateRecStatus,
  deleteMultRecipe,
  getAllRecipes,
  deleteRecipe,
  addRecipesSubCat,
  getAllRecSubCat,
  updateRecSubcat,
  deleteRecSubCat,
  deleteMultRecSubcat,
  updateRecSubCatStatus,
} = require("../../controllers/Admin/recipesController");
const authenticAdmin = require("../../helper/verifyAdminToken");
const { singleFileUpload, multiDiffFileUpload } = require("../../helper/imageUpload");

router.post(
  "/addRecipes",
  authenticAdmin,
  singleFileUpload("public/images/recipes", ["image/png", "image/jpeg", "image/jpg"], 1024 * 1024, "image"),
  addRecipes
);

router.put(
  "/updateRecipes/:id",
  authenticAdmin,
  singleFileUpload("public/images/recipes", ["image/png", "image/jpeg", "image/jpg"], 1024 * 1024, "image"),
  updateRecipes
);
router.put("/updateRecStatus/:id", authenticAdmin, updateRecStatus);
router.delete("/deleteRecipe/:id", authenticAdmin, deleteRecipe);
router.delete("/deleteMultRecipe", authenticAdmin, deleteMultRecipe);
router.get("/getAllRecipes", authenticAdmin, getAllRecipes);

router.post(
  "/addRecipesSubCat/:id",
  authenticAdmin,
  singleFileUpload("public/images/recipes", ["image/png", "image/jpeg", "image/jpg"], 1024 * 1024, "image"),
  addRecipesSubCat
);
router.get("/getAllRecSubCat/:id", authenticAdmin, getAllRecSubCat);
router.put(
  "/updateRecSubcat/:id",
  authenticAdmin,
  singleFileUpload("public/images/recipes", ["image/png", "image/jpeg", "image/jpg"], 1024 * 1024, "image"),
  updateRecSubcat
);
router.put("/updateRecSubCatStatus/:id", authenticAdmin, updateRecSubCatStatus);
router.delete("/deleteRecSubCat/:id", authenticAdmin, deleteRecSubCat);
router.delete("/deleteMultRecSubcat", authenticAdmin, deleteMultRecSubcat);

module.exports = router;
