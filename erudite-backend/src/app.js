const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const courseRoutes = require("./routes/course.routes");
const contentRoutes = require("./routes/content.routes");
const enrollmentRoutes = require("./routes/enrollment.routes");
const quizRoutes = require("./routes/quiz.routes");
const discussionRoutes = require("./routes/discussion.routes");
const commentRoutes = require('./routes/comment.routes');
const techsupportRoutes = require("./routes/techsupport.routes");
const evaluationRoutes = require('./routes/evaluation.routes');
const instructorRoutes = require('./routes/instructor.routes');



const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Base route
app.get("/", (req, res) => res.json({ status: "ok", message: "Erudite API" }));

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/discussion", discussionRoutes);
app.use('/api/comments', commentRoutes);
app.use("/api/support", techsupportRoutes);
app.use('/api/evaluation', evaluationRoutes);
app.use('/api/instructors', instructorRoutes);


// 404
app.use((req, res) => res.status(404).json({ error: "Not Found" }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

module.exports = app;
