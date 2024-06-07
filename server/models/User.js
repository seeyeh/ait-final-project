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

UserSchema.methods.createTemplate = function(name, desc, exercises) {
    const newName = name.trim();
    if(this.templateNames.includes(newName))
        throw new Error(`Template ${newName} already exists`);
    
    const newTemplate = new Template({
        parentUser: this._id,
        name: newName,
        description: desc,
        exercises: exercises.map(exercise => exercise._id)
    });

    this.templateNames.push(newName);
    newTemplate.save();
}

UserSchema.methods.createSplit = function(name, desc, templates) {
    const newName = name.trim(); 
    if(this.splitNames.includes(newName))
        throw new Error(`Split ${newName} already exists`);
    const newSplit = new Split({
        parentUser: this._id,
        name: newName,
        description: desc,
        templates: templates.map(template => template._id)
    });

    this.splitNames.push(newName);
    newSplit.save();
}

UserSchema.methods.createExercise = function(name, desc, notes, video, photos, substitutions) {
    const newName = name.trim().toLowerCase();
    if(this.exerciseNames.includes(newName))
        throw new Error(`Exercise ${name.trim()} already exists`);
    
    const newExercise = new Exercise({
        parentUser: this._id,
        name: newName,
        description: desc,
        notes: notes,
        video: video,
        photos: photos,
        substitutions: substitutions.map(exercise => exercise._id)
    });

    this.exerciseNames.push(newName);
    newExercise.save();
}

// UserSchema.methods.addExerciseToTemplate = function (exerciseId, templateName) {
//     const template = this.getTemplateByName(templateName);
//     if(!template) throw new Error(`Template ${templateName} not found`);
//     template.exercises.push(exerciseId);
// }

// UserSchema.methods.addTemplateToSplit = function (templateId, splitName) {
//     const split = this.getSplitByName(splitName);
//     if(!split) throw new Error(`Split ${splitName} not found`);
//     split.templates.push(templateId);
// }




export default mongoose.model('User', UserSchema);
