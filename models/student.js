const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    batch: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ["Placed", "Not Placed"],
        required: true,
    },
    courseScore: [],
    interview: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Interview'
        }
    ]
});


const Student = mongoose.model('Student', studentSchema);

module.exports = Student;