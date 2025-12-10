const express = require("express");
const router = express.Router();
const discussionController = require("../controllers/discussion.controller");

router.get("/", discussionController.getAllDiscussions); // ADD THIS
router.get("/:id", discussionController.getDiscussion);
router.post("/", discussionController.createDiscussion);
router.put("/:id", discussionController.updateDiscussion); // ADD THIS
router.delete("/:id", discussionController.deleteDiscussion); // ADD THIS
router.post("/:id/comments", discussionController.addComment);
router.get("/:id/comments", discussionController.getComments);

module.exports = router;