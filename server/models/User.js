import mongoose from 'mongoose'
import Split from './Split.js'
import Template from './Template.js'
import Workout from './Workout.js'
import Exercise from './Exercise.js'

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        match: /^\S*$/,     // no whitespace
    },
    password: {
        type: String,
        required: true,
        trim: true,
        match: /^\S*$/,     // no whitespace
    },
    exerciseNames: [String],
    templateNames: [String],
    splitNames: [String],
    stats: Map
});

/**
 * Search for user's templates by template name
 * 
 * @param {String} name
 * @returns promise resolving to template document
 */
UserSchema.methods.getTemplateByName = function (name) {
    return Template.findOne({parentUser: this._id, name: name});
}

/**
 * Search for user's splits by split name
 * 
 * @param {String} name
 * @returns promise resolving to split document
 */
UserSchema.methods.getSplitByName = function (name) {
    return Split.findOne({parentUser: this._id, name: name});
}

/**
 * Search for user's exercises by exercise name
 * 
 * @param {String} name
 * @returns promise resolving to exercise document
 */
UserSchema.methods.getExerciseByName = function (name) {
    return Exercise.findOne({parentUser: this._id, name: name});
}

/**
 * Search for user's workouts by workout name
 * 
 * @param {String} name
 * @returns promise resolving to workout document
 */
UserSchema.methods.getWorkoutByName = function (name) {
    return Workout.findOne({parentUser: this._id, name: name});
}

/**
 * Creates a new template under parent user
 * 
 * @param {String} name
 * @param {Array<Exercise>} [exercises] 
 * @param {String} [desc]
 * @returns new template document
 */
UserSchema.methods.createTemplate = async function(name, exercises = [], desc) {
    const newName = name.trim();
    if(this.templateNames.includes(newName))    // template names must be unique
        throw new Error(`Template ${newName} already exists`);
    
    return new Template({
        parentUser: this._id,
        name: newName,
        description: desc,
        exercises: exercises.map(exercise => exercise._id)
    });
}

/**
 * Creates a new split under parent user
 * 
 * @param {String} name
 * @param {Array<Template>} [templates]
 * @param {String} [desc]
 * @returns new split document
 */
UserSchema.methods.createSplit = function(name, templates = [], desc) {
    const newName = name.trim(); 
    if(this.splitNames.includes(newName))       // split names must be unique
        throw new Error(`Split ${newName} already exists`);

    return new Split({
        parentUser: this._id,
        name: newName,
        description: desc,
        templates: templates.map(template => template._id)
    });
}

/**
 * Creates a new exercise under parent user
 * 
 * @param {String} name
 * @param {String} [desc]
 * @param {Array<String>} [notes]
 * @param {String} [video] video URL
 * @param {Array<String>} [photos] photo URLs
 * @param {Array<Exercise>} [substitutions] 
 * @returns new exercise document
 */
UserSchema.methods.createExercise = function(name, desc, notes, video, photos, substitutions = []) {
    const newName = name.trim().toLowerCase();
    if(this.exerciseNames.includes(newName))
        throw new Error(`Exercise ${name.trim()} already exists`);
    
    return new Exercise({
        parentUser: this._id,
        name: newName,
        description: desc,
        notes: notes,
        video: video,
        photos: photos,
        substitutions: substitutions.map(exercise => exercise._id)
    });
}

/**
 * Saves template to DB, adds to user template names
 * @param {Template} template 
 */
UserSchema.methods.saveTemplate = async function(template) {
    try {
        await template.save();
        this.templateNames.push(template.name);
    } catch (err) {
        console.error(err);
    }
}

/**
 * Saves split to DB, adds to user split names
 * @param {Split} split 
 */
UserSchema.methods.saveSplit = async function(split) {
    try {
        await split.save();
        this.splitNames.push(split.name);
    } catch (err) {
        console.error(err);
    }
}

/**
 * Saves exercise to DB, adds to user exercise names
 * @param {Exercise} exercise 
 */
UserSchema.methods.saveExercise = async function(exercise) {
    // try {
        await exercise.save();
        this.exerciseNames.push(exercise.name);
    // } catch (err) {
    //     console.error(err);
    // }
}

/**
 * Creates and saves workout to DB
 * @param {Array<Attempt>} attempts 
 * @param {String} [name] 
 * @param {String} [journal] 
 */
UserSchema.methods.createAndSaveWorkout = function(attempts, name, journal) {
    const workout = new Workout({
        parentUser: user._id,
        activites: attempts,
        name: name,
        journal: journal
    });

    workout.save();
}


export default mongoose.model('User', UserSchema);
