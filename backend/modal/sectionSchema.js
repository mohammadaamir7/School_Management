const mongoose = require('mongoose')

const sectionSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        teacher: { type: String, required: true },
        class_id: { type: String, required: true },
        classTitle: { type: String, required: true }
    },
    {
        timestamps: true
    }
)

const section = mongoose.model('section', sectionSchema)
module.exports = section