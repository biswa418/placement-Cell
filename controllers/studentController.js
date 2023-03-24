const Student = require('../models/student');

let findStudent = async function (id) {
    let student = await Student.findById(id)
        .populate({    // have to populate interview as well
            path: 'interview',
        });

    return student;
}


module.exports.show = async function (req, res) {
    try {
        let student = await findStudent(req.params.id);

        if (student) {
            return res.render('student_profile', {
                title: "Placement Cell | Student details",
                student: student
            });
        } else {
            res.redirect('back');
        }

    } catch (err) {
        if (err) { console.log('Error in showing students', err); }
    }
}

module.exports.edit = async function (req, res) {
    try {
        let student = await findStudent(req.params.id);

        if (student) {
            return res.render('student_profile', {
                title: "Placement Cell | Student details",
                student: student
            });
        } else {
            res.redirect('back');
        }

    } catch (err) {
        if (err) { console.log('Error in showing students', err); }
    }
}

module.exports.add = async function (req, res) {
    if (req.isAuthenticated()) {
        return res.render('add_student', {
            title: 'Placement Cell | Add Students'
        });
    } else {
        req.flash('error', 'userToken expired. Please sign in again.');
        res.redirect('/sign-in');
    }
}

module.exports.create = async function (req, res) {
    let student = await Student.create({
        name: req.body.name,
        email: req.body.email,
        batch: req.body.batch,
        status: req.body.status,
        courseScore: [req.body.dsa_score, req.body.webD_score, req.body.react_score],
    });

    if (student) {
        req.flash('success', 'Added the student');
        res.redirect('/');
    } else {
        req.flash('error', 'Could not add the student');
        res.redirect('back');
    }
}