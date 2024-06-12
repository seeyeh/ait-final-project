import User from '../models/User.js';
import Attempt from '../models/Attempt.js';
import asyncHandler from 'express-async-handler';
import Exercise from '../models/Exercise.js';

// @desc Get a specific exercise by quering through name or get ALL exercises
// @route GET /exercises
// @access Private
const getExercise = asyncHandler(async (req,res) => {
    const { parentUser } = req.query; // extract key/value pair of 'name' key from query string
    
    if(!parentUser) return res.status(400).json({ message: 'parentUser field required'});
    const exercise = await Exercise.find(req.query).lean();
    if(!exercise?.length){
        return res.status(400).json({ message: `No exercise found`});
    }
    res.json(exercise);
})

// @desc Create new exercise
// @route POST /exercises
// @access Private
const createNewExercise = asyncHandler(async (req,res) => {
    let exerciseParams = req.body;
    const { parentUser, name } = exerciseParams;
    // Confirm data (parentUser and name required)
    if(!parentUser || !name) {
        return res.status(400).json({ message: 'parentUser and name fields are required'});
    }
    // Check for duplicates
    const duplicate = await Exercise.findOne({ parentUser, name }).lean().exec();
    if(duplicate){ // if an exercise already exists with the same name
        return res.status(409).json({ message: 'Duplicate exercise name'});
    }

    if(exerciseParams.substitutions) {
        exerciseParams.substitutions = await Promise.all(exerciseParams.substitutions.map(
            async (subName) => {
                return Exercise.findOne({ parentUser, 'name': subName }).select("_id");
            }
        ))         
        console.log(exerciseParams.substitutions);
        exerciseParams.substitutions = exerciseParams.substitutions.filter(e => e);
        // exerciseParams.substitutions = exerciseParams.substitutions.map(e => e._id);
    }

    // // Create and store new exercise
    const exercise = new Exercise(exerciseParams);
    try {
        await exercise.save();
        res.status(201).json({ message: `New exercise ${name} created`})
    } catch( err ) {
        console.log(err)
        res.status(400).json({ message: 'Invalid exercise data received'});
    }
})

// @desc Update an exercise
// @route PATCH /exercises
// @access Private
const updateExercise = asyncHandler(async (req,res) => {
})

// @desc Delete an exercise
// @route DELETE /exercises
// @access Private
const deleteExercise = asyncHandler(async (req,res) => {
})

export default {
    getExercise,
    createNewExercise,
    updateExercise,
    deleteExercise
}