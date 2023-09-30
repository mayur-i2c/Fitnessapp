const router = require("express").Router()
const adminRouter =require("../admin/admin");
const userRouter = require("../admin/user");

// Use router in index
router.use("/admin", adminRouter);
router.use("/admin/user", userRouter);


module.exports=router;