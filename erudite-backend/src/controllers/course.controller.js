const courseService = require("../services/course.service");

exports.getAllCourses = async (req, res, next) => {
  try {
    const courses = await courseService.getAllCourses();
    res.json(courses);
  } catch (err) {
    next(err);
  }
};

exports.getCourseByCode = async (req, res, next) => {
  try {
    const course = await courseService.getCourseByCode(req.params.code);
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch (err) {
    next(err);
  }
};

exports.createCourse = async (req, res) => {
  try {
    const courseData = req.body;
    
    // Validate required fields
    const requiredFields = ['courseCode', 'title', 'description', 'category', 'difficulty'];
    for (const field of requiredFields) {
      if (!courseData[field]) {
        return res.status(400).json({ error: `Missing required field: ${field}` });
      }
    }
    
    // Ensure iUserId is a number or null
    courseData.iUserId = courseData.iUserId ? parseInt(courseData.iUserId) : null;
    
    const result = await courseService.createCourse(courseData);
    res.status(201).json(result);
  } catch (error) {
    console.error('Create Course Error:', error);
    res.status(500).json({ error: error.message });
  }
};


exports.updateCourse = async (req, res, next) => {
  try {
    await courseService.updateCourse(req.params.code, req.body);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

exports.deleteCourse = async (req, res, next) => {
  try {
    await courseService.deleteCourse(req.params.code);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

exports.addPrerequisite = async (req, res, next) => {
  try {
    const { prerequisite } = req.body;
    await courseService.addPrerequisite(req.params.code, prerequisite);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};
