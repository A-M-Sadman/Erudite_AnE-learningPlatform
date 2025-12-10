const techService = require("../services/techsupport.service");

exports.createTicket = async (req, res, next) => {
  try {
    const id = await techService.createTicket(req.body);
    res.status(201).json({ problemId: id });
  } catch (err) { next(err); }
};

exports.getStudentTickets = async (req, res, next) => {
  try {
    const rows = await techService.getStudentTickets(req.params.id);
    res.json(rows);
  } catch (err) { next(err); }
};

exports.getTicket = async (req, res, next) => {
  try {
    const row = await techService.getTicket(req.params.id);
    res.json(row);
  } catch (err) { next(err); }
};

exports.addSolution = async (req, res, next) => {
  try {
    await techService.addSolution(req.params.id, req.body);
    res.json({ ok: true });
  } catch (err) { next(err); }
};

// Add this method:
exports.getAllTickets = async (req, res, next) => {
  try {
    const tickets = await techService.getAllTickets();
    res.json(tickets);
  } catch (err) {
    next(err);
  }
};