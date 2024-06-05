import mongoose from 'mongoose'

const WorkoutSchema = new mongoose.Schema({
    workoutName: String, //
    lastDone: Date,
    exercises: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise'
    }] // an array of references to Exercise documents
})

export default mongoose.model('Workout', WorkoutSchema);;
