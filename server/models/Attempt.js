import mongoose from 'mongoose';
const SetSchema = new mongoose.Schema({
  reps: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value'
    }
  },
  weight: {
    type: Number,
    required: true
  }
});

const AttemptSchema = new mongoose.Schema({
  date: {
    type: Date,
    immutable: true,
    default: () => Date.now()
  },
  exercise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise',
    immutable: true,
    required: true
  },
  sets: {
    type: [SetSchema],
    required: true
  },
  journal: String
});

export default mongoose.model('Attempt', AttemptSchema);
