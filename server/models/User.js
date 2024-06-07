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
    exercises: [Exercise.schema],
    workouts: [Workout.schema],
    templates: [Template.schema],
    splits: [Split.schema],
    stats: Map
});

UserSchema.methods.getTemplateByName = function (name) {
    return this.templates.find(template => template.name == name);
}

UserSchema.methods.addExerciseToTemplate = function (exerciseId, templateName) {
    const template = this.getTemplateByName(templateName);
    if(!template) throw new Error(`Template ${templateName} not found`);
    template.exercises.push(exerciseId);
}

UserSchema.methods.getSplitByName = function (name) {
    return this.splits.find(split => split.name === name);
}

UserSchema.methods.addTemplateToSplit = function (templateId, splitName) {
    const split = this.getSplitByName(splitName);
    if(!split) throw new Error(`Split ${splitName} not found`);
    split.templates.push(templateId);
}


export default mongoose.model('User', UserSchema);
