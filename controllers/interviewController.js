const Interview = require('../models/interview');

let findInterview = async function (id) {
    let interview = await Interview.findById(id)
        .populate({    // have to populate interview as well
            path: 'students'
        });

    return interview;
}


module.exports.show = async function (req, res) {
    try {
        let interview = await findInterview(req.params.id);

        return res.render('interview_profile', {
            title: "Placement Cell | Interview details",
            interview: interview
        });

    } catch (err) {
        if (err) { console.log('Error in showing interviews', err); }
    }
}

module.exports.edit = async function (req, res) {
    try {
        let interview = await findInterview(req.params.id);

        return res.render('interview_profile', {
            title: "Placement Cell | Interview details",
            interview: interview
        });

    } catch (err) {
        if (err) { console.log('Error in showing interviews', err); }
    }
}

module.exports.add = async function (req, res) {
    if (req.isAuthenticated()) {
        return res.render('add_interview', {
            title: 'Placement Cell | Add Interview'
        });
    } else {
        req.flash('error', 'userToken expired. Please sign in again.');
        res.redirect('/sign-in');
    }
}