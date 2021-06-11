const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        admin_no: { type: String, required: true },
        phone: { type: Number, required: true },
        email: { type: String, required: true },
        studentClass: { type: String, required: true },
        section: { type: String, required: true },
        roll_no: { type: String, required: true },
        father_name: { type: String, required: true },
        father_num: { type: Number, required: true },
        login_email: { type: String, required: true }
    },
    {
        timestamps: true
    }
)

const student = mongoose.model('student', studentSchema)
module.exports = student