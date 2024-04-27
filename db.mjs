import mongoose from 'mongoose'
import './config.mjs'

mongoose.connect(process.env.DSN);

// const User = new mongoose.Schema({
// 	name: String,
// });


const AttemptSchema = new mongoose.Schema({
    // fromWorkout: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Workout'
    // },
    lastDone: Date,
    sets: []
})

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

const WorkoutSchema = new mongoose.Schema({
    workoutName: String, //
    lastDone: Date,
    exercises: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise'
    }] // an array of references to Exercise documents
})

// "register" it so that mongoose knows about it
mongoose.model('Workout', WorkoutSchema);
mongoose.model('Exercise', ExerciseSchema);
mongoose.model('Attempt', AttemptSchema);