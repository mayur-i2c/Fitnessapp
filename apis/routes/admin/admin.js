const express = require('express');
const router = express.Router();
const {RegisterAdmin, LoginAdmin, RefreshToken}  = require('../../controllers/Admin/adminController');

router.post('/register',RegisterAdmin);
router.post('/login',LoginAdmin);
router.post('/refreshToken',RefreshToken);


module.exports = router;
