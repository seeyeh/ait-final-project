import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/workoutdb');

const User = new mongoose.Schema({
	name: String,
});

const Workout = new mongoose.Schema({
    user: //
    name: "Pull Day",
    date: // date
    exercises: // an array of references to Exercise documents
})



// "register" it so that mongoose knows about it
mongoose.model('Cat', Cat);