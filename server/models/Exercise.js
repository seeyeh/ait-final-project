import mongoose from 'mongoose'

const ExerciseSchema = new mongoose.Schema({
    exerciseName: String,
    lastAttempt: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attempt'
    },
    attempts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attempt'
    }]
})

export default mongoose.model('Exercise', ExerciseSchema);;
