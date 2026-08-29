const express = require('express');
const router = express.Router();
const { getHODStats, getFacultyRoster, getAdvisorStudents, getStudentData, submitFeedback } = require('../controllers/dashboardController');

router.get('/hod/stats', getHODStats);
router.get('/hod/roster', getFacultyRoster);
router.get('/advisor/:advisorId/students', getAdvisorStudents);
router.get('/student/:studentId', getStudentData);
router.post('/feedback', submitFeedback);

module.exports = router;
