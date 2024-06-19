import mongoose from 'mongoose';
import Split from './Split.js';
import Template from './Template.js';
import Workout from './Workout.js';
import Exercise from './Exercise.js';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    match: /^\S*$/ // no whitespace
  },
  password: {
    type: String,
    required: true,
    trim: true,
    match: /^\S*$/ // no whitespace
  },
  stats: Map
});

/**
 * Search for user's templates by template name
 *
 * @param {String} name
 * @returns promise resolving to template document
 */
UserSchema.methods.getTemplateByName = function (name) {
  return Template.findOne({ parentUser: this._id, name: name });
};

/**
 * Search for user's splits by split name
 *
 * @param {String} name
 * @returns promise resolving to split document
 */
UserSchema.methods.getSplitByName = function (name) {
  return Split.findOne({ parentUser: this._id, name: name });
};

/**
 * Search for user's exercises by exercise name
 *
 * @param {String} name
 * @returns promise resolving to exercise document
 */
UserSchema.methods.getExerciseByName = function (name) {
  return Exercise.findOne({ parentUser: this._id, name: name });
};

/**
 * Search for user's workouts by workout name
 *
 * @param {String} name
 * @returns promise resolving to workout document
 */
UserSchema.methods.getWorkoutByName = function (name) {
  return Workout.findOne({ parentUser: this._id, name: name });
};

/**
 * Creates and saves workout to DB
 * @param {Array<Attempt>} attempts
 * @param {String} [name]
 * @param {String} [journal]
 */
UserSchema.methods.createAndSaveWorkout = function (attempts, name, journal) {
  const workout = new Workout({
    parentUser: user._id,
    activites: attempts,
    name: name,
    journal: journal
  });

  workout.save();
};

export default mongoose.model('User', UserSchema);
