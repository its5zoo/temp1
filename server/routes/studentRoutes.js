const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/overview', studentController.getStudentOverview);
router.get('/courses', studentController.getStudentCourses);
router.get('/results', studentController.getStudentResults);
router.get('/timetable', studentController.getStudentTimetable);
router.get('/attendance', studentController.getStudentAttendance);
router.get('/fees', studentController.getStudentFees);
router.post('/fees/pay', studentController.payStudentFee);
router.post('/feedback', studentController.submitFacultyFeedback);
router.get('/doubts', studentController.getStudentDoubts);
router.post('/doubts', studentController.createStudentDoubt);

module.exports = router;
