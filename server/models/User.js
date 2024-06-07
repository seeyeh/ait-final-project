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
        match: /^\S*$/,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    exerciseNames: [String],
    templateNames: [String],
    splitNames: [String],
    stats: Map
});

UserSchema.methods.getTemplateByName = function (name) {
    return Template.findOne({parentUser: this._id, name: name});
}

UserSchema.methods.getSplitByName = function (name) {
    return Split.findOne({parentUser: this._id, name: name});
}

UserSchema.methods.getExerciseByName = function (name) {
    return Exercise.findOne({parentUser: this._id, name: name});
}

UserSchema.methods.getWorkoutByName = function (name) {
    return Workout.findOne({parentUser: this._id, name: name});
}

UserSchema.methods.createTemplate = async function(name, exercises = [], desc) {
    const newName = name.trim();
    if(this.templateNames.includes(newName))
        throw new Error(`Template ${newName} already exists`);
    
    return new Template({
        parentUser: this._id,
        name: newName,
        description: desc,
        exercises: exercises.map(exercise => exercise._id)
    });
}

UserSchema.methods.createSplit = function(name, templates = [], desc) {
    const newName = name.trim(); 
    if(this.splitNames.includes(newName))
        throw new Error(`Split ${newName} already exists`);

    return new Split({
        parentUser: this._id,
        name: newName,
        description: desc,
        templates: templates.map(template => template._id)
    });
}

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

UserSchema.methods.saveTemplate = async function(template) {
    try {
        await template.save();
        this.templateNames.push(template.name);
    } catch (err) {
        console.error(err);
    }
}

UserSchema.methods.saveSplit = async function(split) {
    try {
        await split.save();
        this.splitNames.push(split.name);
    } catch (err) {
        console.error(err);
    }
}

UserSchema.methods.saveExercise = async function(exercise) {
    try {
        await exercise.save();
        this.exerciseNames.push(exercise.name);
    } catch (err) {
        console.error(err);
    }
}

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
