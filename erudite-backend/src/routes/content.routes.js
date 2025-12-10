const express = require("express");
const router = express.Router();
const contentController = require("../controllers/content.controller");

router.get("/", contentController.getAllContents); // ADD THIS
router.get("/course/:courseCode", contentController.getCourseContents);
router.get("/:id", contentController.getContentById);
router.post("/", contentController.createContent);
router.put("/:id", contentController.updateContent);
router.delete("/:id", contentController.deleteContent);

module.exports = router;