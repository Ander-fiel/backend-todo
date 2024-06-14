const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");
const { verifyToken } = require("../middlewares/authMiddleware");

// client
router.get("/users", [verifyToken], userController.getUsers);

// auth
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/refresh-token", userController.refreshToken);

module.exports = router;
