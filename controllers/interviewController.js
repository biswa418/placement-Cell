const Interview = require('../models/interview');
const Student = require('../models/student');

let findInterview = async function (id) {
    let interview = await Interview.findById(id)
        .populate({    // have to populate interview as well
            path: 'students',
            populate: {
                path: 'student'
            }
        });

    return interview;
}

module.exports.show = async function (req, res) {
    try {
        let interview = await findInterview(req.params.id);

        // console.log(interview.students[0].student);

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

        let students = interview.students;

        for (let student of students) {
            await Interview.findByIdAndUpdate(interview._id, { students: { result: req.body[`status-${student.student._id}`] } });
        }

        return res.redirect('/');

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
        res.redirect('/users/sign-in');
    }
}

module.exports.create = async function (req, res) {
    let interview = await Interview.create({
        company_name: req.body.company_name,
        date: req.body.interview_date,
    });

    if (interview) {
        req.flash('success', 'Added the interview');
        res.redirect('/');
    } else {
        req.flash('error', 'Could not add the interview');
        res.redirect('back');
    }
}

//remove the interview and assigned Student
module.exports.remove = async function (req, res) {
    try {
        let interview = await findInterview(req.params.id);

        if (!interview) {
            req.flash("error", "Couldn't find interview");
            return;
        }

        const studentAssigned = interview.students;

        // delete reference of student from enrolled company
        if (studentAssigned.length > 0) {
            for (let student of studentAssigned) {
                await Student.findOneAndUpdate(
                    { id: student._id },
                    { $pull: { interview: { interview: req.params.id } } }
                );
            }
        }

        await Interview.findByIdAndDelete(req.params.id);
        req.flash("success", "Interview removed!");
        return res.redirect("back");

    } catch (err) {
        console.log(err);
    }
}