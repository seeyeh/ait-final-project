import User from '../models/User.js';
import Attempt from '../models/Attempt.js';
import asyncHandler from 'express-async-handler';

// @desc Get a specific exercise by quering through name or get ALL exercises
// @route GET /exercises
// @access Private
const getExercise = asyncHandler(async (req,res) => {
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