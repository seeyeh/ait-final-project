import './config.mjs'
import './db.mjs'

import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const Attempt = mongoose.model('Attempt');
const Exercise = mongoose.model('Exercise');
const Workout = mongoose.model('Workout');

// const newExercise = new Exercise({
//     exerciseName: "Bench Press",
//     lastDone: "",
//     attempts: []
// })

// const newWorkout = new Workout({
//     workoutName: "Push Day",
//     lastDone: "",
//     exercises: []
// })

// const newAttempt = new Attempt({
//     fromWorkout: newWorkout._id,
//     lastDone: Date.now(),
//     sets: [{weight: 10, reps: 12},{weight: 10, reps: 11}]
// })

// newExercise.attempts.push(newAttempt._id);
// newWorkout.exercises.push(newExercise._id);

// newAttempt.save();

// newExercise.save();

// newWorkout.save();

const workouts = [
    {title: "Pull Day", date: "23.4.2023"},
    {title: "Push Day", date: "11.5.2023"},
    {title: "Leg Day", date: "20.6.2023"}
]

const exercises = [
    {title: "benchPress", bestWeight: 125},
    {title: "pullUps", bestWeight: 15},
    {title: "squat", bestWeight: 225},
    {title: "deadlift", bestWeight: 115}
]

app.set('view engine', 'hbs');

app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

app.get('/', function(req,res){
    res.render('index',{'workouts':workouts});
})

app.get('/create', function(req,res){
    res.render('create',{'exercises':exercises});
})

app.post('/create', function(req,res){
    console.log(req.body);
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let fullDate = day + "." + month + "." + year;
    workouts.unshift({title: req.body.title, date: fullDate});
    res.redirect("/");
})

app.get('/exercises/', async function(req,res){
    try{
        // console.log(JSON.stringify(req.query.name));
        const foundExercises = await Exercise.find({exerciseName:req.query.name}).populate('lastAttempt').exec();
        // console.log(foundExercises);
        res.json(foundExercises);
    }
    catch(e){
        console.log(e);
    }
})

app.listen(process.env.PORT || 3000);
