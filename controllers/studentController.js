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