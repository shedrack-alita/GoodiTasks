
const express = require("express");
const router = express.Router();

// Registration controller imported
const regController = require("../controller/userController");

//Access route/end point
router.post("/register", regController.register);

module.exports = router;