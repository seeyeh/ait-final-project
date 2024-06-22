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

  // populate activities with exercise names
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
    const { result, error } = createAttempt(parentUser, activity);
    if (error) return res.status(400).json({ message: `Invalid activities array: '${error}'` });
    attempts.push(result);
  }
  // create and store new workout document
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
const updateWorkout = asyncHandler(async (req, res) => {
  const { parentUser, id, patches } = req.body;
  // Confirm data (parentUser and name required)
  if (!parentUser || !id) return res.status(400).json({ message: 'parentUser and workout id fields are required' });

  // get workout to patch
  const workout = await Workout.findOne({ parentUser, _id: id }).exec();
  if (!workout) return res.status(400).json({ message: `No workout found` });

  let completedPatches = 0;
  for (let patch of patches) {
    const { path, op, value } = patch;
    if (path in WorkoutSchemaFields === false || path === '_id' || path === 'parentUser' || path === 'date')
      return res.status(400).json({ message: `Invalid patch path` });

    const { result, error } = await patchWorkout(workout, parentUser, op, path, value);
    if (error) return res.status(400).json({ message: `Error (${completedPatches} completed): ${error}` });
    workout[path] = result;
    await workout.save();
    completedPatches++;
  }

  workout.save();
  res.json({ message: `Successfully patched ${workout.name}` });
});

// @desc Delete an workout
// @route DELETE /workouts
// @access Private
const deleteWorkout = asyncHandler(async (req, res) => {});

async function patchWorkout(workout, parentUser, op, path, value) {
  const isIterablePath = Array.isArray(workout[path]) || workout[path] instanceof Map;
  switch (op) {
    case 'add':
      // validation: add operation must add to an iterable
      if (!isIterablePath) return { error: `Invalid patch path, must be iterable` };

      if (path === 'stats') {
        if (!value.key || !value.value) return { error: `Invalid patch value for stats: key, value fields required` };
        workout[path].set(value.key, value.value);
      } else {
        // path === 'activities'
        const { result, error } = await createAttempt(parentUser, value, workout);
        console.log(error);
        if (error) return { error: `Invalid patch value: ${error}` };
        workout[path].push(result);
      }
      break;

    case 'remove':
      if (!isIterablePath) return { error: `Invalid patch path, must be iterable` };
      if (path === 'stats') {
        if (!value.key || !workout[path].has(value.key))
          return { error: `Invalid patch value for stats: key in stats required` };
        workout[path].delete(value);
      } else {
        // path === 'activities'
        const { result, error } = await removeAttempt(parentUser, value, workout);
        if (error) return { error: `Invalid patch value for activities: ${error}` };
        workout[path].splice(result, 1);
      }
      break;

    // replace operation for non-array fields (name, desc, video) except parentUser
    case 'replace':
      // validation: replace operation cannot be used on arrays and value must be string
      if (isIterablePath) return { error: `Invalid patch path, cannot replace an iterable` };
      if (typeof value !== 'string') return { error: `Invalid patch value, must be a string` };
      workout[path] = value;
      break;
    default:
      return { error: `Invalid patch operation` };
  }
  return { result: workout[path] };
}

async function createAttempt(parentUser, activity, workout) {
  if (typeof activity !== 'object' || !activity.exercise || !activity.sets || !Array.isArray(activity.sets))
    return { error: `Invalid activity` };
  for (let field in activity) {
    if (field in AttemptSchemaFields == false) return { error: `Invalid activity` };
  }
  // get exercise id of activity by exercise name
  const exercise = await Exercise.findOne({ parentUser, name: activity.exercise }).exec();
  if (!exercise) return { error: `Invalid activity, exercise not found` };

  const newAttempt = new Attempt({
    date: workout.date ?? new Date(),
    exercise: exercise._id,
    sets: activity.sets,
    journal: activity.journal
  });
  // store new attempt in exercise document
  exercise.history.push(newAttempt);
  exercise.save();
  return { result: newAttempt };
}

async function removeAttempt(parentUser, activityId, workout) {
  let activityIndex = workout.activities.map((activity) => activity._id.toString()).indexOf(activityId);
  if (activityIndex === -1) return { error: `Activity not found` };

  let activity = workout.activities[activityIndex];
  console.log(activity.exercise);
  const exercise = await Exercise.findOne({ parentUser, _id: activity.exercise }).exec();
  if (!exercise) return { error: `Error: exercise not found` };
  exercise.history = exercise.history.filter((activity) => activity._id.toString() !== activityId);
  exercise.save();

  return { result: activityIndex };
}
export default {
  getWorkout,
  createNewWorkout,
  updateWorkout,
  deleteWorkout
};
