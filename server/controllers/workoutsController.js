import Exercise from '../models/Exercise.js';
import Attempt from '../models/Attempt.js';
import Workout from '../models/Workout.js';
import asyncHandler from 'express-async-handler';

const WorkoutSchemaFields = Object.freeze({
  _id: Symbol('_id'),
  parentUser: Symbol('parentUser'),
  name: Symbol('name'),
  date: Symbol('date'),
  activities: Symbol('activities'),
  stats: Symbol('stats'),
  journal: Symbol('journal')
});

const AttemptSchemaFields = Object.freeze({
  _id: Symbol('_id'),
  exercise: Symbol('exercise'),
  sets: Symbol('stats'),
  journal: Symbol('journal')
});

// @desc Get all workouts
// @route GET /workouts
// @access Private
const getWorkout = asyncHandler(async (req, res) => {
  const { parentUser } = req.query; // extract key/value pair of 'name' key from query string
  if (!parentUser) return res.status(400).json({ message: 'parentUser field required' });

  // check if all fields of query are valid
  for (let field in req.query) {
    if (field in WorkoutSchemaFields === false)
      return res.status(400).json({ message: `Invalid query field '${field}'` });
  }

  let workouts = await Workout.find(req.query).populate({ path: 'activities.exercise', select: 'name' }).exec();

  if (!workouts?.length) {
    return res.status(400).json({ message: `No workouts found` });
  }

  res.json(workouts);
});

// @desc Create new workout
// @route POST /workouts
// @access Private
const createNewWorkout = asyncHandler(async (req, res) => {
  const { parentUser, activities } = req.body;
  // Confirm data (parentUser and name required)
  if (!parentUser || !Array.isArray(activities) || activities.length === 0) {
    return res.status(400).json({ message: 'parentUser and activities array are required' });
  }
  // check if all fields of body are valid
  for (let field in req.body) {
    if (field in WorkoutSchemaFields === false)
      return res.status(400).json({ message: `Invalid input field '${field}'` });
  }

  // convert activities of request body into attempt schema
  let attempts = [];
  for (let activity of activities) {
    // activity must have exercise field and array of sets
    if (typeof activity !== 'object' || !activity.exercise || !activity.sets || !Array.isArray(activity.sets))
      return res.status(400).json({ message: `Invalid activities array` });
    for (let field in activity) {
      if (field in AttemptSchemaFields == false) return res.status(400).json({ message: `Invalid activities array` });
    }
    // get exercise id of activity by exercise name
    const exercise = await Exercise.findOne({ parentUser, name: activity.exercise }).select('_id').lean().exec();
    if (!exercise) res.status(400).json({ message: `Invalid activities array, exercise not found` });
    attempts.push(
      new Attempt({
        date: new Date(),
        exercise: exercise._id,
        sets: activity.sets,
        journal: activity.journal
      })
    );
  }
  // create and store new workout
  const workout = new Workout({
    ...req.body,
    activities: attempts
  });
  console.log(attempts);
  try {
    await workout.save();
    res.status(201).json({ message: `New workout ${workout.name} created` });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: `Invalid workout data received: ${err}` });
  }
});

// @desc Update an workout
// @route PATCH /workouts
// @access Private
const updateWorkout = asyncHandler(async (req, res) => {});

// @desc Delete an workout
// @route DELETE /workouts
// @access Private
const deleteWorkout = asyncHandler(async (req, res) => {});

export default {
  getWorkout,
  createNewWorkout,
  updateWorkout,
  deleteWorkout
};
