const mongoose = require('mongoose')

const classSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        incharge: { type: String, required: true }
    },
    {
        timestamps: true
    }
)

const classData = mongoose.model('classData', classSchema)
module.exports = classData