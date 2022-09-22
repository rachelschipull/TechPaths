const Milestone = require('../models/Milestone')

module.exports = {
    createMilestone: async (req, res) => {
        console.log(req.user.name)
        try {
            await Milestone.create({
                year: req.body.year, 
                category: req.body.category,
                event: req.body.event, 
                userNotes: req.body.userNotes,
                status: 'public', 
            })
            console.log('Milestone has been added!')
            red.redirect('/profile')
        } catch (err) {
            console.log(err)
        }
    }
}