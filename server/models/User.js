import mongoose from 'mongoose'
import Split from './Split'
import Template from './Template'
import Workout from './Workout'
import Exercise from './Exercise'

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        match: /^\S*$/,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    exercises: [Exercise.schema],
    workouts: [Workout.schema],
    templates: [Template.schema],
    splits: [Split.schema],
    stats: Map
});

export default mongoose.model('User', UserSchema);
