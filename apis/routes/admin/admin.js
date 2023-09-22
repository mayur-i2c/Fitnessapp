const express = require('express');
const router = express.Router();
const {RegisterAdmin, LoginAdmin}  = require('../../controllers/Admin/adminController');

router.post('/register',RegisterAdmin);
router.post('/login',LoginAdmin);

module.exports = router;
