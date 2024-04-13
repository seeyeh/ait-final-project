import './config.mjs'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

app.listen(process.env.PORT || 3000);
