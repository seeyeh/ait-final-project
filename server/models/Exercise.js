import mongoose from 'mongoose'
import Attempt from './Attempt.js'

const ExerciseSchema = new mongoose.Schema({
    parentUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        get: str => str.charAt(0).toUpperCase() + str.slice(1)  // gets capitalized, ex. push-ups -> Push-ups
    },
    description: String,
    notes: [String],
    video: String,
    photos: [String],
    substitutions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise'
    }],
    history: [Attempt.schema]
})

export default mongoose.model('Exercise', ExerciseSchema);;
