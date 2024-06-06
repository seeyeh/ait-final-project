import mongoose from 'mongoose'
import Attempt from './Attempt'

const ExerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
        get: str => str.charAt(0).toUpperCase() + str.slice(1)  // gets capitalized, ex. push-ups -> Push-ups
    },
    description: String,
    notes: [String],
    video: String,
    photos: [String],
    substitutions: [mongoose.Schema.Types.ObjectId],
    history: [Attempt],
    stats: Map
})

export default mongoose.model('Exercise', ExerciseSchema);;
