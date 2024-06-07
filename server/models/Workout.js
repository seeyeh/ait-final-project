import mongoose from 'mongoose'
import Attempt from './Attempt.js'

const WorkoutSchema = new mongoose.Schema({
    parentUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
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
        validate: {
            validator: v => v.length,
            message: 'Must contain at least one activity'
        }
    }, // an array of references to Exercise documents
    stats: Map,
    journal: String
})

/**
 * Queries workouts by user id
 * @param {ObjectId} uid 
 * @returns mongoose query for user
 */
WorkoutSchema.query.byUser = function(uid) {
    return this.where({parentUser: uid});
}

/**
 * 
 * @param {ObjectId} uid 
 * @returns promise resolving to user
 */
WorkoutSchema.statics.getUserWorkouts = function (uid) {
    return this.find({parentUser: uid});
}

export default mongoose.model('Workout', WorkoutSchema);;
