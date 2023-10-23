const router = require("express").Router();
const adminRouter = require("../admin/admin");
const userRouter = require("../admin/user");
const settingRouter = require("../admin/setting");
const essentialRouter = require("../admin/essential");
const reelRouter = require("../admin/reel");
const exeLibraryRouter = require("../admin/exeLibrary");
const workoutCollectionRouter = require("../admin/workoutCollection");

// Use router in index
router.use("/admin", adminRouter);
router.use("/admin/user", userRouter);
router.use("/admin/setting", settingRouter);
router.use("/admin/essential", essentialRouter);
router.use("/admin/reel", reelRouter);
router.use("/admin/exeLibrary", exeLibraryRouter);
router.use("/admin/workCollection", workoutCollectionRouter);

module.exports = router;
