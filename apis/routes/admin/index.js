const router = require("express").Router();
const adminRouter = require("../admin/admin");
const userRouter = require("../admin/user");
const settingRouter = require("../admin/setting");

// Use router in index
router.use("/admin", adminRouter);
router.use("/admin/user", userRouter);
router.use("/admin/setting", settingRouter);

module.exports = router;
