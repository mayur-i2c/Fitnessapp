const router = require("express").Router();
const userRouter = require("../app/user");
const settingRouter = require("../app/settings");

// Use router in index
router.use("/app/user", userRouter);
router.use("/app/setting", settingRouter);

module.exports = router;
