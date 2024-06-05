import './config.js'
import './db.js'

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


app.get('/test', async (req, res) => {
    try{
        const foundExercise = await Exercise.find({exerciseName:'Pull Ups'}).populate('attempts').exec();
        res.json(foundExercise[0]);
    }
    catch(e){
        console.log(e);
    }
})

app.listen(5001, ()=> {
    console.log('Server running on port 5001')
})
