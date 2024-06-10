import User from '../models/User.js';
import Split from '../models/Split.js';
import Attempt from '../models/Attempt.js';
import asyncHandler from 'express-async-handler';

// @desc Get all attempts
// @route GET /attempts
// @access Private
const getAllAttempts = asyncHandler(async (req,res) => {
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
