import User from '../models/User.js';
import Split from '../models/Split.js';
import Attempt from '../models/Attempt.js';
import asyncHandler from 'express-async-handler';

// @desc Get all attempts
// @route GET /attempts
// @access Private
const getAllAttempts = asyncHandler(async (req,res) => {
    const { exerciseID } = req.query;
    if(exerciseID){ // if specified exerciseID, look for all attempts of that Exercise
        const attempts = await Attempt.find({ 'exercise': exerciseID }).lean();
        if(!attempts?.length){
            return res.status(400).json({message:`No attempts with exerciseID ${exerciseID} found`});
        }
        res.json(attempts);
    }
    else { // if no specified exerciseID, just send back all attempts ever
        const attempts = await Attempt.find().lean();
        if(!attempts?.length){
            return res.status(400).json({message:`No attempts found`});
        }
        res.json(attempts);
    }
})

// @desc Create new attempt
// @route POST /attempts
// @access Private
const createNewAttempt = asyncHandler(async (req,res) => {
})

// @desc Update an attempt
// @route PATCH /attempts
// @access Private
const updateAttempt = asyncHandler(async (req,res) => {
})

// @desc Delete an attempt
// @route DELETE /attempts
// @access Private
const deleteAttempt = asyncHandler(async (req,res) => {
})

export default {
    getAllAttempts,
    createNewAttempt,
    updateAttempt,
    deleteAttempt
}
