const Milestone = require('../models/Milestone')

module.exports = {
    createMilestone: async (req, res) => {
        console.log(req.user.name)
        try {
            await Milestone.create({
                user: req.user.id,
                year: req.body.year, 
                category: req.body.category,
                eventType: req.body.eventType, 
                userNotes: req.body.userNotes,
                status: 'Public', 
            })
            console.log('Milestone has been added!')
            res.redirect('/profile')
        } catch (err) {
            console.log(err)
        }
    },
    deleteMilestone: async (req, res) => {
        try {
        let post = await Milestone.findById({_id: req.params.id})    
        await Milestone.remove({ _id: req.params.id});
        console.log('Deleted Milestone');
        res.redirect('/profile');
        } catch (err) {
            res.redirect('/profile')
        }
    },
}