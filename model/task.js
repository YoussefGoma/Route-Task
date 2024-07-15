import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['text', 'list'], required: true },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    validate: {
      validator: function(v) {
        if (this.type === 'text') {
          return typeof v === 'string';
        } else if (this.type === 'list') {
          return Array.isArray(v) && v.every(item => typeof item === 'string');
        }
        return false;
      },
      message: props => `${props.value} is not a valid content for ${props.type} task!`
    }
  },
  shared: { type: Boolean, default: false },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Task = mongoose.model('Task', taskSchema);

export default Task;