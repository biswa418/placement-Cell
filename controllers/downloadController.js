const Student = require("../models/student");
const fs = require("fs");
const path = require("path");

module.exports.downloadReport = async function (req, res) {
    try {
        const Students = await Student.find({}).populate('interview');
        let report =
            "Student name, Student email, Student status, DSA Final Score, WebD Final Score, React Final Score, Interview date, Interview company, Interview result";
        let studentData1 = "";

        for (let student of Students) {
            studentData1 =
                student.name +
                "," +
                student.email +
                "," +
                student.status +
                "," +
                student.courseScore[0] +
                "," +
                student.courseScore[1] +
                "," +
                student.courseScore[2];

            if (student.interview.length > 0) {
                for (let interview of student.interview) {
                    let studentData2 = "";
                    studentData2 +=
                        "," +
                        interview.date.toString() +
                        "," +
                        interview.company_name +
                        "," +
                        interview.students.result;
                    report += "\n" + studentData1 + studentData2;
                }
            } else {
                report += "\n" + studentData1;
            }
        }

        fs.writeFileSync("./uploads/report.csv", report);

        req.flash("success", "Downloaded CSV report!");
        return res.download("./uploads/report.csv");
    }

    catch (err) {
        console.log(err);
    }
}