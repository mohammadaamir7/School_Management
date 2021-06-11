const mongoose = require('mongoose')

const attendanceSchema = new mongoose.Schema({
    date: { type: String, required: true },
    section: { type: String, required: true },
    Sclass: { type: String, required: true },
    
    presentStudents: [{
        admin_no: { type: String, required: true },
        name: { type: String, required: true }
    }],

    absentStudents: [{
        admin_no: { type: String, required: true },
        name: { type: String, required: true }
    }]
    
    },
    {
        timestamps: true
    }
)

const attendance = mongoose.model('attendance', attendanceSchema)
module.exports = attendance