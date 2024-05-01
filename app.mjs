import './config.mjs'
import './db.mjs'

import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url';

import ejs from 'ejs';

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

// HBS
// app.set('view engine', 'hbs')

// HTML
app.set('view engine','html');
app.set('views', path.join(__dirname, 'views'));
app.engine('html',ejs.renderFile);

app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(express.json());

app.get('/', function(req,res){
    res.render('index');
})

app.get('/create', function(req,res){
    res.render('create');
})

app.post('/create', async function(req,res){
    console.log(req.body[0]);
    for(let i=0;i<req.body.length;i++){
        const newAttempt = new Attempt({
            lastDone: new Date(),
            sets: req.body[i].sets
        })

        const existingExercise = await Exercise.findOne({exerciseName:req.body[i].exerciseName});
        console.log(existingExercise);
        existingExercise.lastAttempt = newAttempt._id;
        existingExercise.attempts.unshift(newAttempt._id);
        existingExercise.markModified('lastAttempt');
        existingExercise.markModified('attempts');
        
        const savedAttempt = await newAttempt.save();
        const savedExercise = await existingExercise.save();
        console.log(savedAttempt);
        console.log(savedExercise);
    }
    res.redirect("/");
})

app.get('/exercises/', async function(req,res){
    try{
        // console.log(JSON.stringify(req.query.name));
        const foundExercises = await Exercise.find({exerciseName:req.query.name}).populate('lastAttempt').exec();
        if(foundExercises.length===0){
            const newExercise = new Exercise({
                exerciseName: req.query.name,
                lastAttempt: null,
            })

            const savedExercise = await newExercise.save();
            console.log(newExercise);
            // console.log(newExercise);
            // console.log(newExercise.lastAttempt === null);
            foundExercises.push(newExercise);
        }
        // console.log(foundExercises);
        res.json(foundExercises);
    }
    catch(e){
        console.log(e);
    }
})

app.get('/exercise-history', async function(req,res){
    try{
        const foundExercise = await Exercise.find({exerciseName:req.query.name}).populate('attempts').exec();
        console.log(foundExercise[0]);
        res.json(foundExercise[0]);
    }
    catch(e){
        console.log(e);
    }
})

app.listen(process.env.PORT || 3000);
