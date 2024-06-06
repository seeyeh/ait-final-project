import mongoose from 'mongoose'
import Attempt from './Attempt'

const WorkoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        default: ()=> {
            const day = new Date();
            return `${day.getMonth()}/${day.getDate()} Workout`
        }
    },
    date: {
        type: Date,
        immutable: true,
        default: ()=> Date.now()
    },
    activites: {
        type: [Attempt.schema],
        required: true,
        immutable: true,
    }, // an array of references to Exercise documents
    stats: Map,
    journal: String
})

export default mongoose.model('Workout', WorkoutSchema);;
