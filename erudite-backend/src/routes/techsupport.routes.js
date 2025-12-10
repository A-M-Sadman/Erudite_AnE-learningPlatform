const express = require("express");
const router = express.Router();
const techController = require("../controllers/techsupport.controller");

router.get("/", techController.getAllTickets); // ADD THIS
router.post("/create", techController.createTicket);
router.get("/student/:id", techController.getStudentTickets);
router.get("/:id", techController.getTicket);
router.post("/:id/solution", techController.addSolution);

module.exports = router;