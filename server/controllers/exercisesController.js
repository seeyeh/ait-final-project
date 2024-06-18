import User from '../models/User.js';
import Attempt from '../models/Attempt.js';
import asyncHandler from 'express-async-handler';
import Exercise from '../models/Exercise.js';
import mongoose from 'mongoose'
const { ObjectId } = mongoose.Types;

const ExerciseSchemaFields = Object.freeze({
    _id:            Symbol("_id"),
    parentUser:     Symbol('parentUser'),
    name:           Symbol('name'),
    description:    Symbol('description'),
    notes:          Symbol('notes'),
    video:          Symbol('video'),
    photos:         Symbol('photos'),
    substitutions:  Symbol('substitutions'),
    history:        Symbol('history'),
    stats:          Symbol('stats'),
})
// @desc Get a specific exercise by quering through name or get ALL exercises
// @route GET /exercises
// @access Private
const getExercise = asyncHandler(async (req,res) => {
    const { parentUser } = req.query; // extract key/value pair of 'name' key from query string
    if(!parentUser) return res.status(400).json({ message: 'parentUser field required'});

    // check if all fields of query are valid
    for(let field in req.query) {
        if(field in ExerciseSchemaFields === false) return res.status(400).json({ message: `Invalid query field '${field}'`});
    }

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
    // check if all fields of body are valid
    for(let field in req.body) {
        if(field in ExerciseSchemaFields === false) return res.status(400).json({ message: `Invalid request field '${field}'`});
    }

    // Check for duplicates
    const duplicate = await Exercise.findOne({ parentUser, name }).lean().exec();
    if(duplicate){ // if an exercise already exists with the same name
        return res.status(409).json({ message: 'Duplicate exercise name'});
    }

    if(exerciseParams.substitutions) {
        exerciseParams.substitutions = await Promise.all(exerciseParams.substitutions.map(
            async (subName) => {
                return Exercise.findOne({ parentUser, 'name': subName }).select('_id');
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

    // req.body: {parentUser, name, [patches]}
    // patch: {op, path, value} - add, remove, replace, test

    const { parentUser, name, patches} = req.body;
    // Confirm data (parentUser and name required)
    if(!parentUser || !name) return res.status(400).json({ message: 'parentUser and exercise name fields are required'});

    // get exercise to patch
    const exercise = await Exercise.findOne({parentUser, name});
    if(!exercise) return res.status(400).json({ message: `No exercise found`});

    for(let patch of patches) {
        const {path, op} = patch;
        if(path in ExerciseSchemaFields === false || path === 'history') return res.status(400).json({ message: `Invalid patch path`});

        const {result, error} = await patchExercise(exercise, parentUser, op, path, patch.value);
        if(error) return res.status(400).json({ message: error});
        exercise[path] = result;
    }

    exercise.save();
    res.json({message: `Successfully patched ${name}`})
})

// @desc Delete an exercise
// @route DELETE /exercises
// @access Private
const deleteExercise = asyncHandler(async (req,res) => {
    const { parentUser, name } = req.body;
    // Confirm data (parentUser and name required)
    if(!parentUser || !name) {
        return res.status(400).json({ message: 'parentUser and exercise name fields are required'});
    }

    const exercise = await Exercise.findOne({parentUser, name});
    if(!exercise){
        return res.status(400).json({ message: `No exercise found`});
    }

    const result = await exercise.deleteOne();
    res.json({message: `Exercise ${name} deleted`});
})

async function patchExercise(exercise, parentUser, op, path, value) {
    switch(op) {
        // add operation for array fields (subs, notes, photos) except history
        case 'add':
            // validation: add operation must add string to an array
            if(!Array.isArray(exercise[path])) return {error: `Invalid patch path, must be an array`};
            if(typeof value !== 'string') return {error: `Invalid patch path, must be an array`};

            if(path === 'substitutions') {
                const subId = await Exercise.findOne({parentUser, name: value}).select('_id');

                if(!subId) return {error: `Invalid patch value, substitution not found`};
                if(exercise[path].includes(new ObjectId(subId))) return {error: `Invalid patch value, duplicate substitution`};

                exercise[path].push(subId);
            } else {
                exercise[path].push(value);
            }
            break;
        case 'remove':
            // validation: remove operation must add string to an array
            if(!Array.isArray(exercise[path])) return {error: `Invalid patch path, must be an array`};
            if(typeof value !== 'string') return {error: `Invalid patch value, must be a string`};

            if(path === 'substitutions') {
                const subId = await Exercise.findOne({parentUser, name: value}).select('_id');
                if(!subId) return {error: `Invalid patch value, substitution exercise not found`};

                const subIndex = exercise[path].indexOf(new ObjectId(subId));
                if(subIndex == -1) return {error: `Invalid patch value, value is not a substitution`};
                exercise[path].splice(subIndex, 1);

            } else {
                const index = exercise[path].indexOf(value);
                if(index == -1) return {error: `Invalid patch value, value not found`};
                exercise[path].splice(index, 1);
            }
            break;
        case 'replace':
            break;
        case 'test':
            break;
        default:
            return {error: `Invalid patch operation`};
    }
    return {result: exercise[path]};
}

export default {
    getExercise,
    createNewExercise,
    updateExercise,
    deleteExercise
}
