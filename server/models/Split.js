import mongoose from 'mongoose';

const SplitSchema = new mongoose.Schema({
  parentUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    default: 'My Workout Split'
  },
  description: String,
  templates: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Template'
      }
    ]
  }
});

export default mongoose.model('Split', SplitSchema);
