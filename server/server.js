import './config/config.js'
import connectDB from './config/db.js'
import testDB from './tests/testDB.js'

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
import router from './routes/root.js';
import usersRouter from './routes/userRoutes.js'
import { logger } from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import corsOptions from './config/corsOptions.js';

const app = Express();                      // actual server object
const PORT = process.env.PORT || 5001    

const __filename = fileURLToPath(import.meta.url);      // gets filename of server.js manually (es module)
const __dirname = path.dirname(__filename);             // gets parent directory of server.js (es module)


// MIDDLEWARE

// app.use(express.urlencoded({extended: false}));

app.use(logger);

app.use(Express.json());    // allows app to receive and parse JSON data

app.use(cookieParser());

app.use(cors(corsOptions));    // essentially makes our api available to the public; other origins can request resources from our api

app.use('/', Express.static(path.join(__dirname, '/public'))); // telling express where to find static files like CSS or an image
// also does the same thing: app.use(Express.static('public');

app.use('/', router);
app.use('/users', usersRouter);

// A 404 catch-all for anything that doesn't have a defined route
app.all('*',(req,res)=>{
    res.status(404)

    // Based on the request header, we can decide on what type of response to send back!
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if(req.accepts('json')) {
        res.json({message: '404 Not Found'});
    } else{
        res.type('txt').send('404 Not Found');
    }
})



connectDB();

// app.use('/', Express.static(path.join(__dirname, '/public')));  // look in public directory for static files

// testDB();

app.get('/test', async (req, res) => {
    try{
        const foundExercise = await Exercise.find({exerciseName:'Pull Ups'}).populate('attempts').exec();
        res.json(foundExercise[0]);
    }
    catch(e){
        console.log(e);
    }
})

app.use(errorHandler);

mongoose.connection.once('open', ()=>{
    console.log('Connected to MongoDB');
    app.listen(5001, ()=> {
        console.log('Server running on port 5001')
    });
})

mongoose.connection.on('error', (err) => {
    console.log(err);
})
