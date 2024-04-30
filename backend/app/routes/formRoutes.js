const router = require('express').Router();

const formContorller = require('../controllers/formController');

// To get all submissions
router.get('/all', formContorller.getAllSubmissions)

// To get dashboard analysis data
router.get('/dashboard', formContorller.getDashboardAnalysis)

// To save sumitted form
router.post('/new', formContorller.submitFeedback)

module.exports = router;