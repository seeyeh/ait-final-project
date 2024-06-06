import mongoose from 'mongoose'

const TemplateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        default: "My Workout Template"
    },
    description: String,
    exercises: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attempt'
    }]

});

export default mongoose.model('Template', TemplateSchema);
