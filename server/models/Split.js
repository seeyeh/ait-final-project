import mongoose from 'mongoose'

const SplitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        default: "My Workout Split"
    },
    description: String,
    templates: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true
    }
});

export default mongoose.model('Split', SplitSchema);
