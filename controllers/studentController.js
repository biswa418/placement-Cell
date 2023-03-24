const Student = require('../models/student');
const Interview = require('../models/interview');

//find student and populate interview
let findStudent = async function (id) {
    let student = await Student.findById(id)
        .populate({    // have to populate interview as well
            path: 'interview',
        });

    return student;
}

//show all students
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

//edit students data
module.exports.edit = async function (req, res) {
    try {
        let student = await findStudent(req.params.id);

        if (student) {
            return res.render('update_student', {
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

//add a student
module.exports.add = async function (req, res) {
    if (req.isAuthenticated()) {
        return res.render('add_student', {
            title: 'Placement Cell | Add Students'
        });
    } else {
        req.flash('error', 'userToken expired. Please sign in again.');
        res.redirect('/users/sign-in');
    }
}

//create and push to db
module.exports.create = async function (req, res) {
    //check if user already exist
    let findStudent = await Student.findOne({ email: req.body.email });

    if (!findStudent) {
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
    } else {
        req.flash('warning', 'User already exists');
        res.redirect('back');
    }
}

//remove the student and assigned Interview
module.exports.remove = async function (req, res) {
    try {
        let student = await findStudent(req.params.id);

        console.log(student);

        if (!student) {
            req.flash("error", "Couldn't find student");
            return;
        }

        const interviewsAssigned = student.interview;

        // delete reference of student from enrolled company
        if (interviewsAssigned.length > 0) {
            for (let interview of interviewsAssigned) {
                await Interview.findOneAndUpdate(
                    { company_name: interview.company_name },
                    { $pull: { students: { student: req.params.id } } }
                );
            }
        }

        await Student.deleteOne({ _id: req.params.id });
        req.flash("success", "Student removed!");
        return res.redirect("back");

    } catch (err) {
        console.log(err);
    }

}