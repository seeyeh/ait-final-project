import mongoose from 'mongoose'

const AttemptSchema = new mongoose.Schema({
    lastDone: Date,
    sets: []
});

export default mongoose.model('Attempt', AttemptSchema);;
