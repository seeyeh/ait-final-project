import mongoose from 'mongoose'

const SplitSchema = new mongoose.Schema({
    parentUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        default: "My Workout Split"
    },
    description: String,
    templates: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Template'
        }],
        validate: {
            validator: v => v.length,
            message: 'Must contain at least one template'
        }
    }
});

export default mongoose.model('Split', SplitSchema);
