const router = require("express").Router();
const userRouter = require("../app/user");
const settingRouter = require("../app/settings");
const essentialsRouter = require("../app/essentials");

// Use router in index
router.use("/app/user", userRouter);
router.use("/app/setting", settingRouter);
router.use("/app/essentials", essentialsRouter);

module.exports = router;
