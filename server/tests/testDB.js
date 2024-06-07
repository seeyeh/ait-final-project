import Exercise from '../models/Exercise.js'
import Attempt from '../models/Attempt.js'
import Workout from '../models/Workout.js'
import Template from '../models/Template.js'
import Split from '../models/Split.js'
import User from '../models/User.js'

import mongoose from 'mongoose'

export default async function testDB() {
    const user = await User.findOne({username: 'user1'});
    // const row = await user.getExerciseByName('db row');
    const workouts = await Workout.getUserWorkouts(user._id);
    
    console.log(workouts)
    // const attempt = new Attempt({ // new exercise
    //     name: 'Rows',
    //     exercise: row._id,
    //     sets: [
    //         {reps: 12, weight: 100},
    //         {reps: 12, weight: 110},
    //         {reps: 11, weight: 100}
    //     ]
    // });
    // const workout = new Workout({
    //     parentUser: user._id,
    //     activites: [attempt] 
    // })
    
    // console.log('==============\nUser 1\n==============\n', user);
    // workout.save(); // updates DB
    // console.log('--------------\nExercises\n--------------\n', await Exercise.find());
    // console.log('--------------\nWorkouts\n--------------\n', await Workout.find());
    // console.log('--------------\nSplits\n--------------\n', await Split.find());
    
}
