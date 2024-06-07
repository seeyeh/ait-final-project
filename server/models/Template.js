import mongoose from 'mongoose'

const TemplateSchema = new mongoose.Schema({
    parentUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        // unique: true,
        default: "My Workout Template"
    },
    description: String,
    exercises: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Exercise'
        }],
        validate: {
            validator: v => v.length,
            message: 'Must contain at least one exercise'
        }
    }
});

export default mongoose.model('Template', TemplateSchema);
