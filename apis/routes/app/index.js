const router = require("express").Router();
const userRouter = require("../app/user");
const settingRouter = require("../app/settings");
const essentialsRouter = require("../app/essentials");
const reelsRouter = require("../app/reels");
const exeLibraryRouter = require("../app/exeLibrary");

// Use router in index
router.use("/app/user", userRouter);
router.use("/app/setting", settingRouter);
router.use("/app/essentials", essentialsRouter);
router.use("/app/reel", reelsRouter);
router.use("/app/exeLibrary", exeLibraryRouter);

module.exports = router;
