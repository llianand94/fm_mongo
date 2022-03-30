const mongoose = require('mongoose');
const { Schema } = mongoose;
const {emailSchema} = require('../validationSchemas');

const taskSchema = new Schema(
  {
    title: {
      type: String,
      require: [true, 'Task have to be'],
      validate: {
        validator: v => /[A-Z][a-z\s]{4,200}/.test(v),
        message: '{VALUE} must be letter',
      },
    },
    date: { type: Date, default: Date.now },
    isDone: { type: Boolean, default: false },
    author: {
      name: {
        type: String,
        require: true,
      },
      email: {
        type: String,
        required: true,
        validate: {
          validator: v => emailSchema.isValid(v),
        },
      },
      age: {
        type: Number,
        validate: {
          validator: v => v > 0,
        },
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports.Task = mongoose.model('Task', taskSchema);