const mongoose = require('mongoose')

const gradeSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        totalMarks: { type: Number, required: true },
        obtainedMarks: { type: Number, required: true },
        student_id: { type: String, required: true },
        student_admin_no: { type: String, required: true },
        student_name: { type: String, required: true },
        percentage: { type: String, required: true },
        testGrade: { type: String, required: true },
    },
    {
        timestamps: true
    }
)

const grade = mongoose.model('grade', gradeSchema)
module.exports = grade