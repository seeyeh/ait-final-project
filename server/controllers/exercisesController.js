import User from '../models/User.js';
import Attempt from '../models/Attempt.js';
import asyncHandler from 'express-async-handler';
import Exercise from '../models/Exercise.js';

// @desc Get a specific exercise by quering through name or get ALL exercises
// @route GET /exercises
// @access Private
const getExercise = asyncHandler(async (req,res) => {
    const { name } = req.query; // extract key/value pair of 'name' key from query string
    if(name){
        const exercise = await Exercise.find({ 'name': name }).lean();
        if(!exercise?.length){
            return res.status(400).json({ message: `No exercise found`});
        }
        res.json(exercise);
    }
    else{
        const exercise = await Exercise.find({}).lean();
        if(!exercise?.length){
            return res.status(400).json({ message: `No exercise found`});
        }
        res.json(exercise);
    }
})

// @desc Create new exercise
// @route POST /exercises
// @access Private
const createNewExercise = asyncHandler(async (req,res) => {
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