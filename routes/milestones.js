const express = require('express')
const router = express.Router()
const milestonesController = require("../controllers/milestones")
const {ensureAuth, ensureGuest} = require('../middleware/auth')

//Milestones route
router.post('/createMilestone/:id', ensureAuth, milestonesController.createMilestone)

router.delete('/deleteMilestone/:id', milestonesController.deleteMilestone);

module.exports = router