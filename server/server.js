import './config/config.js'
import connectDB from './config/db.js'

// schemas are registered inside independent files
import Exercise from './models/Exercise.js'
import Attempt from './models/Attempt.js'
import Workout from './models/Workout.js'
import Template from './models/Template.js'
import Split from './models/Split.js'
import User from './models/User.js'

import Express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url';

const app = Express();                      // actual server object
const PORT = process.env.PORT || 5001    

const __filename = fileURLToPath(import.meta.url);      // gets filename of server.js manually (es module)
const __dirname = path.dirname(__filename);             // gets parent directory of server.js (es module)

connectDB();

// app.use('/', Express.static(path.join(__dirname, '/public')));  // look in public directory for static files

app.get('/test', async (req, res) => {
    try{
        const foundExercise = await Exercise.find({exerciseName:'Pull Ups'}).populate('attempts').exec();
        res.json(foundExercise[0]);
    }
    catch(e){
        console.log(e);
    }
})

mongoose.connection.once('open', ()=>{
    console.log('Connected to MongoDB');
    app.listen(5001, ()=> {
        console.log('Server running on port 5001')
    });
})

mongoose.connection.on('error', (err) => {
    console.log(err);
})
