const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const { verifyToken } = require("../middlewares/authMiddleware");
const multer = require("multer");
const uuid = require("uuid");

const DIR = "./public/";

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, DIR);
	},
	filename: (req, file, cb) => {
		const filename = file.originalname.toLowerCase().split(" ").join("-");
		cb(null, uuid.v4() + filename);
	},
});

const upload = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		if (
			file.mimetype == "image/jpg" ||
			file.mimetype == "image/png" ||
			file.mimetype == "image/jpeg"
		) {
			cb(null, true);
		} else {
			cb(null, false);
			return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
		}
	},
});

router.post("/task", [verifyToken, upload.single("image")], taskController.createTask);
router.get("/task", [verifyToken], taskController.fetchTasks);
router.put("/task/:id", [verifyToken, upload.single("image")], taskController.updateTask);
router.delete("/task/:id", [verifyToken], taskController.deleteTask);
router.get("/task/:id", [verifyToken], taskController.getTask);

module.exports = router;
