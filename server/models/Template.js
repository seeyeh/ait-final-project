import mongoose from 'mongoose';

const TemplateSchema = new mongoose.Schema({
  parentUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    default: 'My Workout Template'
  },
  description: String,
  exercises: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise'
      }
    ]
  }
});

export default mongoose.model('Template', TemplateSchema);
