const passport = require('passport');
const Student = require('../models/student');
const Interview = require('../models/interview');

module.exports.home = async function (request, response) {
    if (request.isAuthenticated()) {

        let students = await Student.find({});
        let interviews = await Interview.find({});

        return response.render('home', {
            title: "Placement Cell | Home",
            students: students,
            interviews: interviews
        });

    } else {
        return response.redirect('/users/sign-in');
    }
}